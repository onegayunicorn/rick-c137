export type TelemetryRow = {
  id: string;
  label: string;
  unit: string;
  value: number;
};

const BASE: TelemetryRow[] = [
  { id: "EM-001", label: "Optical flux", unit: "lx", value: 74 },
  { id: "EM-002", label: "Quantum coherence", unit: "%", value: 91 },
  { id: "EM-003", label: "Portal stability", unit: "%", value: 87 },
  { id: "EM-004", label: "Neural load", unit: "%", value: 42 },
  { id: "EM-005", label: "Lattice phase", unit: "°", value: 18 },
  { id: "EM-006", label: "Matter density", unit: "%", value: 63 },
  { id: "EM-007", label: "Energy residual", unit: "%", value: 81 },
];

export function seedTelemetry(): TelemetryRow[] {
  return BASE.map((row) => ({ ...row }));
}

export function driftTelemetry(rows: TelemetryRow[], resting: boolean): TelemetryRow[] {
  return rows.map((row) => {
    const amp = resting ? 0.4 : 1.8;
    const next = row.value + (Math.random() * 2 - 1) * amp;
    const clamped = Math.min(99.4, Math.max(12, next));
    return { ...row, value: Number(clamped.toFixed(1)) };
  });
}

export function telemetryBlock(rows: TelemetryRow[]): string {
  return rows
    .map((row) => `${row.id} ${row.label}: ${row.value}${row.unit}`)
    .join(" | ");
}
