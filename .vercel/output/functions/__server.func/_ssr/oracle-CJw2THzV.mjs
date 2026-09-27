import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useOracle } from "./router-CNckhvjd.mjs";
import { a as VideoLoop, o as cn, s as videoForAnim, t as Badge } from "./VideoLoop-DiB5JK-a.mjs";
import { t as AppShell } from "./AppShell-TGGEohTH.mjs";
import { t as VoiceConsole } from "./VoiceConsole-CHmZum-c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/oracle-CJw2THzV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATES = [
	"IDLE",
	"TALK",
	"LISTEN",
	"THINKING",
	"SERIOUS",
	"WALK"
];
function AnimPills({ layout = "row" }) {
	const current = useOracle((s) => s.anim);
	const setAnim = useOracle((s) => s.setAnim);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex gap-1.5", layout === "col" ? "flex-col" : "flex-wrap"),
		children: STATES.map((state) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setAnim(state),
			className: cn("h-9 min-w-16 rounded-full px-3 font-mono text-xs tracking-widest uppercase transition-colors", current === state ? "bg-portal/15 text-portal shadow-[inset_0_0_0_1px_var(--color-portal)]" : "bg-elevated/60 text-muted shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.08)] hover:text-portal"),
			children: state
		}, state))
	});
}
function ChatLog() {
	const history = useOracle((s) => s.history);
	const bottom = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		bottom.current?.scrollIntoView({ behavior: "smooth" });
	}, [history.length]);
	if (!history.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-3 py-4 font-body text-sm leading-relaxed text-muted",
		children: "No transcript yet. Type below or hit a prompt chip. He will be rude. That is the product."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2 overflow-y-auto px-3 py-3",
		children: [history.map((turn, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("max-w-[92%] rounded-md px-3 py-2 text-sm leading-relaxed", turn.role === "user" ? "self-end bg-elevated text-fg" : "self-start bg-portal/10 text-fg shadow-[inset_0_0_0_1px_rgb(0_255_170_/_0.18)]"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-1 font-mono text-xs uppercase tracking-widest text-muted",
				children: turn.role === "user" ? "You" : "C-137"
			}), turn.content]
		}, `${turn.role}-${i}`)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: bottom })]
	});
}
function TelemetryStrip() {
	const rows = useOracle((s) => s.telemetry).slice(0, 4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "grid grid-cols-2 gap-2 p-3",
		children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-mono text-xs text-muted",
			children: row.id
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "font-display text-lg tabular-nums text-portal",
			children: [row.value, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-1 text-xs text-muted",
				children: row.unit
			})]
		})] }, row.id))
	});
}
function Oracle() {
	const anim = useOracle((s) => s.anim);
	const lastLine = useOracle((s) => s.lastLine);
	const clip = videoForAnim(anim);
	const busy = useOracle((s) => s.busy);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(0,1fr)_auto] gap-2 lg:grid-cols-[minmax(0,1fr)_20rem] lg:grid-rows-[minmax(0,1fr)_auto]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "portal-panel relative min-h-0 overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-sm tracking-widest text-portal sm:text-lg",
							children: "RICK C-137"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-xs text-muted",
							children: "Oracle node"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-auto lg:hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: busy ? "think" : anim === "TALK" ? "voice" : "online",
								children: anim
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-auto absolute left-2 top-14 z-10 hidden lg:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimPills, { layout: "col" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoLoop, {
						clip,
						fit: "cover",
						className: "absolute inset-0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/75 to-transparent p-3 sm:p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs tracking-widest text-portal uppercase",
							children: "Live subtitle"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 line-clamp-3 max-w-2xl font-body text-sm leading-relaxed text-fg",
							children: lastLine
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "portal-panel hidden min-h-0 flex-col overflow-hidden lg:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-b border-hairline px-3 py-2 font-mono text-xs tracking-widest text-portal uppercase",
						children: "Transcript"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-h-0 flex-1 overflow-y-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatLog, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-hairline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TelemetryStrip, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceConsole, {})
			})
		]
	}) });
}
//#endregion
export { Oracle as component };
