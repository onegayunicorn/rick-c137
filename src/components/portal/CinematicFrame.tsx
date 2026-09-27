import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { VideoLoop } from "@/components/portal/VideoLoop";
import { Clock } from "@/components/portal/Clock";
import { Badge } from "@/components/ui/badge";
import { NAV } from "@/components/portal/nav";
import type { VideoKey } from "@/lib/rick/videos";

export function CinematicFrame({
  clip,
  eyebrow,
  title,
  body,
  children,
  badge,
}: {
  clip: VideoKey;
  eyebrow: string;
  title: string;
  body: string;
  badge: string;
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-bg">
      <div className="absolute inset-0">
        <VideoLoop clip={clip} />
      </div>
      <div className="vignette absolute inset-0" />
      <div className="scanlines absolute inset-0 opacity-60" />

      <div className="relative z-10 flex min-h-dvh flex-col">
        <div className="flex items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <div className="font-display text-sm tracking-widest text-portal">RICK C-137</div>
            <div className="font-mono text-xs text-muted">Sovereign Oracle</div>
          </div>
          <div className="flex items-center gap-2">
            <Badge tone="online">{badge}</Badge>
            <Clock />
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-5 px-4 pb-24 sm:px-8 sm:pb-12">
          <div className="max-w-xl">
            <p className="font-mono text-xs tracking-widest text-portal uppercase">{eyebrow}</p>
            <h1 className="mt-2 font-display text-3xl leading-tight tracking-wide text-fg">{title}</h1>
            <p className="mt-3 max-w-md font-body text-lg leading-relaxed text-dim">{body}</p>
          </div>
          <div className="flex flex-wrap gap-3">{children}</div>
        </div>
      </div>

      <nav className="absolute inset-x-0 bottom-0 z-20 flex justify-center gap-1 pb-3 pt-8 sm:hidden">
        {NAV.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            aria-label={label}
            className="flex size-11 items-center justify-center rounded-full text-muted"
            activeProps={{ className: "text-portal" }}
            activeOptions={{ exact: to === "/" }}
          >
            <Icon className="size-5" />
          </Link>
        ))}
      </nav>
    </div>
  );
}
