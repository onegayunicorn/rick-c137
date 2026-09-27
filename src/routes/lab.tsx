import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/portal/AppShell";
import { VideoLoop } from "@/components/portal/VideoLoop";
import { VoiceConsole } from "@/components/portal/VoiceConsole";
import { INVENTIONS } from "@/lib/rick/persona";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/lab")({ component: Lab });

function Lab() {
  return (
    <AppShell>
      <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(12rem,0.9fr)_minmax(0,1.1fr)] gap-2 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:grid-rows-[minmax(0,1fr)_auto]">
        <section className="portal-panel relative min-h-0 overflow-hidden">
          <VideoLoop clip="lab" fit="cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg to-transparent p-4">
            <p className="font-mono text-xs tracking-widest text-portal uppercase">Garage-adjacent</p>
            <h1 className="font-display text-xl tracking-wide text-fg">Lab loop</h1>
          </div>
        </section>
        <section className="portal-panel min-h-0 overflow-y-auto p-4 lg:row-span-2">
          <h2 className="font-display text-sm tracking-widest text-portal">Inventions</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {INVENTIONS.map((item) => (
              <li key={item.id} className="rounded-md bg-elevated/80 p-3 shadow-border">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display text-sm tracking-wide text-fg">{item.name}</span>
                  <Badge tone="online">{item.status}</Badge>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.note}</p>
              </li>
            ))}
          </ul>
        </section>
        <div className="lg:col-start-1">
          <VoiceConsole />
        </div>
      </div>
    </AppShell>
  );
}
