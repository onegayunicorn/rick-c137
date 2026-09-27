import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { HudBar } from "@/components/portal/HudBar";
import { NAV } from "@/components/portal/nav";
import { SideNav } from "@/components/portal/SideNav";
import { cn } from "@/lib/utils";

export function AppShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-bg p-2 pb-16 md:pb-2">
      <HudBar onMenu={() => setOpen(true)} />
      <div className="mt-2 flex min-h-0 flex-1 gap-2">
        <aside className="portal-panel hidden w-16 shrink-0 overflow-y-auto md:block xl:w-52">
          <SideNav />
        </aside>
        <div className={cn("flex min-h-0 min-w-0 flex-1 flex-col", className)}>{children}</div>
      </div>

      <nav className="portal-panel fixed inset-x-2 bottom-2 z-30 flex h-14 items-stretch justify-around md:hidden">
        {NAV.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            aria-label={label}
            className="flex min-w-11 flex-1 flex-col items-center justify-center gap-0.5 text-muted"
            activeProps={{ className: "text-portal" }}
            activeOptions={{ exact: to === "/" }}
          >
            <Icon className="size-5" />
            <span className="font-mono text-xs uppercase tracking-wider">{label}</span>
          </Link>
        ))}
      </nav>

      {open ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-bg/70"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          />
          <aside className="relative h-full w-72 bg-surface shadow-border">
            <div className="p-4 font-display text-sm tracking-widest text-portal">Portal nav</div>
            <SideNav onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      ) : null}
    </div>
  );
}
