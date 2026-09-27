import { create } from "zustand";
import type { ChatTurn } from "./ask";
import type { RickAnim } from "./videos";
import { STARTER_LINES } from "./persona";
import { driftTelemetry, seedTelemetry, type TelemetryRow } from "./telemetry";

const HISTORY_KEY = "c137-oracle-history";

function loadHistory(): ChatTurn[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ChatTurn[];
    return Array.isArray(parsed) ? parsed.slice(-40) : [];
  } catch {
    return [];
  }
}

type OracleState = {
  anim: RickAnim;
  voiceOn: boolean;
  busy: boolean;
  history: ChatTurn[];
  lastLine: string;
  telemetry: TelemetryRow[];
  setAnim: (anim: RickAnim) => void;
  setVoiceOn: (on: boolean) => void;
  setBusy: (busy: boolean) => void;
  setLastLine: (line: string) => void;
  pushTurn: (turn: ChatTurn) => void;
  clearHistory: () => void;
  tickTelemetry: (resting: boolean) => void;
};

export const useOracle = create<OracleState>((set) => ({
  anim: "IDLE",
  voiceOn: true,
  busy: false,
  history: [],
  lastLine: STARTER_LINES[0],
  telemetry: seedTelemetry(),
  setAnim: (anim) => set({ anim }),
  setVoiceOn: (voiceOn) => set({ voiceOn }),
  setBusy: (busy) => set({ busy }),
  setLastLine: (lastLine) => set({ lastLine }),
  pushTurn: (turn) =>
    set((state) => {
      const history = [...state.history, turn].slice(-40);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
      } catch {
        /* quota */
      }
      return { history };
    }),
  clearHistory: () => {
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch {
      /* ignore */
    }
    set({ history: [], lastLine: STARTER_LINES[1] });
  },
  tickTelemetry: (resting) =>
    set((state) => ({ telemetry: driftTelemetry(state.telemetry, resting) })),
}));

export function hydrateHistory() {
  const history = loadHistory();
  if (history.length) useOracle.setState({ history });
}
