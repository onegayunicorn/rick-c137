import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as VideoLoop, i as NAV, r as Clock, t as Badge } from "./VideoLoop-DiB5JK-a.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CinematicFrame-CcBI8P3l.js
var import_jsx_runtime = require_jsx_runtime();
function CinematicFrame({ clip, eyebrow, title, body, children, badge }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh overflow-hidden bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoLoop, { clip })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "vignette absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "scanlines absolute inset-0 opacity-60" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex min-h-dvh flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-4 py-4 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-sm tracking-widest text-portal",
						children: "RICK C-137"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-xs text-muted",
						children: "Sovereign Oracle"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "online",
							children: badge
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex flex-col gap-5 px-4 pb-24 sm:px-8 sm:pb-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs tracking-widest text-portal uppercase",
								children: eyebrow
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 font-display text-3xl leading-tight tracking-wide text-fg",
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-md font-body text-lg leading-relaxed text-dim",
								children: body
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-3",
						children
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "absolute inset-x-0 bottom-0 z-20 flex justify-center gap-1 pb-3 pt-8 sm:hidden",
				children: NAV.map(({ to, label, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to,
					"aria-label": label,
					className: "flex size-11 items-center justify-center rounded-full text-muted",
					activeProps: { className: "text-portal" },
					activeOptions: { exact: to === "/" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
				}, to))
			})
		]
	});
}
//#endregion
export { CinematicFrame as t };
