import { createServerFn } from "@tanstack/react-start";

function forVoice(raw: string): string {
  return raw
    .replace(/\*burp\*/gi, "[burp]")
    .replace(/\*[^*]+\*/g, "")
    .replace(/[_#`]/g, "")
    .slice(0, 700)
    .trim();
}

export const speakRick = createServerFn({ method: "POST" })
  .validator((input: { text: string }) => ({
    text: forVoice(input.text ?? ""),
  }))
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "Voice stack offline." };
    }
    if (!data.text) {
      return { ok: false as const, error: "Nothing to say." };
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
      return { ok: true as const, audio: buf.toString("base64"), mime };
    }

    return { ok: false as const, error: `Piper analog failed (${lastStatus}).` };
  });
