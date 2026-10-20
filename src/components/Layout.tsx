import { useLayoutEffect, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { Outlet, useLocation } from "react-router";
import Background from "@/background/Background";
import { SCENE_IDS, type SceneId } from "@/background/scenes";
import Controls, { type Theme } from "@/components/Controls";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useChoice } from "@/hooks/useChoice";
import { useReveal } from "@/hooks/useReveal";

const THEMES: readonly Theme[] = ["dark", "light"];
const THEME_COLOR: Record<Theme, string> = { dark: "#141311", light: "#f3efe6" };

type StartViewTransition = (update: () => void) => { finished: Promise<void> };

export default function Layout() {
  const { pathname } = useLocation();
  // index.html sets data-theme before first paint (saved choice or system).
  const [theme, setTheme] = useChoice<Theme>("theme", THEMES, () =>
    document.documentElement.dataset.theme === "light" ? "light" : "dark",
  );
  const [scene, setScene] = useChoice<SceneId>("background", SCENE_IDS, () => "plexus");

  // Runs inside React Router's view transition, so the new page is
  // captured already scrolled to the top.
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);
  }, [theme]);

  useReveal(pathname);

  // The new theme spreads out in a circle from the button that was pressed.
  const toggleTheme = (e: MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    const start = (document as unknown as { startViewTransition?: StartViewTransition }).startViewTransition;
    if (!start || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTheme(next);
      return;
    }
    const r = e.currentTarget.getBoundingClientRect();
    root.style.setProperty("--vt-x", `${r.left + r.width / 2}px`);
    root.style.setProperty("--vt-y", `${r.top + r.height / 2}px`);
    root.dataset.dir = "theme";
    start
      .call(document, () => flushSync(() => setTheme(next)))
      .finished.finally(() => {
        if (root.dataset.dir === "theme") delete root.dataset.dir;
      });
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Background scene={scene} theme={theme} />
      <Header />
      <Outlet />
      <Footer>
        <Controls scene={scene} onScene={setScene} theme={theme} onToggleTheme={toggleTheme} />
      </Footer>
    </>
  );
}
