import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/speak-SP6u5LDa.js
function forVoice(raw) {
	return raw.replace(/\*burp\*/gi, "[burp]").replace(/\*[^*]+\*/g, "").replace(/[_#`]/g, "").slice(0, 700).trim();
}
var speakRick_createServerFn_handler = createServerRpc({
	id: "d52357923952a90866637e461e70cbbdd09c4a7712b240084ba7777877a8f8d7",
	name: "speakRick",
	filename: "src/lib/rick/speak.ts"
}, (opts) => speakRick.__executeServer(opts));
var speakRick = createServerFn({ method: "POST" }).validator((input) => ({ text: forVoice(input.text ?? "") })).handler(speakRick_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Voice stack offline."
	};
	if (!data.text) return {
		ok: false,
		error: "Nothing to say."
	};
	const voices = [
		"leo",
		"rex",
		"eve"
	];
	let lastStatus = 0;
	for (const voice of voices) {
		const res = await fetch("https://api.x.ai/v1/tts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				text: data.text,
				voice_id: voice,
				language: "en"
			})
		});
		lastStatus = res.status;
		if (!res.ok) continue;
		const buf = Buffer.from(await res.arrayBuffer());
		if (buf.byteLength < 80) continue;
		const mime = res.headers.get("content-type") || "audio/mpeg";
		return {
			ok: true,
			audio: buf.toString("base64"),
			mime
		};
	}
	return {
		ok: false,
		error: `Piper analog failed (${lastStatus}).`
	};
});
//#endregion
export { speakRick_createServerFn_handler };
