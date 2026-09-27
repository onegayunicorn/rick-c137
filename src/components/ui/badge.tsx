import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-xs tracking-wider uppercase",
  {
    variants: {
      tone: {
        online: "bg-portal/15 text-portal shadow-[inset_0_0_0_1px_rgb(0_255_170_/_0.35)]",
        voice: "bg-signal/15 text-signal shadow-[inset_0_0_0_1px_rgb(90_168_232_/_0.35)]",
        stable: "bg-ok/15 text-ok shadow-[inset_0_0_0_1px_rgb(61_207_138_/_0.35)]",
        think: "bg-warn/15 text-warn shadow-[inset_0_0_0_1px_rgb(212_168_75_/_0.35)]",
        error: "bg-danger/15 text-danger shadow-[inset_0_0_0_1px_rgb(224_90_90_/_0.35)]",
        mute: "bg-elevated text-muted shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.08)]",
      },
    },
    defaultVariants: { tone: "mute" },
  },
);

export function Badge({
  className,
  tone,
  ...props
}: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
