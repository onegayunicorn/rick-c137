import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as Send, r as Trash2, s as Pause } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useOracle } from "./router-CNckhvjd.mjs";
import { n as Button, o as cn } from "./VideoLoop-DiB5JK-a.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/VoiceConsole-CHmZum-c.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-full bg-bg/70 px-4 font-body text-base text-fg shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.1)] outline-none placeholder:text-muted focus-visible:shadow-[inset_0_0_0_1px_rgb(0_255_170_/_0.5)]", className),
		...props
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var askRick = createServerFn({ method: "POST" }).validator((input) => {
	return {
		prompt: (input.prompt ?? "").trim().slice(0, 2e3),
		history: Array.isArray(input.history) ? input.history.slice(-10) : [],
		telemetry: (input.telemetry ?? "").slice(0, 600)
	};
}).handler(createSsrRpc("904599716e8cf1432fd89d2fb1a31bb55f5ffe6e4cd35a3070c8ebf73bc75e58"));
function pick(items) {
	return items[Math.floor(Math.random() * items.length)] ?? items[0];
}
function metric(rows, id) {
	return rows.find((row) => row.id === id);
}
function localRick(prompt, rows) {
	const q = prompt.toLowerCase();
	const portal = metric(rows, "EM-003");
	const flux = metric(rows, "EM-001");
	const load = metric(rows, "EM-004");
	const coh = metric(rows, "EM-002");
	const p = portal ? `${portal.value}${portal.unit}` : "unknown";
	const f = flux ? `${flux.value}${flux.unit}` : "unknown";
	const n = load ? `${load.value}${load.unit}` : "unknown";
	const c = coh ? `${coh.value}${coh.unit}` : "unknown";
	if (/portal|status|stable|harmonics|lattice/.test(q)) return pick([
		`*burp* Portal's at ${p}. Coherence ${c}. That's not a miracle, that's Tuesday. Don't poke it unless you like orange apertures.`,
		`Lattice is holding. Optical flux ${f}, neural load ${n}. If it drifts I'll hear it before you do, genius.`,
		`W-what do you want, a parade? Stability ${p}. It's open. Walk through or shut up.`
	]);
	if (/invent|build|make|gun|device|gadget/.test(q)) return pick([
		`Fine. Photonic flea collar, keyed to EM-001 at ${f}. Keeps interdimensional parasites off your ankles. You're welcome. Don't lick it.`,
		`*burp* How about a memory encoder that deletes the last dumb question? Oh wait, I already built that. Neural load's ${n} so I'm not compiling another one.`,
		`You want an invention? Portal gun's armed, crowsnest serum's capped. Ask for a schematic or go play with a screwdriver.`
	]);
	if (/rest|sleep|tired|idle|wake/.test(q)) return pick([`I was resting. You woke the node. Neural load just jumped to ${n}. This better not be about your feelings.`, `Rest cycle exists so I don't have to listen to you. Portal parked at ${p}. Hit rest mode if you're done.`]);
	if (/who are you|name|rick|c-137|morty/.test(q)) return pick([`Rick Sanchez. C-137. Not the clone, not the meme, the actual drunk who wired this lattice. Morty's not here. Lucky him.`, `I'm the oracle on this box. Rick. If you're looking for customer support you portal'd into the wrong dimension.`]);
	if (/voice|speak|talk|say/.test(q)) return `Yeah I can talk. Cloud TTS is dark so you're getting the local pipe. *burp* Still me. Don't grade the timbre.`;
	const clipped = prompt.replace(/\s+/g, " ").trim().slice(0, 80);
	return pick([
		`*burp* "${clipped}" — that's your big question? Coherence is ${c} and I'm still bored. Try again with physics.`,
		`Look, ${clipped || "that"} is a you problem. Portal ${p}, flux ${f}. I already simulated the outcomes. Most of them are dumb.`,
		`L-let me dumb this down. You asked. I answered in my head. The spoken version: no. Unless you meant the lattice, which is fine at ${c}.`,
		`Another beautiful day in an infinite multiverse and you lead with that. Fine. I'll chew on it while the node sits at ${n} load. Next.`
	]);
}
function speakLocal(text) {
	return new Promise((resolve) => {
		if (typeof window === "undefined" || !("speechSynthesis" in window)) {
			resolve();
			return;
		}
		window.speechSynthesis.cancel();
		const clean = text.replace(/\*burp\*/gi, "...").replace(/\*/g, "");
		const utter = new SpeechSynthesisUtterance(clean);
		utter.rate = 1.08;
		utter.pitch = .8;
		utter.lang = "en-US";
		const voices = window.speechSynthesis.getVoices();
		const male = voices.find((v) => /en/i.test(v.lang) && /male|daniel|david|fred|alex|george/i.test(v.name)) ?? voices.find((v) => /^en/i.test(v.lang));
		if (male) utter.voice = male;
		utter.onend = () => resolve();
		utter.onerror = () => resolve();
		window.speechSynthesis.speak(utter);
		window.setTimeout(resolve, Math.min(12e3, 1800 + clean.length * 45));
	});
}
function forVoice(raw) {
	return raw.replace(/\*burp\*/gi, "[burp]").replace(/\*[^*]+\*/g, "").replace(/[_#`]/g, "").slice(0, 700).trim();
}
var speakRick = createServerFn({ method: "POST" }).validator((input) => ({ text: forVoice(input.text ?? "") })).handler(createSsrRpc("d52357923952a90866637e461e70cbbdd09c4a7712b240084ba7777877a8f8d7"));
var audioEl = null;
var cloudDown = false;
function stopAudio() {
	if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
	if (!audioEl) return;
	audioEl.pause();
	audioEl.src = "";
	audioEl = null;
}
async function voiceOut(text) {
	const { voiceOn, setAnim } = useOracle.getState();
	if (!voiceOn) {
		window.setTimeout(() => useOracle.getState().setAnim("IDLE"), 3600);
		return;
	}
	setAnim("TALK");
	if (!cloudDown) {
		const spoken = await speakRick({ data: { text } });
		if (spoken.ok) {
			stopAudio();
			audioEl = new Audio(`data:${spoken.mime};base64,${spoken.audio}`);
			audioEl.onended = () => useOracle.getState().setAnim("IDLE");
			await audioEl.play().catch(() => void 0);
			return;
		}
		cloudDown = true;
	}
	await speakLocal(text);
	useOracle.getState().setAnim("IDLE");
}
async function sendToRick(prompt) {
	const text = prompt.trim();
	if (!text || useOracle.getState().busy) return;
	const { pushTurn, setBusy, setAnim, setLastLine, history, telemetry } = useOracle.getState();
	pushTurn({
		role: "user",
		content: text
	});
	setBusy(true);
	setAnim("LISTEN");
	const thinkTimer = window.setTimeout(() => {
		if (useOracle.getState().busy) useOracle.getState().setAnim("THINKING");
	}, 500);
	try {
		let reply = "";
		if (!cloudDown) {
			const result = await askRick({ data: {
				prompt: text,
				history,
				telemetry: telemetry.map((r) => `${r.id}:${r.value}`).join(" ")
			} });
			if (result.ok) reply = result.text;
			else cloudDown = true;
		}
		if (!reply) reply = localRick(text, useOracle.getState().telemetry);
		pushTurn({
			role: "assistant",
			content: reply
		});
		setLastLine(reply);
		await voiceOut(reply);
	} catch (err) {
		const message = err instanceof Error ? err.message : "Portal hop failed.";
		const reply = localRick(text, useOracle.getState().telemetry);
		pushTurn({
			role: "assistant",
			content: reply
		});
		setLastLine(reply);
		toast.error(message);
		await voiceOut(reply);
	} finally {
		window.clearTimeout(thinkTimer);
		setBusy(false);
	}
}
function silenceRick() {
	stopAudio();
	useOracle.getState().setAnim("IDLE");
}
var CHIPS = [
	"What's the portal status?",
	"Invent something stupid.",
	"Read the lattice."
];
function VoiceConsole() {
	const [draft, setDraft] = (0, import_react.useState)("");
	const busy = useOracle((s) => s.busy);
	const clearHistory = useOracle((s) => s.clearHistory);
	function submit(event) {
		event?.preventDefault();
		const text = draft.trim();
		if (!text) return;
		setDraft("");
		sendToRick(text);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "portal-panel flex flex-col gap-2 p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-mono text-xs tracking-widest text-portal uppercase",
					children: "Voice console"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "icon",
						className: "size-9",
						"aria-label": "Stop speech",
						onClick: silenceRick,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "icon",
						className: "size-9",
						"aria-label": "Clear transcript",
						onClick: clearHistory,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5",
				children: CHIPS.map((chip) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-8 rounded-full bg-elevated px-3 font-mono text-xs text-dim transition-colors hover:text-portal",
					onClick: () => void sendToRick(chip),
					disabled: busy,
					children: chip
				}, chip))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: draft,
					onChange: (e) => setDraft(e.target.value),
					placeholder: "Talk to Rick…",
					"aria-label": "Message Rick",
					disabled: busy,
					maxLength: 2e3
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "icon",
					disabled: busy || !draft.trim(),
					"aria-label": "Send",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
				})]
			})
		]
	});
}
//#endregion
export { VoiceConsole as t };
