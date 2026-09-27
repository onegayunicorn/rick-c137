import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-full bg-bg/70 px-4 font-body text-base text-fg shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.1)] outline-none placeholder:text-muted focus-visible:shadow-[inset_0_0_0_1px_rgb(0_255_170_/_0.5)]",
        className,
      )}
      {...props}
    />
  );
}
