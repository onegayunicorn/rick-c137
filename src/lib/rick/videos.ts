export type VideoKey =
  | "portal"
  | "idle"
  | "talk"
  | "lab"
  | "design"
  | "widgets";

export const VIDEOS: Record<
  VideoKey,
  { src: string; poster: string; label: string }
> = {
  portal: {
    src: "/videos/avatar-portal-loop.mp4",
    poster: "/videos/avatar-portal-loop-poster.jpg",
    label: "Portal loop",
  },
  idle: {
    src: "/videos/dashboard-idle.mp4",
    poster: "/videos/dashboard-idle-poster.jpg",
    label: "Resting",
  },
  talk: {
    src: "/videos/dashboard-talk.mp4",
    poster: "/videos/dashboard-talk-poster.jpg",
    label: "Speaking",
  },
  lab: {
    src: "/videos/avatar-lab-loop.mp4",
    poster: "/videos/avatar-lab-loop-poster.jpg",
    label: "Lab",
  },
  design: {
    src: "/videos/design-system.mp4",
    poster: "/videos/design-system-poster.jpg",
    label: "Design system",
  },
  widgets: {
    src: "/videos/mobile-widgets.mp4",
    poster: "/videos/mobile-widgets-poster.jpg",
    label: "Grid",
  },
};

export type RickAnim = "IDLE" | "TALK" | "LISTEN" | "THINKING" | "SERIOUS" | "WALK";

export function videoForAnim(anim: RickAnim): VideoKey {
  switch (anim) {
    case "TALK":
      return "talk";
    case "LISTEN":
      return "portal";
    case "THINKING":
    case "SERIOUS":
      return "lab";
    case "WALK":
      return "widgets";
    default:
      return "idle";
  }
}
