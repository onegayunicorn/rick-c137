import { cn } from "@/lib/utils";
import { useOracle } from "@/lib/rick/store";
import type { RickAnim } from "@/lib/rick/videos";

const STATES: RickAnim[] = ["IDLE", "TALK", "LISTEN", "THINKING", "SERIOUS", "WALK"];

export function AnimPills({ layout = "row" }: { layout?: "row" | "col" }) {
  const current = useOracle((s) => s.anim);
  const setAnim = useOracle((s) => s.setAnim);

  return (
    <div className={cn("flex gap-1.5", layout === "col" ? "flex-col" : "flex-wrap")}>
      {STATES.map((state) => (
        <button
          key={state}
          type="button"
          onClick={() => setAnim(state)}
          className={cn(
            "h-9 min-w-16 rounded-full px-3 font-mono text-xs tracking-widest uppercase transition-colors",
            current === state
              ? "bg-portal/15 text-portal shadow-[inset_0_0_0_1px_var(--color-portal)]"
              : "bg-elevated/60 text-muted shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.08)] hover:text-portal",
          )}
        >
          {state}
        </button>
      ))}
    </div>
  );
}
