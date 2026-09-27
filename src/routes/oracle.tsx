import { createFileRoute } from "@tanstack/react-router";
import { AnimPills } from "@/components/portal/AnimPills";
import { AppShell } from "@/components/portal/AppShell";
import { ChatLog } from "@/components/portal/ChatLog";
import { TelemetryStrip } from "@/components/portal/TelemetryStrip";
import { VideoLoop } from "@/components/portal/VideoLoop";
import { VoiceConsole } from "@/components/portal/VoiceConsole";
import { Badge } from "@/components/ui/badge";
import { useOracle } from "@/lib/rick/store";
import { videoForAnim } from "@/lib/rick/videos";

export const Route = createFileRoute("/oracle")({ component: Oracle });

function Oracle() {
  const anim = useOracle((s) => s.anim);
  const lastLine = useOracle((s) => s.lastLine);
  const clip = videoForAnim(anim);
  const busy = useOracle((s) => s.busy);

  return (
    <AppShell>
      <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(0,1fr)_auto] gap-2 lg:grid-cols-[minmax(0,1fr)_20rem] lg:grid-rows-[minmax(0,1fr)_auto]">
        <section className="portal-panel relative min-h-0 overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-3">
            <div>
              <div className="font-display text-sm tracking-widest text-portal sm:text-lg">RICK C-137</div>
              <div className="font-mono text-xs text-muted">Oracle node</div>
            </div>
            <div className="pointer-events-auto lg:hidden">
              <Badge tone={busy ? "think" : anim === "TALK" ? "voice" : "online"}>{anim}</Badge>
            </div>
          </div>
          <div className="pointer-events-auto absolute left-2 top-14 z-10 hidden lg:block">
            <AnimPills layout="col" />
          </div>
          <VideoLoop clip={clip} fit="cover" className="absolute inset-0" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/75 to-transparent p-3 sm:p-4">
            <p className="font-mono text-xs tracking-widest text-portal uppercase">Live subtitle</p>
            <p className="mt-1 line-clamp-3 max-w-2xl font-body text-sm leading-relaxed text-fg">
              {lastLine}
            </p>
          </div>
        </section>

        <aside className="portal-panel hidden min-h-0 flex-col overflow-hidden lg:flex">
          <div className="border-b border-hairline px-3 py-2 font-mono text-xs tracking-widest text-portal uppercase">
            Transcript
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            <ChatLog />
          </div>
          <div className="border-t border-hairline">
            <TelemetryStrip />
          </div>
        </aside>

        <div className="lg:col-span-2">
          <VoiceConsole />
        </div>
      </div>
    </AppShell>
  );
}
