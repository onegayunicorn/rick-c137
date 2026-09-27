import { Link } from "@tanstack/react-router";
import { NAV } from "@/components/portal/nav";
import { cn } from "@/lib/utils";

export function SideNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1 p-2">
      <div className="mx-auto my-3 size-10 rounded-full shadow-[inset_0_0_0_2px_rgb(0_255_170_/_0.45)] [animation:spin_12s_linear_infinite] motion-reduce:animate-none" />
      {NAV.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          onClick={onNavigate}
          className="flex min-h-11 items-center gap-3 rounded-md px-3 py-2 font-mono text-xs tracking-widest uppercase text-muted transition-colors duration-(--motion-fast) hover:bg-elevated hover:text-portal"
          activeProps={{
            className: "bg-portal/15 text-portal",
          }}
          activeOptions={{ exact: to === "/" }}
        >
          <Icon className="size-4 shrink-0" />
          <span className={cn("truncate", onNavigate ? "inline" : "hidden xl:inline")}>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
