import { Activity, Cpu, Smartphone } from "lucide-react";
import { useOracle } from "@/lib/rick/store";

const DEVICES = [
  { name: "Oracle node", on: true },
  { name: "Neural band", on: true },
  { name: "Portal gun", on: true },
  { name: "Edge phone", on: false },
];

export function TelemetryRail() {
  const rows = useOracle((s) => s.telemetry);

  return (
    <div className="flex h-full flex-col gap-2 overflow-y-auto">
      <section className="portal-panel p-3">
        <div className="mb-2 flex items-center gap-2 font-mono text-xs tracking-widest text-portal uppercase">
          <Activity className="size-3.5" />
          Portal core
        </div>
        <ul className="flex flex-col gap-2">
          {rows.map((row) => (
            <li key={row.id}>
              <div className="flex justify-between font-mono text-xs text-muted">
                <span>
                  {row.id} · {row.label}
                </span>
                <span className="tabular-nums text-signal">
                  {row.value}
                  {row.unit}
                </span>
              </div>
              <div className="mt-1 h-1 overflow-hidden rounded-full bg-elevated">
                <div
                  className="h-full rounded-full bg-portal transition-[width] duration-(--motion-slow)"
                  style={{ width: `${Math.min(100, row.value)}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="portal-panel p-3">
        <div className="mb-2 flex items-center gap-2 font-mono text-xs tracking-widest text-portal uppercase">
          <Smartphone className="size-3.5" />
          Nodes
        </div>
        <ul>
          {DEVICES.map((d) => (
            <li key={d.name} className="flex items-center justify-between py-1.5 text-sm">
              <span className="text-dim">{d.name}</span>
              <span className={d.on ? "size-2 rounded-full bg-portal" : "size-2 rounded-full bg-muted"} />
            </li>
          ))}
        </ul>
      </section>
      <section className="portal-panel hidden p-3 xl:block">
        <div className="mb-2 flex items-center gap-2 font-mono text-xs tracking-widest text-portal uppercase">
          <Cpu className="size-3.5" />
          Activity
        </div>
        <ul className="space-y-1 font-mono text-xs text-muted">
          <li>Neural link established</li>
          <li>Quantum harmonics stable</li>
          <li>Memory encoder synced</li>
          <li>Dimension D-742 scanned</li>
        </ul>
      </section>
    </div>
  );
}
