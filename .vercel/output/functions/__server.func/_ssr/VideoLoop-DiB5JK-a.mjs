import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Moon, d as MessageSquare, h as FlaskConical, m as House, p as LayoutGrid } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/VideoLoop-DiB5JK-a.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var badgeVariants = cva("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-xs tracking-wider uppercase", {
	variants: { tone: {
		online: "bg-portal/15 text-portal shadow-[inset_0_0_0_1px_rgb(0_255_170_/_0.35)]",
		voice: "bg-signal/15 text-signal shadow-[inset_0_0_0_1px_rgb(90_168_232_/_0.35)]",
		stable: "bg-ok/15 text-ok shadow-[inset_0_0_0_1px_rgb(61_207_138_/_0.35)]",
		think: "bg-warn/15 text-warn shadow-[inset_0_0_0_1px_rgb(212_168_75_/_0.35)]",
		error: "bg-danger/15 text-danger shadow-[inset_0_0_0_1px_rgb(224_90_90_/_0.35)]",
		mute: "bg-elevated text-muted shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.08)]"
	} },
	defaultVariants: { tone: "mute" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ tone }), className),
		...props
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-display text-xs tracking-widest uppercase transition-[opacity,transform,box-shadow,background-color] duration-(--motion-fast) ease-(--ease-out-soft) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portal/60 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]", {
	variants: {
		variant: {
			primary: "bg-portal text-bg shadow-[0_0_20px_rgb(0_255_170_/_0.18)] hover:brightness-110",
			secondary: "bg-transparent text-portal shadow-[inset_0_0_0_1px_rgb(0_255_170_/_0.45)] hover:bg-portal/10",
			ghost: "bg-transparent text-muted shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.1)] hover:text-fg hover:bg-elevated",
			danger: "bg-danger text-fg hover:brightness-110"
		},
		size: {
			sm: "h-9 rounded-sm px-3",
			md: "h-11 rounded-md px-4",
			lg: "h-12 rounded-lg px-5",
			icon: "size-11 rounded-md"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function Clock() {
	const [now, setNow] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setNow(/* @__PURE__ */ new Date());
		const id = window.setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
		return () => window.clearInterval(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
		dateTime: now?.toISOString(),
		className: "font-mono text-sm tabular-nums tracking-wider text-portal",
		children: now ? now.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit"
		}) : "--:--:--"
	});
}
var NAV = [
	{
		to: "/",
		label: "Home",
		icon: House
	},
	{
		to: "/rest",
		label: "Rest",
		icon: Moon
	},
	{
		to: "/oracle",
		label: "Oracle",
		icon: MessageSquare
	},
	{
		to: "/lab",
		label: "Lab",
		icon: FlaskConical
	},
	{
		to: "/grid",
		label: "Grid",
		icon: LayoutGrid
	}
];
var VIDEOS = {
	portal: {
		src: "/videos/avatar-portal-loop.mp4",
		poster: "/videos/avatar-portal-loop-poster.jpg",
		label: "Portal loop"
	},
	idle: {
		src: "/videos/dashboard-idle.mp4",
		poster: "/videos/dashboard-idle-poster.jpg",
		label: "Resting"
	},
	talk: {
		src: "/videos/dashboard-talk.mp4",
		poster: "/videos/dashboard-talk-poster.jpg",
		label: "Speaking"
	},
	lab: {
		src: "/videos/avatar-lab-loop.mp4",
		poster: "/videos/avatar-lab-loop-poster.jpg",
		label: "Lab"
	},
	design: {
		src: "/videos/design-system.mp4",
		poster: "/videos/design-system-poster.jpg",
		label: "Design system"
	},
	widgets: {
		src: "/videos/mobile-widgets.mp4",
		poster: "/videos/mobile-widgets-poster.jpg",
		label: "Grid"
	}
};
function videoForAnim(anim) {
	switch (anim) {
		case "TALK": return "talk";
		case "LISTEN": return "portal";
		case "THINKING":
		case "SERIOUS": return "lab";
		case "WALK": return "widgets";
		default: return "idle";
	}
}
function VideoLoop({ clip, className, fit = "cover" }) {
	const ref = (0, import_react.useRef)(null);
	const asset = VIDEOS[clip];
	(0, import_react.useEffect)(() => {
		const node = ref.current;
		if (!node) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			node.pause();
			return;
		}
		const play = () => {
			node.play().catch(() => void 0);
		};
		play();
		node.addEventListener("canplay", play);
		return () => node.removeEventListener("canplay", play);
	}, [clip]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
		ref,
		className: cn("h-full w-full bg-bg", fit === "cover" ? "object-cover object-center" : "object-contain", className),
		src: asset.src,
		poster: asset.poster,
		autoPlay: true,
		muted: true,
		loop: true,
		playsInline: true,
		preload: "auto",
		"aria-label": asset.label
	}, asset.src);
}
//#endregion
export { VideoLoop as a, NAV as i, Button as n, cn as o, Clock as r, videoForAnim as s, Badge as t };
