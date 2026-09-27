import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-display text-xs tracking-widest uppercase transition-[opacity,transform,box-shadow,background-color] duration-(--motion-fast) ease-(--ease-out-soft) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portal/60 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-portal text-bg shadow-[0_0_20px_rgb(0_255_170_/_0.18)] hover:brightness-110",
        secondary:
          "bg-transparent text-portal shadow-[inset_0_0_0_1px_rgb(0_255_170_/_0.45)] hover:bg-portal/10",
        ghost:
          "bg-transparent text-muted shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.1)] hover:text-fg hover:bg-elevated",
        danger: "bg-danger text-fg hover:brightness-110",
      },
      size: {
        sm: "h-9 rounded-sm px-3",
        md: "h-11 rounded-md px-4",
        lg: "h-12 rounded-lg px-5",
        icon: "size-11 rounded-md",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
