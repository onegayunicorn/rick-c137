import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/portal/AppShell";
import { TelemetryRail } from "@/components/portal/TelemetryRail";
import { VideoLoop } from "@/components/portal/VideoLoop";
import { Badge } from "@/components/ui/badge";
import { useOracle } from "@/lib/rick/store";

export const Route = createFileRoute("/grid")({ component: Grid });

function Grid() {
  const rows = useOracle((s) => s.telemetry);

  return (
    <AppShell>
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 overflow-y-auto lg:grid-cols-[minmax(0,1.2fr)_18rem] lg:overflow-hidden">
        <div className="flex min-h-0 flex-col gap-2">
          <section className="portal-panel relative min-h-52 flex-1 overflow-hidden">
            <VideoLoop clip="widgets" fit="cover" />
            <div className="absolute left-4 top-4">
              <Badge tone="voice">Widget lattice</Badge>
            </div>
          </section>
          <section className="portal-panel grid grid-cols-2 gap-2 p-3 sm:grid-cols-4">
            {rows.slice(0, 4).map((row) => (
              <div key={row.id} className="rounded-md bg-bg p-3 shadow-border">
                <div className="font-mono text-xs text-muted">{row.id}</div>
                <div className="mt-1 font-display text-xl tabular-nums text-portal">
                  {row.value}
                  <span className="ml-1 text-xs text-muted">{row.unit}</span>
                </div>
                <div className="text-xs text-dim">{row.label}</div>
              </div>
            ))}
          </section>
          <section className="portal-panel relative min-h-36 overflow-hidden">
            <VideoLoop clip="design" fit="cover" />
            <div className="absolute inset-0 bg-bg/40" />
            <div className="absolute bottom-3 left-4 right-4">
              <p className="font-mono text-xs tracking-widest text-portal uppercase">Design system</p>
              <p className="font-body text-sm text-dim">Portal green on AMOLED. Same drunk genius, tighter kerning.</p>
            </div>
          </section>
        </div>
        <div className="hidden min-h-0 overflow-y-auto lg:block">
          <TelemetryRail />
        </div>
      </div>
    </AppShell>
  );
}
