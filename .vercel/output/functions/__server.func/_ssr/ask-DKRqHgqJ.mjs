import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { n as RICK_SYSTEM } from "./persona-DkdgE8nI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ask-DKRqHgqJ.js
var askRick_createServerFn_handler = createServerRpc({
	id: "904599716e8cf1432fd89d2fb1a31bb55f5ffe6e4cd35a3070c8ebf73bc75e58",
	name: "askRick",
	filename: "src/lib/rick/ask.ts"
}, (opts) => askRick.__executeServer(opts));
var askRick = createServerFn({ method: "POST" }).validator((input) => {
	return {
		prompt: (input.prompt ?? "").trim().slice(0, 2e3),
		history: Array.isArray(input.history) ? input.history.slice(-10) : [],
		telemetry: (input.telemetry ?? "").slice(0, 600)
	};
}).handler(askRick_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "offline"
	};
	if (!data.prompt) return {
		ok: false,
		error: "empty"
	};
	const messages = [
		{
			role: "system",
			content: RICK_SYSTEM
		},
		...data.history.map((turn) => ({
			role: turn.role,
			content: turn.content.slice(0, 1200)
		})),
		{
			role: "user",
			content: `${data.prompt}\n\n[TELEMETRY]\n${data.telemetry}`
		}
	];
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			messages,
			temperature: .85,
			max_tokens: 320
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `hop-${res.status}`
	};
	const text = (await res.json()).choices?.[0]?.message?.content?.trim() ?? "";
	if (!text) return {
		ok: false,
		error: "empty-node"
	};
	return {
		ok: true,
		text
	};
});
//#endregion
export { askRick_createServerFn_handler };
