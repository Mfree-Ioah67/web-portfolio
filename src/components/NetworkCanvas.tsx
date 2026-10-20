import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

const LINK_DISTANCE = 140;
const MAX_NODES = 90;
const AREA_PER_NODE = 16000;
const RED = "255, 32, 32";
const BLUE = "0, 200, 255";

function makeNode(width: number, height: number): Node {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    color: Math.random() < 0.3 ? RED : BLUE,
  };
}

// Decorative "network map" background: drifting hosts linked when close.
// Pauses while off screen and stays still for prefers-reduced-motion.
export default function NetworkCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let frame = 0;
    let onScreen = true;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(${a.color}, ${0.2 * (1 - dist / LINK_DISTANCE)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${n.color}, 0.75)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const resize = () => {
      const prevWidth = width || canvas.clientWidth;
      const prevHeight = height || canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Keep existing nodes where they are (scaled), so a mobile address bar
      // resizing the viewport does not reshuffle the whole picture.
      for (const n of nodes) {
        n.x *= width / prevWidth;
        n.y *= height / prevHeight;
      }
      const target = Math.min(MAX_NODES, Math.round((width * height) / AREA_PER_NODE));
      if (nodes.length > target) nodes = nodes.slice(0, target);
      while (nodes.length < target) nodes.push(makeNode(width, height));
      draw();
    };

    const tick = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }
      draw();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!reducedMotion && onScreen && !frame) frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    resizeObserver.observe(canvas);
    visibility.observe(canvas);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibility.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
