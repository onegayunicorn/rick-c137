import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Button } from "./VideoLoop-DiB5JK-a.mjs";
import { t as CinematicFrame } from "./CinematicFrame-CcBI8P3l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CCLh0fOS.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CinematicFrame, {
		clip: "portal",
		badge: "Portal open",
		eyebrow: "Dimension C-137",
		title: "The lattice is coherent. Don't waste it.",
		body: "Rick is on-node. Portal loop live. Ask the oracle a real question or leave him in rest until the harmonics drift.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				size: "lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/oracle",
					children: "Open the oracle"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "secondary",
				size: "lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/rest",
					children: "Rest mode"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "ghost",
				size: "lg",
				className: "hidden sm:inline-flex",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/lab",
					children: "Enter the lab"
				})
			})
		]
	});
}
//#endregion
export { Home as component };
