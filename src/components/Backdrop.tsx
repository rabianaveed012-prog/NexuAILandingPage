import { useEffect, useRef } from "react";
import { reducedMotion } from "../lib/hooks";

export function Backdrop() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvas.current!;
    const ctx = c.getContext("2d")!;
    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.3 + Math.random() * 0.9,
      a: 0.15 + Math.random() * 0.6,
      c: ["244,242,255", "125,211,252", "192,132,252"][Math.floor(Math.random() * 3)],
    }));
    const draw = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      c.width = innerWidth * dpr;
      c.height = innerHeight * dpr;
      ctx.scale(dpr, dpr);
      for (const s of stars) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${s.c},${s.a})`;
        ctx.arc(s.x * innerWidth, s.y * innerHeight, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    draw();
    addEventListener("resize", draw);

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!reducedMotion()) c.style.transform = `translateY(${-scrollY * 0.04}px)`;
      });
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("resize", draw);
      removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <canvas ref={canvas} className="pointer-events-none fixed inset-0 z-0 h-full w-full" aria-hidden />
      <div className="grain" aria-hidden />
    </>
  );
}

export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reducedMotion() || !matchMedia("(pointer: fine)").matches) return;
    const el = ref.current!;
    let tx = innerWidth / 2,
      ty = innerHeight / 3,
      x = tx,
      y = ty,
      raf = 0;
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.transform = `translate(${x - 320}px, ${y - 320}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
    };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[640px] w-[640px] rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(124,92,240,0.16) 0%, rgba(124,92,240,0) 62%)",
        mixBlendMode: "screen",
      }}
    />
  );
}
