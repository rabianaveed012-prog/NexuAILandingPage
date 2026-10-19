import { useEffect, useRef, type ReactNode } from "react";
import { Reveal, clamp, lerp } from "../lib/hooks";

const I = (p: { children: ReactNode }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {p.children}
  </svg>
);

const FEATURES: { title: string; body: string; icon: ReactNode; h: number; mt: number }[] = [
  {
    title: "Deep research",
    body: "Reads hundreds of sources, checks them against each other, and hands back a brief with every claim linked.",
    icon: (
      <I>
        <circle cx="10.5" cy="10.5" r="6" />
        <circle cx="10.5" cy="10.5" r="2" />
        <path d="M15 15l5 5" />
      </I>
    ),
    h: 300,
    mt: 0,
  },
  {
    title: "Image generation",
    body: "Describe a scene or drop in a rough sketch and get images that already match your brand colors.",
    icon: (
      <I>
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <path d="M3 16l5-5 4 4 3-3 6 5" />
        <circle cx="16" cy="9" r="1.2" />
      </I>
    ),
    h: 344,
    mt: 32,
  },
  {
    title: "Code assistant",
    body: "Works inside your repo, writes the tests, and explains every change in plain language.",
    icon: (
      <I>
        <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14" />
      </I>
    ),
    h: 280,
    mt: 12,
  },
  {
    title: "Data analysis",
    body: "Drop in a spreadsheet and ask questions; the charts come back with the numbers behind them.",
    icon: (
      <I>
        <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      </I>
    ),
    h: 268,
    mt: 24,
  },
  {
    title: "Voice",
    body: "Talk an idea through on a walk and Nexus turns the ramble into a tidy first draft.",
    icon: (
      <I>
        <path d="M4 10v4M8 6v12M12 3v18M16 8v8M20 11v2" />
      </I>
    ),
    h: 312,
    mt: 0,
  },
  {
    title: "Automation",
    body: "Turn any answer into a recurring job, like weekly reports, inbox triage or release notes.",
    icon: (
      <I>
        <path d="M20 12a8 8 0 0 1-14 5.3M4 12a8 8 0 0 1 14-5.3" />
        <path d="M18 3v4h-4M6 21v-4h4" />
      </I>
    ),
    h: 336,
    mt: 40,
  },
];

export function Features() {
  const sec = useRef<HTMLElement>(null);
  const beam = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = innerHeight;
      const r = sec.current!.getBoundingClientRect();
      const mobile = innerWidth < 1024;
      const s = clamp((vh * 0.75 - r.top) / (r.height * 0.9 + vh * 0.1));
      const theta = lerp(44, -44, s);
      beam.current!.style.transform = `translateX(-50%) rotate(${theta}deg)`;
      const ox = r.left + r.width / 2;
      const oy = r.top;
      for (const c of cards.current) {
        if (!c) continue;
        const cr = c.getBoundingClientRect();
        const cx = cr.left + cr.width / 2;
        const cy = cr.top + cr.height / 2;
        let lit: number;
        if (mobile) lit = clamp(1 - Math.abs(cy - vh * 0.5) / (vh * 0.32));
        else lit = clamp(1 - Math.abs((Math.atan2(cx - ox, cy - oy) * 180) / Math.PI + theta) / 13);
        lit = lit * lit * (3 - 2 * lit);
        c.style.setProperty("--lit", lit.toFixed(3));
      }
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
    };
  }, []);

  return (
    <section id="solutions" ref={sec} className="relative px-6 pb-40 pt-48 md:px-20 md:pt-64">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute left-1/2 top-0 size-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(192,132,252,0.55), transparent 70%)" }}
        />
        <div
          ref={beam}
          className="absolute left-1/2 top-0 h-[1300px] w-[1500px] origin-top blur-[26px]"
          style={{
            background: "linear-gradient(to bottom, rgba(192,132,252,0.34), rgba(124,92,240,0.12) 55%, transparent 100%)",
            clipPath: "polygon(47.5% 0, 52.5% 0, 74% 100%, 26% 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1280px]">
        <Reveal>
          <p className="kicker mb-5">What it does</p>
          <h2 className="display-md max-w-[760px]">Six jobs. One prompt bar.</h2>
          <p className="mt-6 max-w-[480px] text-muted">
            You never pick a tool. Say what you need and Nexus lines up the right capability behind it.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-6 lg:grid-cols-[1.15fr_1fr_1.35fr]">
          {FEATURES.map((f, i) => (
            <article
              key={f.title}
              ref={(el) => {
                cards.current[i] = el;
              }}
              className="feature-card flex flex-col justify-between gap-10 rounded-[24px] p-7 transition-[background-color] duration-300 max-lg:!mt-0 max-lg:!min-h-0"
              style={{ minHeight: f.h, marginTop: f.mt }}
            >
              <div
                className="grid size-11 place-items-center rounded-[12px] border border-line text-orchid"
                style={{ opacity: "calc(0.55 + var(--lit) * 0.45)" }}
              >
                {f.icon}
              </div>
              <div>
                <h3 className="mb-2 text-2xl font-extrabold tracking-tight">{f.title}</h3>
                <p className="text-base text-muted">{f.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
