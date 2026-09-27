import { useEffect } from "react";
import { hydrateHistory, useOracle } from "@/lib/rick/store";

export function HydrateOracle({ resting = false }: { resting?: boolean }) {
  useEffect(() => {
    hydrateHistory();
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      useOracle.getState().tickTelemetry(resting);
    }, 1800);
    return () => window.clearInterval(id);
  }, [resting]);

  return null;
}
