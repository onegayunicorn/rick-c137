import { Link } from "@tanstack/react-router";
import { Menu, Mic, MicOff, Radio, Wifi } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock } from "@/components/portal/Clock";
import { cn } from "@/lib/utils";
import { useOracle } from "@/lib/rick/store";

type Props = {
  onMenu?: () => void;
  dense?: boolean;
};

export function HudBar({ onMenu, dense = false }: Props) {
  const voiceOn = useOracle((s) => s.voiceOn);
  const setVoiceOn = useOracle((s) => s.setVoiceOn);
  const anim = useOracle((s) => s.anim);
  const busy = useOracle((s) => s.busy);

  const statusTone =
    anim === "TALK" ? "voice" : busy ? "think" : anim === "IDLE" ? "online" : "stable";

  return (
    <header
      className={cn(
        "portal-panel flex items-center justify-between gap-3 px-3",
        dense ? "h-12" : "h-14",
      )}
    >
      <div className="flex min-w-0 items-center gap-2">
        {onMenu ? (
          <Button
            variant="ghost"
            size="icon"
            className="size-11 shrink-0 md:hidden"
            onClick={onMenu}
            aria-label="Open navigation"
          >
            <Menu className="size-5" />
          </Button>
        ) : null}
        <Link to="/" className="min-w-0">
          <div className="font-display text-sm tracking-widest text-portal">RICK C-137</div>
          <div className="hidden truncate font-mono text-xs text-muted sm:block">
            Same shit, different dimension
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Badge tone="online" className="hidden sm:inline-flex">
          <Wifi className="size-3" />
          Online
        </Badge>
        <Badge tone={statusTone} className="hidden md:inline-flex">
          <Radio className="size-3" />
          {busy ? "Thinking" : anim}
        </Badge>
        <Button
          variant="ghost"
          size="icon"
          className="size-11"
          aria-pressed={voiceOn}
          aria-label={voiceOn ? "Mute voice" : "Enable voice"}
          onClick={() => setVoiceOn(!voiceOn)}
        >
          {voiceOn ? <Mic className="size-4 text-signal" /> : <MicOff className="size-4" />}
        </Button>
        <Clock />
      </div>
    </header>
  );
}
