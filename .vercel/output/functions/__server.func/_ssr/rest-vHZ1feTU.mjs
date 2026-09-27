import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useOracle } from "./router-CNckhvjd.mjs";
import { n as Button } from "./VideoLoop-DiB5JK-a.mjs";
import { t as CinematicFrame } from "./CinematicFrame-CcBI8P3l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rest-vHZ1feTU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Rest() {
	const setAnim = useOracle((s) => s.setAnim);
	const tick = useOracle((s) => s.tickTelemetry);
	(0, import_react.useEffect)(() => {
		setAnim("IDLE");
		const id = window.setInterval(() => tick(true), 2200);
		return () => window.clearInterval(id);
	}, [setAnim, tick]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CinematicFrame, {
		clip: "idle",
		badge: "Resting",
		eyebrow: "Rest cycle",
		title: "He's between thoughts.",
		body: "Neural load dumped. Portal harmonics parked at idle. Wake him if you've got a real problem — not a feelings journal.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			size: "lg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/oracle",
				children: "Wake Rick"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "ghost",
			size: "lg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				children: "Back to portal"
			})
		})]
	});
}
//#endregion
export { Rest as component };
