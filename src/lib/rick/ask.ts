import { createServerFn } from "@tanstack/react-start";
import { RICK_SYSTEM } from "./persona";

export type ChatTurn = { role: "user" | "assistant"; content: string };

type AskInput = {
  prompt: string;
  history: ChatTurn[];
  telemetry: string;
};

export const askRick = createServerFn({ method: "POST" })
  .validator((input: AskInput) => {
    const prompt = (input.prompt ?? "").trim().slice(0, 2000);
    const history = Array.isArray(input.history) ? input.history.slice(-10) : [];
    const telemetry = (input.telemetry ?? "").slice(0, 600);
    return { prompt, history, telemetry };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "offline" };
    }
    if (!data.prompt) {
      return { ok: false as const, error: "empty" };
    }

    const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
      { role: "system", content: RICK_SYSTEM },
      ...data.history.map((turn) => ({
        role: turn.role,
        content: turn.content.slice(0, 1200),
      })),
      {
        role: "user",
        content: `${data.prompt}\n\n[TELEMETRY]\n${data.telemetry}`,
      },
    ];

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        messages,
        temperature: 0.85,
        max_tokens: 320,
      }),
    });

    if (!res.ok) {
      return { ok: false as const, error: `hop-${res.status}` };
    }

    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = body.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) {
      return { ok: false as const, error: "empty-node" };
    }
    return { ok: true as const, text };
  });
