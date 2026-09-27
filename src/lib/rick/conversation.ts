import { toast } from "sonner";
import { askRick } from "./ask";
import { localRick, speakLocal } from "./offline";
import { speakRick } from "./speak";
import { useOracle } from "./store";

let audioEl: HTMLAudioElement | null = null;
let cloudDown = false;

function stopAudio() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  if (!audioEl) return;
  audioEl.pause();
  audioEl.src = "";
  audioEl = null;
}

async function voiceOut(text: string) {
  const { voiceOn, setAnim } = useOracle.getState();
  if (!voiceOn) {
    window.setTimeout(() => useOracle.getState().setAnim("IDLE"), 3600);
    return;
  }
  setAnim("TALK");
  if (!cloudDown) {
    const spoken = await speakRick({ data: { text } });
    if (spoken.ok) {
      stopAudio();
      audioEl = new Audio(`data:${spoken.mime};base64,${spoken.audio}`);
      audioEl.onended = () => useOracle.getState().setAnim("IDLE");
      await audioEl.play().catch(() => undefined);
      return;
    }
    cloudDown = true;
  }
  await speakLocal(text);
  useOracle.getState().setAnim("IDLE");
}

export async function sendToRick(prompt: string) {
  const text = prompt.trim();
  if (!text || useOracle.getState().busy) return;

  const { pushTurn, setBusy, setAnim, setLastLine, history, telemetry } = useOracle.getState();

  pushTurn({ role: "user", content: text });
  setBusy(true);
  setAnim("LISTEN");

  const thinkTimer = window.setTimeout(() => {
    if (useOracle.getState().busy) useOracle.getState().setAnim("THINKING");
  }, 500);

  try {
    let reply = "";
    if (!cloudDown) {
      const result = await askRick({
        data: { prompt: text, history, telemetry: telemetry.map((r) => `${r.id}:${r.value}`).join(" ") },
      });
      if (result.ok) {
        reply = result.text;
      } else {
        cloudDown = true;
      }
    }
    if (!reply) {
      reply = localRick(text, useOracle.getState().telemetry);
    }

    pushTurn({ role: "assistant", content: reply });
    setLastLine(reply);
    await voiceOut(reply);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Portal hop failed.";
    const reply = localRick(text, useOracle.getState().telemetry);
    pushTurn({ role: "assistant", content: reply });
    setLastLine(reply);
    toast.error(message);
    await voiceOut(reply);
  } finally {
    window.clearTimeout(thinkTimer);
    setBusy(false);
  }
}

export function silenceRick() {
  stopAudio();
  useOracle.getState().setAnim("IDLE");
}
