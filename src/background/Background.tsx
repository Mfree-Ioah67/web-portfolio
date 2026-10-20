import { useEffect, useRef } from "react";
import { SCENES, type Colors, type Scene, type SceneId } from "./scenes";

interface Props {
  scene: SceneId;
  /** Only used to re-read the colour tokens when it changes. */
  theme: string;
}

function hexToRgb(hex: string) {
  const h = hex.trim().replace("#", "");
  const full = h.length === 3 ? [...h].map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

function readColors(): Colors {
  const css = getComputedStyle(document.documentElement);
  return { line: hexToRgb(css.getPropertyValue("--dim")), accent: hexToRgb(css.getPropertyValue("--accent")) };
}

const makeScene = (id: SceneId): Scene => SCENES.find((s) => s.id === id)!.make();

// Full-viewport canvas behind the page. One animation loop for the life of
// the page; switching scene or theme only swaps what it draws.
export default function Background({ scene, theme }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const wanted = useRef(scene);
  const sync = useRef<() => void>(() => {});
  wanted.current = scene;

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let current = wanted.current;
    let active = makeScene(current);
    let colors = readColors();
    let w = 0;
    let h = 0;
    let t = reducedMotion ? 6 : 0;
    let raf = 0;
    let last = 0;
    const target = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    let pointer: { x: number; y: number } | null = null;

    const render = (dt: number) => {
      ctx.clearRect(0, 0, w, h);
      active.draw({ ctx, w, h, t, dt, mx: smooth.x, my: smooth.y, pointer, colors });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      active.resize?.(w, h);
      if (reducedMotion) render(0);
    };

    const loop = (now: number) => {
      const dt = last ? Math.min(now - last, 50) / (1000 / 60) : 1;
      last = now;
      t += dt / 60;
      smooth.x += (target.x - smooth.x) * Math.min(1, 0.05 * dt);
      smooth.y += (target.y - smooth.y) * Math.min(1, 0.05 * dt);
      render(dt);
      raf = requestAnimationFrame(loop);
    };

    sync.current = () => {
      if (wanted.current !== current) {
        current = wanted.current;
        active = makeScene(current);
        active.resize?.(w, h);
      }
      colors = readColors();
      if (reducedMotion) render(0);
    };

    const onPointerMove = (e: PointerEvent) => {
      target.x = (e.clientX / w) * 2 - 1;
      target.y = (e.clientY / h) * 2 - 1;
      pointer = e.pointerType === "mouse" ? { x: e.clientX, y: e.clientY } : null;
    };
    const onPointerOut = (e: PointerEvent) => {
      if (!e.relatedTarget) pointer = null;
    };
    const onVisibility = () => {
      last = 0;
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    if (!reducedMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerout", onPointerOut);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
      sync.current = () => {};
    };
  }, []);

  useEffect(() => {
    sync.current();
  }, [scene, theme]);

  return <canvas ref={ref} className="bg" aria-hidden="true" />;
}
