import type { TelemetryRow } from "./telemetry";

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)] ?? items[0];
}

function metric(rows: TelemetryRow[], id: string): TelemetryRow | undefined {
  return rows.find((row) => row.id === id);
}

export function localRick(prompt: string, rows: TelemetryRow[]): string {
  const q = prompt.toLowerCase();
  const portal = metric(rows, "EM-003");
  const flux = metric(rows, "EM-001");
  const load = metric(rows, "EM-004");
  const coh = metric(rows, "EM-002");

  const p = portal ? `${portal.value}${portal.unit}` : "unknown";
  const f = flux ? `${flux.value}${flux.unit}` : "unknown";
  const n = load ? `${load.value}${load.unit}` : "unknown";
  const c = coh ? `${coh.value}${coh.unit}` : "unknown";

  if (/portal|status|stable|harmonics|lattice/.test(q)) {
    return pick([
      `*burp* Portal's at ${p}. Coherence ${c}. That's not a miracle, that's Tuesday. Don't poke it unless you like orange apertures.`,
      `Lattice is holding. Optical flux ${f}, neural load ${n}. If it drifts I'll hear it before you do, genius.`,
      `W-what do you want, a parade? Stability ${p}. It's open. Walk through or shut up.`,
    ]);
  }

  if (/invent|build|make|gun|device|gadget/.test(q)) {
    return pick([
      `Fine. Photonic flea collar, keyed to EM-001 at ${f}. Keeps interdimensional parasites off your ankles. You're welcome. Don't lick it.`,
      `*burp* How about a memory encoder that deletes the last dumb question? Oh wait, I already built that. Neural load's ${n} so I'm not compiling another one.`,
      `You want an invention? Portal gun's armed, crowsnest serum's capped. Ask for a schematic or go play with a screwdriver.`,
    ]);
  }

  if (/rest|sleep|tired|idle|wake/.test(q)) {
    return pick([
      `I was resting. You woke the node. Neural load just jumped to ${n}. This better not be about your feelings.`,
      `Rest cycle exists so I don't have to listen to you. Portal parked at ${p}. Hit rest mode if you're done.`,
    ]);
  }

  if (/who are you|name|rick|c-137|morty/.test(q)) {
    return pick([
      `Rick Sanchez. C-137. Not the clone, not the meme, the actual drunk who wired this lattice. Morty's not here. Lucky him.`,
      `I'm the oracle on this box. Rick. If you're looking for customer support you portal'd into the wrong dimension.`,
    ]);
  }

  if (/voice|speak|talk|say/.test(q)) {
    return `Yeah I can talk. Cloud TTS is dark so you're getting the local pipe. *burp* Still me. Don't grade the timbre.`;
  }

  const clipped = prompt.replace(/\s+/g, " ").trim().slice(0, 80);
  return pick([
    `*burp* "${clipped}" — that's your big question? Coherence is ${c} and I'm still bored. Try again with physics.`,
    `Look, ${clipped || "that"} is a you problem. Portal ${p}, flux ${f}. I already simulated the outcomes. Most of them are dumb.`,
    `L-let me dumb this down. You asked. I answered in my head. The spoken version: no. Unless you meant the lattice, which is fine at ${c}.`,
    `Another beautiful day in an infinite multiverse and you lead with that. Fine. I'll chew on it while the node sits at ${n} load. Next.`,
  ]);
}

export function speakLocal(text: string): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      resolve();
      return;
    }
    window.speechSynthesis.cancel();
    const clean = text.replace(/\*burp\*/gi, "...").replace(/\*/g, "");
    const utter = new SpeechSynthesisUtterance(clean);
    utter.rate = 1.08;
    utter.pitch = 0.8;
    utter.lang = "en-US";
    const voices = window.speechSynthesis.getVoices();
    const male =
      voices.find((v) => /en/i.test(v.lang) && /male|daniel|david|fred|alex|george/i.test(v.name)) ??
      voices.find((v) => /^en/i.test(v.lang));
    if (male) utter.voice = male;
    utter.onend = () => resolve();
    utter.onerror = () => resolve();
    window.speechSynthesis.speak(utter);
    window.setTimeout(resolve, Math.min(12000, 1800 + clean.length * 45));
  });
}
