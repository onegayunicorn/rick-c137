import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Activity, g as Cpu, i as Smartphone } from "../_libs/lucide-react.mjs";
import { n as useOracle } from "./router-CNckhvjd.mjs";
import { a as VideoLoop, t as Badge } from "./VideoLoop-DiB5JK-a.mjs";
import { t as AppShell } from "./AppShell-TGGEohTH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/grid-D-bz8JjM.js
var import_jsx_runtime = require_jsx_runtime();
var DEVICES = [
	{
		name: "Oracle node",
		on: true
	},
	{
		name: "Neural band",
		on: true
	},
	{
		name: "Portal gun",
		on: true
	},
	{
		name: "Edge phone",
		on: false
	}
];
function TelemetryRail() {
	const rows = useOracle((s) => s.telemetry);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col gap-2 overflow-y-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "portal-panel p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center gap-2 font-mono text-xs tracking-widest text-portal uppercase",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-3.5" }), "Portal core"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between font-mono text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							row.id,
							" · ",
							row.label
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-signal",
							children: [row.value, row.unit]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 h-1 overflow-hidden rounded-full bg-elevated",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-portal transition-[width] duration-(--motion-slow)",
							style: { width: `${Math.min(100, row.value)}%` }
						})
					})] }, row.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "portal-panel p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center gap-2 font-mono text-xs tracking-widest text-portal uppercase",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-3.5" }), "Nodes"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: DEVICES.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between py-1.5 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-dim",
						children: d.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: d.on ? "size-2 rounded-full bg-portal" : "size-2 rounded-full bg-muted" })]
				}, d.name)) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "portal-panel hidden p-3 xl:block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center gap-2 font-mono text-xs tracking-widest text-portal uppercase",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "size-3.5" }), "Activity"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-1 font-mono text-xs text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Neural link established" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Quantum harmonics stable" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Memory encoder synced" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Dimension D-742 scanned" })
					]
				})]
			})
		]
	});
}
function Grid() {
	const rows = useOracle((s) => s.telemetry);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-0 flex-1 grid-cols-1 gap-2 overflow-y-auto lg:grid-cols-[minmax(0,1.2fr)_18rem] lg:overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 flex-col gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "portal-panel relative min-h-52 flex-1 overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoLoop, {
						clip: "widgets",
						fit: "cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute left-4 top-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "voice",
							children: "Widget lattice"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "portal-panel grid grid-cols-2 gap-2 p-3 sm:grid-cols-4",
					children: rows.slice(0, 4).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md bg-bg p-3 shadow-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-xs text-muted",
								children: row.id
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 font-display text-xl tabular-nums text-portal",
								children: [row.value, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 text-xs text-muted",
									children: row.unit
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-dim",
								children: row.label
							})
						]
					}, row.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "portal-panel relative min-h-36 overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoLoop, {
							clip: "design",
							fit: "cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-bg/40" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute bottom-3 left-4 right-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs tracking-widest text-portal uppercase",
								children: "Design system"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-body text-sm text-dim",
								children: "Portal green on AMOLED. Same drunk genius, tighter kerning."
							})]
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "hidden min-h-0 overflow-y-auto lg:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TelemetryRail, {})
		})]
	}) });
}
//#endregion
export { Grid as component };
