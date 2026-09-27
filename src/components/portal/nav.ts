import {
  FlaskConical,
  Home,
  LayoutGrid,
  MessageSquare,
  Moon,
} from "lucide-react";

export const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/rest", label: "Rest", icon: Moon },
  { to: "/oracle", label: "Oracle", icon: MessageSquare },
  { to: "/lab", label: "Lab", icon: FlaskConical },
  { to: "/grid", label: "Grid", icon: LayoutGrid },
] as const;
