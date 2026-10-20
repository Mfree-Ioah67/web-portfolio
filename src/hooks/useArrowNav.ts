import { useEffect } from "react";
import { useNavigate } from "react-router";
import { setDirection } from "@/navigation";

// ← and → move to the previous / next page, with the same transition as
// clicking the links. Ignored while typing or with a modifier held.
export function useArrowNav(prev?: string, next?: string) {
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const target = e.target as HTMLElement;
      if (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;

      const to = e.key === "ArrowLeft" ? prev : e.key === "ArrowRight" ? next : undefined;
      if (!to) return;
      e.preventDefault();
      setDirection(to);
      navigate(to, { viewTransition: true });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, prev, next]);
}
