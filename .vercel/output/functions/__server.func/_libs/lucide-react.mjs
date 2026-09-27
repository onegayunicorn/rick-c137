import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "./@radix-ui/react-compose-refs+[...].mjs";
//#region node_modules/lucide-react/dist/esm/shared/src/utils.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* @license lucide-react v0.510.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
var toCamelCase = (string) => string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());
var toPascalCase = (string) => {
	const camelCase = toCamelCase(string);
	return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
	return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
var hasA11yProp = (props) => {
	for (const prop in props) if (prop.startsWith("aria-") || prop === "role" || prop === "title") return true;
};
//#endregion
//#region node_modules/lucide-react/dist/esm/defaultAttributes.js
/**
* @license lucide-react v0.510.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var defaultAttributes = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
};
//#endregion
//#region node_modules/lucide-react/dist/esm/Icon.js
/**
* @license lucide-react v0.510.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Icon = (0, import_react.forwardRef)(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref) => (0, import_react.createElement)("svg", {
	ref,
	...defaultAttributes,
	width: size,
	height: size,
	stroke: color,
	strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
	className: mergeClasses("lucide", className),
	...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
	...rest
}, [...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)), ...Array.isArray(children) ? children : [children]]));
//#endregion
//#region node_modules/lucide-react/dist/esm/createLucideIcon.js
/**
* @license lucide-react v0.510.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var createLucideIcon = (iconName, iconNode) => {
	const Component = (0, import_react.forwardRef)(({ className, ...props }, ref) => (0, import_react.createElement)(Icon, {
		ref,
		iconNode,
		className: mergeClasses(`lucide-${toKebabCase(toPascalCase(iconName))}`, `lucide-${iconName}`, className),
		...props
	}));
	Component.displayName = toPascalCase(iconName);
	return Component;
};
/**
* @license lucide-react v0.510.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Activity = createLucideIcon("activity", [["path", {
	d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
	key: "169zse"
}]]);
/**
* @license lucide-react v0.510.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Cpu = createLucideIcon("cpu", [
	["path", {
		d: "M12 20v2",
		key: "1lh1kg"
	}],
	["path", {
		d: "M12 2v2",
		key: "tus03m"
	}],
	["path", {
		d: "M17 20v2",
		key: "1rnc9c"
	}],
	["path", {
		d: "M17 2v2",
		key: "11trls"
	}],
	["path", {
		d: "M2 12h2",
		key: "1t8f8n"
	}],
	["path", {
		d: "M2 17h2",
		key: "7oei6x"
	}],
	["path", {
		d: "M2 7h2",
		key: "asdhe0"
	}],
	["path", {
		d: "M20 12h2",
		key: "1q8mjw"
	}],
	["path", {
		d: "M20 17h2",
		key: "1fpfkl"
	}],
	["path", {
		d: "M20 7h2",
		key: "1o8tra"
	}],
	["path", {
		d: "M7 20v2",
		key: "4gnj0m"
	}],
	["path", {
		d: "M7 2v2",
		key: "1i4yhu"
	}],
	["rect", {
		x: "4",
		y: "4",
		width: "16",
		height: "16",
		rx: "2",
		key: "1vbyd7"
	}],
	["rect", {
		x: "8",
		y: "8",
		width: "8",
		height: "8",
		rx: "1",
		key: "z9xiuo"
	}]
]);
/**
* @license lucide-react v0.510.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var FlaskConical = createLucideIcon("flask-conical", [
	["path", {
		d: "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",
		key: "18mbvz"
	}],
	["path", {
		d: "M6.453 15h11.094",
		key: "3shlmq"
	}],
	["path", {
		d: "M8.5 2h7",
		key: "csnxdl"
	}]
]);
/**
* @license lucide-react v0.510.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var House = createLucideIcon("house", [["path", {
	d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",
	key: "5wwlr5"
}], ["path", {
	d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
	key: "1d0kgt"
}]]);
/**
* @license lucide-react v0.510.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LayoutGrid = createLucideIcon("layout-grid", [
	["rect", {
		width: "7",
		height: "7",
		x: "3",
		y: "3",
		rx: "1",
		key: "1g98yp"
	}],
	["rect", {
		width: "7",
		height: "7",
		x: "14",
		y: "3",
		rx: "1",
		key: "6d4xhi"
	}],
	["rect", {
		width: "7",
		height: "7",
		x: "14",
		y: "14",
		rx: "1",
		key: "nxv5o0"
	}],
	["rect", {
		width: "7",
		height: "7",
		x: "3",
		y: "14",
		rx: "1",
		key: "1bb6yr"
	}]
]);
/**
* @license lucide-react v0.510.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Menu = createLucideIcon("menu", [
	["path", {
		d: "M4 12h16",
		key: "1lakjw"
	}],
	["path", {
		d: "M4 18h16",
		key: "19g7jn"
	}],
	["path", {
		d: "M4 6h16",
		key: "1o0s65"
	}]
]);
/**
* @license lucide-react v0.510.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var MessageSquare = createLucideIcon("message-square", [["path", {
	d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
	key: "1lielz"
}]]);
/**
* @license lucide-react v0.510.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var MicOff = createLucideIcon("mic-off", [
	["line", {
		x1: "2",
		x2: "22",
		y1: "2",
		y2: "22",
		key: "a6p6uj"
	}],
	["path", {
		d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2",
		key: "80xlxr"
	}],
	["path", {
		d: "M5 10v2a7 7 0 0 0 12 5",
		key: "p2k8kg"
	}],
	["path", {
		d: "M15 9.34V5a3 3 0 0 0-5.68-1.33",
		key: "1gzdoj"
	}],
	["path", {
		d: "M9 9v3a3 3 0 0 0 5.12 2.12",
		key: "r2i35w"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "19",
		y2: "22",
		key: "x3vr5v"
	}]
]);
/**
* @license lucide-react v0.510.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Mic = createLucideIcon("mic", [
	["path", {
		d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",
		key: "131961"
	}],
	["path", {
		d: "M19 10v2a7 7 0 0 1-14 0v-2",
		key: "1vc78b"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "19",
		y2: "22",
		key: "x3vr5v"
	}]
]);
/**
* @license lucide-react v0.510.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Moon = createLucideIcon("moon", [["path", {
	d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",
	key: "a7tn18"
}]]);
/**
* @license lucide-react v0.510.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Pause = createLucideIcon("pause", [["rect", {
	x: "14",
	y: "4",
	width: "4",
	height: "16",
	rx: "1",
	key: "zuxfzm"
}], ["rect", {
	x: "6",
	y: "4",
	width: "4",
	height: "16",
	rx: "1",
	key: "1okwgv"
}]]);
/**
* @license lucide-react v0.510.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Radio = createLucideIcon("radio", [
	["path", {
		d: "M4.9 19.1C1 15.2 1 8.8 4.9 4.9",
		key: "1vaf9d"
	}],
	["path", {
		d: "M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5",
		key: "u1ii0m"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "2",
		key: "1c9p78"
	}],
	["path", {
		d: "M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5",
		key: "1j5fej"
	}],
	["path", {
		d: "M19.1 4.9C23 8.8 23 15.1 19.1 19",
		key: "10b0cb"
	}]
]);
/**
* @license lucide-react v0.510.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Send = createLucideIcon("send", [["path", {
	d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
	key: "1ffxy3"
}], ["path", {
	d: "m21.854 2.147-10.94 10.939",
	key: "12cjpa"
}]]);
/**
* @license lucide-react v0.510.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Smartphone = createLucideIcon("smartphone", [["rect", {
	width: "14",
	height: "20",
	x: "5",
	y: "2",
	rx: "2",
	ry: "2",
	key: "1yt0o3"
}], ["path", {
	d: "M12 18h.01",
	key: "mhygvu"
}]]);
/**
* @license lucide-react v0.510.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Trash2 = createLucideIcon("trash-2", [
	["path", {
		d: "M3 6h18",
		key: "d0wm0j"
	}],
	["path", {
		d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",
		key: "4alrt4"
	}],
	["path", {
		d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",
		key: "v07s0e"
	}],
	["line", {
		x1: "10",
		x2: "10",
		y1: "11",
		y2: "17",
		key: "1uufr5"
	}],
	["line", {
		x1: "14",
		x2: "14",
		y1: "11",
		y2: "17",
		key: "xtxkd"
	}]
]);
/**
* @license lucide-react v0.510.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var TriangleAlert = createLucideIcon("triangle-alert", [
	["path", {
		d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
		key: "wmoenq"
	}],
	["path", {
		d: "M12 9v4",
		key: "juzpu7"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]);
/**
* @license lucide-react v0.510.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Wifi = createLucideIcon("wifi", [
	["path", {
		d: "M12 20h.01",
		key: "zekei9"
	}],
	["path", {
		d: "M2 8.82a15 15 0 0 1 20 0",
		key: "dnpr2z"
	}],
	["path", {
		d: "M5 12.859a10 10 0 0 1 14 0",
		key: "1x1e6c"
	}],
	["path", {
		d: "M8.5 16.429a5 5 0 0 1 7 0",
		key: "1bycff"
	}]
]);
//#endregion
export { Activity as _, Send as a, Moon as c, MessageSquare as d, Menu as f, Cpu as g, FlaskConical as h, Smartphone as i, Mic as l, House as m, TriangleAlert as n, Radio as o, LayoutGrid as p, Trash2 as r, Pause as s, Wifi as t, MicOff as u };
