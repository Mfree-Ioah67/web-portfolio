import { pages } from "@/content/data";

const order = ["/", ...pages.map((p) => p.path)];

// Tells the page-transition CSS which way to slide. Called from a link's
// onClick, so it runs before React Router starts the view transition.
export function setDirection(to: string) {
  const from = window.location.pathname.replace(/\/+$/, "") || "/";
  document.documentElement.dataset.dir = order.indexOf(to) < order.indexOf(from) ? "back" : "forward";
}
