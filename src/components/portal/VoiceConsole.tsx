import { type FormEvent, useState } from "react";
import { Pause, Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendToRick, silenceRick } from "@/lib/rick/conversation";
import { useOracle } from "@/lib/rick/store";

const CHIPS = [
  "What's the portal status?",
  "Invent something stupid.",
  "Read the lattice.",
];

export function VoiceConsole() {
  const [draft, setDraft] = useState("");
  const busy = useOracle((s) => s.busy);
  const clearHistory = useOracle((s) => s.clearHistory);

  function submit(event?: FormEvent) {
    event?.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    void sendToRick(text);
  }

  return (
    <div className="portal-panel flex flex-col gap-2 p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="font-mono text-xs tracking-widest text-portal uppercase">Voice console</div>
        <div className="flex gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-9"
            aria-label="Stop speech"
            onClick={silenceRick}
          >
            <Pause className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-9"
            aria-label="Clear transcript"
            onClick={clearHistory}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            className="h-8 rounded-full bg-elevated px-3 font-mono text-xs text-dim transition-colors hover:text-portal"
            onClick={() => void sendToRick(chip)}
            disabled={busy}
          >
            {chip}
          </button>
        ))}
      </div>
      <form onSubmit={submit} className="flex items-center gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Talk to Rick…"
          aria-label="Message Rick"
          disabled={busy}
          maxLength={2000}
        />
        <Button type="submit" size="icon" disabled={busy || !draft.trim()} aria-label="Send">
          <Send className="size-4" />
        </Button>
      </form>
    </div>
  );
}
