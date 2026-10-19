import { useEffect, useRef } from "react";
import { clamp, lerp, reducedMotion } from "../lib/hooks";
import { PromptBar } from "./PromptBar";

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function PlanetRing({ size, tilt, front, tone }: { size: number; tilt: number; front?: boolean; tone: string }) {
  return (
    <div
      data-ring
      className="pointer-events-none absolute left-1/2 top-1/2"
      style={{
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        transform: `rotate(${tilt}deg)`,
      }}
    >
      <div
        className="size-full rounded-full"
        style={{
          border: `1px solid ${tone}`,
          transform: "perspective(1800px) rotateX(76deg)",
          WebkitMaskImage: front ? "linear-gradient(to bottom, transparent 50%, #000 50%)" : undefined,
          maskImage: front ? "linear-gradient(to bottom, transparent 50%, #000 50%)" : undefined,
        }}
      />
    </div>
  );
}

type ChipDef = { label: string; angle: number; dot: string };

function OrbitRing({ d, dur, reverse, chips }: { d: number; dur: number; reverse?: boolean; chips: ChipDef[] }) {
  return (
    <div
      className="absolute rounded-full border border-line"
      style={{ width: d, height: d, left: -d / 2, top: -d / 2 }}
    >
      {chips.map((c) => {
        const delay = `-${(c.angle / 360) * dur}s`;
        return (
          <div
            key={c.label}
            className="absolute inset-0"
            style={{ animation: `orbit ${dur}s linear ${delay} infinite ${reverse ? "reverse" : "normal"}` }}
          >
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
              <div style={{ animation: `orbit ${dur}s linear ${delay} infinite ${reverse ? "normal" : "reverse"}` }}>
                <div className="glass flex items-center gap-2 rounded-[12px] px-3.5 py-2 text-sm">
                  <span className="size-1.5 rounded-full" style={{ background: c.dot }} />
                  {c.label}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FloatCard({ side, label, title, dur, children }: { side: "l" | "r"; label: string; title: string; dur: number; children: React.ReactNode }) {
  return (
    <div
      className={`absolute hidden min-[1200px]:block ${side === "l" ? "left-[5vw] top-[44%]" : "right-[5vw] top-[34%]"}`}
      style={{ animation: `drift ${dur}s ease-in-out infinite` }}
    >
      <div className="glass w-[232px] rounded-[20px] p-5 text-left">
        <div className="mb-3 flex items-center justify-between">
          <span className="kicker !text-[11px]">{label}</span>
          {children}
        </div>
        <p className="text-xl font-extrabold leading-tight tracking-tight">{title}</p>
      </div>
    </div>
  );
}

export function Scene() {
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const planet = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLDivElement>(null);
  const orbit = useRef<HTMLDivElement>(null);
  const orbitText = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = reducedMotion();
    let target = 0,
      cur = 0,
      raf = 0;

    const apply = (t: number) => {
      const vw = innerWidth;
      const vh = stage.current!.clientHeight;
      const mobile = vw < 900;
      const hs = mobile ? vw / 760 : Math.min(1, vw / 1300);
      const os = (mobile ? 150 : 250) / 1100;
      const dx = mobile ? 0 : vw * 0.18;
      const dyHero = (mobile ? 0.34 : 0.3) * vh + 550 * hs;
      const dyEnd = mobile ? vh * 0.2 : 0;
      const k = mobile ? vw / 800 : Math.min(1, vw / 1440);
      const ex = clamp((t - 0.9) / 0.1);
      const e = ease(clamp((t - 0.1) / 0.38));

      const p = planet.current!;
      p.style.transform = `translate(${dx * e}px, ${lerp(dyHero, dyEnd, e)}px) scale(${lerp(hs, os, e)})`;
      p.style.opacity = String(1 - ex);
      const ringOp = String(1 - clamp((t - 0.08) / 0.22));
      p.querySelectorAll<HTMLElement>("[data-ring]").forEach((r) => (r.style.opacity = ringOp));

      const h = clamp(t / 0.18);
      const he = hero.current!;
      he.style.opacity = String(1 - h);
      he.style.transform = `translateY(${-60 * h}px) scale(${1 - 0.06 * h})`;
      he.style.filter = h > 0 ? `blur(${14 * h}px)` : "";
      he.style.visibility = h >= 1 ? "hidden" : "visible";
      he.style.pointerEvents = h > 0.6 ? "none" : "auto";

      const o = clamp((t - 0.28) / 0.25);
      const ob = orbit.current!;
      ob.style.opacity = String(o * (1 - ex));
      ob.style.transform = `translate(${dx}px, ${dyEnd}px) scale(${k * (0.7 + 0.3 * ease(o))})`;

      const x = clamp((t - 0.5) / 0.18);
      const ot = orbitText.current!;
      ot.style.opacity = String(x * (1 - ex));
      ot.style.transform = `translateY(${30 * (1 - x)}px)`;
      ot.style.filter = x < 1 ? `blur(${10 * (1 - x)}px)` : "";
      ot.style.visibility = x <= 0 || ex >= 1 ? "hidden" : "visible";
    };

    const loop = () => {
      cur += (target - cur) * (reduce ? 1 : 0.1);
      if (Math.abs(target - cur) < 0.0005) cur = target;
      apply(cur);
      raf = cur === target ? 0 : requestAnimationFrame(loop);
    };
    const calc = () => {
      const r = wrap.current!.getBoundingClientRect();
      target = clamp(-r.top / (r.height - stage.current!.clientHeight));
      if (!raf) raf = requestAnimationFrame(loop);
    };
    calc();
    addEventListener("scroll", calc, { passive: true });
    addEventListener("resize", calc);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", calc);
      removeEventListener("resize", calc);
    };
  }, []);

  return (
    <div ref={wrap} id="top" className="relative h-[360vh]">
      <span id="platform" className="absolute top-[58%]" />
      <div ref={stage} className="sticky top-0 h-screen overflow-hidden">
        <div
          ref={planet}
          className="absolute left-1/2 top-1/2 z-0 will-change-transform"
          style={{ width: 1100, height: 1100, marginLeft: -550, marginTop: -550 }}
        >
          <div className="planet-rise size-full">
            <PlanetRing size={1480} tilt={-14} tone="rgba(167,139,250,0.3)" />
            <PlanetRing size={1800} tilt={-10} tone="rgba(125,211,252,0.22)" />
            <div className="planet size-full" />
            <PlanetRing size={1480} tilt={-14} front tone="rgba(167,139,250,0.45)" />
            <PlanetRing size={1800} tilt={-10} front tone="rgba(125,211,252,0.3)" />
          </div>
        </div>

        <div ref={orbit} className="absolute left-1/2 top-1/2 z-[5] h-0 w-0 opacity-0 will-change-transform" aria-hidden>
          <OrbitRing d={320} dur={60} chips={[{ label: "Text", angle: 20, dot: "#4F8CFF" }, { label: "Voice", angle: 200, dot: "#7C5CF0" }]} />
          <OrbitRing d={520} dur={96} reverse chips={[{ label: "Image", angle: 70, dot: "#C084FC" }, { label: "Code", angle: 250, dot: "#7DD3FC" }]} />
          <OrbitRing d={720} dur={140} chips={[{ label: "Research", angle: 140, dot: "#F4F2FF" }]} />
        </div>

        <div
          ref={hero}
          className="absolute inset-0 z-10 flex flex-col items-center px-5 pt-[clamp(96px,13vh,136px)] text-center will-change-transform"
        >
          <div
            className="fade-in glass mb-6 flex items-center gap-2.5 rounded-full py-1.5 pl-3 pr-4 text-sm text-muted"
            style={{ "--d": "100ms" } as React.CSSProperties}
          >
            <span className="relative flex size-2">
              <span className="absolute inset-0 rounded-full bg-cyan" style={{ animation: "ping 2s ease-out infinite" }} />
              <span className="relative size-2 rounded-full bg-cyan" />
            </span>
            Next-gen AI platform
          </div>

          <h1 className="display">
            <span className="mask-line" style={{ "--i": 0 } as React.CSSProperties}>
              <span>Ask anything.</span>
            </span>
            <span className="mask-line" style={{ "--i": 1 } as React.CSSProperties}>
              <span className="grad-text">{"Build what's next."}</span>
            </span>
          </h1>

          <p className="fade-in mb-10 mt-6 max-w-[520px] text-muted" style={{ "--d": "700ms" } as React.CSSProperties}>
            Research, create and analyze from a single prompt.
          </p>

          <PromptBar />

          <FloatCard side="l" label="Generate" title="Ideas → Reality" dur={8}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#C084FC" strokeWidth="1.3">
              <circle cx="11" cy="11" r="3" />
              <path d="M11 2v3M11 17v3M2 11h3M17 11h3" strokeLinecap="round" />
            </svg>
          </FloatCard>
          <FloatCard side="r" label="Analyze" title="Data → Insights" dur={9}>
            <svg width="28" height="22" viewBox="0 0 28 22" fill="none" stroke="#7DD3FC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 17l6-6 5 4 6-9 7 5" />
            </svg>
          </FloatCard>
        </div>

        <div className="pointer-events-none absolute z-10 left-6 right-6 top-24 md:left-20 md:right-auto md:top-1/2 md:max-w-[680px] md:-translate-y-1/2">
          <div ref={orbitText} className="invisible opacity-0 will-change-transform">
            <p className="kicker mb-5">One model family</p>
            <h2 className="display">One brain. Every kind of work.</h2>
            <p className="mt-6 max-w-[480px] text-muted max-md:hidden">
              Text, image, code, voice and research models sit behind a single prompt. Nexus picks the right one, passes work between them, and shows you how it got there.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
