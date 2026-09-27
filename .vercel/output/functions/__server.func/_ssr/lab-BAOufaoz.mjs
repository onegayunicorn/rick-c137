import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as INVENTIONS } from "./persona-DkdgE8nI.mjs";
import { a as VideoLoop, t as Badge } from "./VideoLoop-DiB5JK-a.mjs";
import { t as AppShell } from "./AppShell-TGGEohTH.mjs";
import { t as VoiceConsole } from "./VoiceConsole-CHmZum-c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lab-BAOufaoz.js
var import_jsx_runtime = require_jsx_runtime();
function Lab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(12rem,0.9fr)_minmax(0,1.1fr)] gap-2 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:grid-rows-[minmax(0,1fr)_auto]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "portal-panel relative min-h-0 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoLoop, {
					clip: "lab",
					fit: "cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg to-transparent p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs tracking-widest text-portal uppercase",
						children: "Garage-adjacent"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-xl tracking-wide text-fg",
						children: "Lab loop"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "portal-panel min-h-0 overflow-y-auto p-4 lg:row-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-sm tracking-widest text-portal",
					children: "Inventions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 flex flex-col gap-2",
					children: INVENTIONS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-md bg-elevated/80 p-3 shadow-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-sm tracking-wide text-fg",
								children: item.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "online",
								children: item.status
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm leading-relaxed text-muted",
							children: item.note
						})]
					}, item.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-start-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceConsole, {})
			})
		]
	}) });
}
//#endregion
export { Lab as component };
