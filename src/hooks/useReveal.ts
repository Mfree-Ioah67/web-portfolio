import { useEffect } from "react";

// Fades [data-reveal] elements in as they enter the viewport. Elements that
// enter together are staggered; the first batch on a page waits a little so
// it lands after the page title.
export function useReveal(key: string) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    let firstBatch = true;
    const io = new IntersectionObserver(
      (entries) => {
        let i = firstBatch ? 3 : 0;
        firstBatch = false;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.style.setProperty("--d", String(i++));
          el.classList.add("in");
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);
}
