import { useEffect, useState } from "react";

export function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time
      dateTime={now?.toISOString()}
      className="font-mono text-sm tabular-nums tracking-wider text-portal"
    >
      {now
        ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
        : "--:--:--"}
    </time>
  );
}
