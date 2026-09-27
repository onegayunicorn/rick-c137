import { createFileRoute, Link } from "@tanstack/react-router";
import { CinematicFrame } from "@/components/portal/CinematicFrame";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <CinematicFrame
      clip="portal"
      badge="Portal open"
      eyebrow="Dimension C-137"
      title="The lattice is coherent. Don't waste it."
      body="Rick is on-node. Portal loop live. Ask the oracle a real question or leave him in rest until the harmonics drift."
    >
      <Button asChild size="lg">
        <Link to="/oracle">Open the oracle</Link>
      </Button>
      <Button asChild variant="secondary" size="lg">
        <Link to="/rest">Rest mode</Link>
      </Button>
      <Button asChild variant="ghost" size="lg" className="hidden sm:inline-flex">
        <Link to="/lab">Enter the lab</Link>
      </Button>
    </CinematicFrame>
  );
}
