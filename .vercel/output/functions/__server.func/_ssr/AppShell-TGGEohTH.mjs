import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Menu, l as Mic, o as Radio, t as Wifi, u as MicOff } from "../_libs/lucide-react.mjs";
import { n as useOracle } from "./router-CNckhvjd.mjs";
import { i as NAV, n as Button, o as cn, r as Clock, t as Badge } from "./VideoLoop-DiB5JK-a.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-TGGEohTH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HudBar({ onMenu, dense = false }) {
	const voiceOn = useOracle((s) => s.voiceOn);
	const setVoiceOn = useOracle((s) => s.setVoiceOn);
	const anim = useOracle((s) => s.anim);
	const busy = useOracle((s) => s.busy);
	const statusTone = anim === "TALK" ? "voice" : busy ? "think" : anim === "IDLE" ? "online" : "stable";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("portal-panel flex items-center justify-between gap-3 px-3", dense ? "h-12" : "h-14"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 items-center gap-2",
			children: [onMenu ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				className: "size-11 shrink-0 md:hidden",
				onClick: onMenu,
				"aria-label": "Open navigation",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-sm tracking-widest text-portal",
					children: "RICK C-137"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden truncate font-mono text-xs text-muted sm:block",
					children: "Same shit, different dimension"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5 sm:gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					tone: "online",
					className: "hidden sm:inline-flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { className: "size-3" }), "Online"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					tone: statusTone,
					className: "hidden md:inline-flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-3" }), busy ? "Thinking" : anim]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "size-11",
					"aria-pressed": voiceOn,
					"aria-label": voiceOn ? "Mute voice" : "Enable voice",
					onClick: () => setVoiceOn(!voiceOn),
					children: voiceOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4 text-signal" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {})
			]
		})]
	});
}
function SideNav({ onNavigate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "flex flex-col gap-1 p-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto my-3 size-10 rounded-full shadow-[inset_0_0_0_2px_rgb(0_255_170_/_0.45)] [animation:spin_12s_linear_infinite] motion-reduce:animate-none" }), NAV.map(({ to, label, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to,
			onClick: onNavigate,
			className: "flex min-h-11 items-center gap-3 rounded-md px-3 py-2 font-mono text-xs tracking-widest uppercase text-muted transition-colors duration-(--motion-fast) hover:bg-elevated hover:text-portal",
			activeProps: { className: "bg-portal/15 text-portal" },
			activeOptions: { exact: to === "/" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("truncate", onNavigate ? "inline" : "hidden xl:inline"),
				children: label
			})]
		}, to))]
	});
}
function AppShell({ children, className }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh flex-col overflow-hidden bg-bg p-2 pb-16 md:pb-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HudBar, { onMenu: () => setOpen(true) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex min-h-0 flex-1 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "portal-panel hidden w-16 shrink-0 overflow-y-auto md:block xl:w-52",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideNav, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("flex min-h-0 min-w-0 flex-1 flex-col", className),
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "portal-panel fixed inset-x-2 bottom-2 z-30 flex h-14 items-stretch justify-around md:hidden",
				children: NAV.map(({ to, label, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to,
					"aria-label": label,
					className: "flex min-w-11 flex-1 flex-col items-center justify-center gap-0.5 text-muted",
					activeProps: { className: "text-portal" },
					activeOptions: { exact: to === "/" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs uppercase tracking-wider",
						children: label
					})]
				}, to))
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-40 md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "absolute inset-0 bg-bg/70",
					"aria-label": "Close navigation",
					onClick: () => setOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "relative h-full w-72 bg-surface shadow-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4 font-display text-sm tracking-widest text-portal",
						children: "Portal nav"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideNav, { onNavigate: () => setOpen(false) })]
				})]
			}) : null
		]
	});
}
//#endregion
export { AppShell as t };
