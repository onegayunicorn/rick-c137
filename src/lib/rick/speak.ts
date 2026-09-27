import { createServerFn } from "@tanstack/react-start";

function forVoice(raw: string): string {
  return raw
    .replace(/\*burp\*/gi, "[burp]")
    .replace(/\*[^*]+\*/g, "")
    .replace(/[_#`]/g, "")
    .slice(0, 700)
    .trim();
}

async function oracleSpeech(text: string) {
  const base = process.env.ORACLE_VOICE_URL;
  if (!base) return null;

  const endpoint = base.replace(/\/$/, "") + "/v1/speech";
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: text,
        model: "rick-c137",
        response_format: "wav",
      }),
    });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.byteLength < 80) return null;
    return {
      ok: true as const,
      audio: buf.toString("base64"),
      mime: res.headers.get("content-type") || "audio/wav",
      provider: res.headers.get("x-voice-provider") || "oracle",
    };
  } catch {
    return null;
  }
}

export const speakRick = createServerFn({ method: "POST" })
  .validator((input: { text: string }) => ({
    text: forVoice(input.text ?? ""),
  }))
  .handler(async ({ data }) => {
    if (!data.text) {
      return { ok: false as const, error: "Nothing to say." };
    }

    // Canonical local/offline Oracle path.
    const oracle = await oracleSpeech(data.text);
    if (oracle) return oracle;

    // Optional cloud fallback retained for deployments that configure XAI.
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "Oracle voice unavailable." };
    }

    const voices = ["leo", "rex", "eve"] as const;
    let lastStatus = 0;
    for (const voice of voices) {
      const res = await fetch("https://api.x.ai/v1/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          text: data.text,
          voice_id: voice,
          language: "en",
        }),
      });
      lastStatus = res.status;
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.byteLength < 80) continue;
      const mime = res.headers.get("content-type") || "audio/mpeg";
      return {
        ok: true as const,
        audio: buf.toString("base64"),
        mime,
        provider: "xai",
      };
    }

    return { ok: false as const, error: `Cloud voice failed (${lastStatus}).` };
  });
