import { useEffect, useRef } from "react";

export default function Cursor() {
  const crossRef = useRef<HTMLDivElement>(null);
  const dotRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tx = 0, ty = 0;

    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      // dot follows instantly
      dotRef.current!.style.transform = `translate(${tx}px,${ty}px)`;
    };

    // crosshair lags slightly
    let rx = 0, ry = 0;
    let rafId: number;
    const loop = () => {
      rx += (tx - rx) * 0.15;
      ry += (ty - ry) * 0.15;
      crossRef.current!.style.transform = `translate(${rx}px,${ry}px)`;
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    rafId = requestAnimationFrame(loop);

    // scale up on hover over interactive elements
    const onEnter = () => crossRef.current!.classList.add("cursor--hover");
    const onLeave = () => crossRef.current!.classList.remove("cursor--hover");
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* center dot */}
      <div ref={dotRef} className="cursor__dot" />
      {/* crosshair ring */}
      <div ref={crossRef} className="cursor__cross">
        <span className="cursor__line cursor__line--top" />
        <span className="cursor__line cursor__line--bottom" />
        <span className="cursor__line cursor__line--left" />
        <span className="cursor__line cursor__line--right" />
        <span className="cursor__corner cursor__corner--tl" />
        <span className="cursor__corner cursor__corner--tr" />
        <span className="cursor__corner cursor__corner--bl" />
        <span className="cursor__corner cursor__corner--br" />
      </div>
    </>
  );
}
