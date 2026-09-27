import { useOracle } from "@/lib/rick/store";

export function TelemetryStrip() {
  const rows = useOracle((s) => s.telemetry).slice(0, 4);
  return (
    <ul className="grid grid-cols-2 gap-2 p-3">
      {rows.map((row) => (
        <li key={row.id}>
          <div className="font-mono text-xs text-muted">{row.id}</div>
          <div className="font-display text-lg tabular-nums text-portal">
            {row.value}
            <span className="ml-1 text-xs text-muted">{row.unit}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
