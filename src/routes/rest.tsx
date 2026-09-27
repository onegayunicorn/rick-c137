import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { CinematicFrame } from "@/components/portal/CinematicFrame";
import { Button } from "@/components/ui/button";
import { useOracle } from "@/lib/rick/store";

export const Route = createFileRoute("/rest")({ component: Rest });

function Rest() {
  const setAnim = useOracle((s) => s.setAnim);
  const tick = useOracle((s) => s.tickTelemetry);

  useEffect(() => {
    setAnim("IDLE");
    const id = window.setInterval(() => tick(true), 2200);
    return () => window.clearInterval(id);
  }, [setAnim, tick]);

  return (
    <CinematicFrame
      clip="idle"
      badge="Resting"
      eyebrow="Rest cycle"
      title="He's between thoughts."
      body="Neural load dumped. Portal harmonics parked at idle. Wake him if you've got a real problem — not a feelings journal."
    >
      <Button asChild size="lg">
        <Link to="/oracle">Wake Rick</Link>
      </Button>
      <Button asChild variant="ghost" size="lg">
        <Link to="/">Back to portal</Link>
      </Button>
    </CinematicFrame>
  );
}
