import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useOracle } from "@/lib/rick/store";

export function ChatLog() {
  const history = useOracle((s) => s.history);
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [history.length]);

  if (!history.length) {
    return (
      <p className="px-3 py-4 font-body text-sm leading-relaxed text-muted">
        No transcript yet. Type below or hit a prompt chip. He will be rude. That is the product.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2 overflow-y-auto px-3 py-3">
      {history.map((turn, i) => (
        <div
          key={`${turn.role}-${i}`}
          className={cn(
            "max-w-[92%] rounded-md px-3 py-2 text-sm leading-relaxed",
            turn.role === "user"
              ? "self-end bg-elevated text-fg"
              : "self-start bg-portal/10 text-fg shadow-[inset_0_0_0_1px_rgb(0_255_170_/_0.18)]",
          )}
        >
          <div className="mb-1 font-mono text-xs uppercase tracking-widest text-muted">
            {turn.role === "user" ? "You" : "C-137"}
          </div>
          {turn.content}
        </div>
      ))}
      <div ref={bottom} />
    </div>
  );
}
