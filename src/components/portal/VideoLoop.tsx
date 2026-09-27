import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { VIDEOS, type VideoKey } from "@/lib/rick/videos";

type Props = {
  clip: VideoKey;
  className?: string;
  fit?: "cover" | "contain";
};

export function VideoLoop({ clip, className, fit = "cover" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const asset = VIDEOS[clip];

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      node.pause();
      return;
    }
    const play = () => {
      void node.play().catch(() => undefined);
    };
    play();
    node.addEventListener("canplay", play);
    return () => node.removeEventListener("canplay", play);
  }, [clip]);

  return (
    <video
      ref={ref}
      key={asset.src}
      className={cn(
        "h-full w-full bg-bg",
        fit === "cover" ? "object-cover object-center" : "object-contain",
        className,
      )}
      src={asset.src}
      poster={asset.poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-label={asset.label}
    />
  );
}
