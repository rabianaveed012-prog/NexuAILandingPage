import { useEffect, useRef, useState, type ReactNode } from "react";
import { clamp } from "../lib/hooks";

const STEPS = [
  {
    name: "Describe",
    title: "Say it like you'd say it to a colleague.",
    body: "Type or speak the goal, attach a file if it helps. There are no templates to fill in and no prompt tricks to learn.",
  },
  {
    name: "Refine",
    title: "Steer while it works.",
    body: "Nexus shows its plan before it starts. Change the tone, swap a source or cut a step, and the draft updates as you go.",
  },
  {
    name: "Ship",
    title: "Publish or export in one click.",
    body: "Send it to your team, put it live, or schedule it to repeat. Every output keeps a link back to its sources.",
  },
];

function Panel({ i, active, children }: { i: number; active: boolean; children: ReactNode }) {
  const z = (i - 1) * 150 + (active ? 36 : 0);
  const x = (1 - i) * 70;
  return (
    <div
      className="absolute left-1/2 top-1/2 h-[250px] w-[380px] rounded-[24px] border p-6"
      style={{
        marginLeft: -190,
        marginTop: -125,
        transform: `translate3d(${x}px, 0, ${z}px)`,
        transition: "transform 900ms var(--ease-expo), opacity 900ms var(--ease-expo), box-shadow 900ms var(--ease-expo), border-color 900ms",
        opacity: active ? 1 : 0.42,
        borderColor: active ? "rgba(192,132,252,0.7)" : "rgba(167,139,250,0.3)",
        background: "linear-gradient(135deg, rgba(60,46,140,0.55), rgba(28,22,66,0.7))",
        boxShadow: active ? "0 0 70px rgba(124,92,240,0.4)" : "none",
      }}
    >
      {children}
    </div>
  );
}

const Label = ({ children }: { children: ReactNode }) => (
  <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.16em] text-orchid">{children}</p>
);

export function HowItWorks() {
  const wrap = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = wrap.current!.getBoundingClientRect();
      const p = clamp(-r.top / (r.height - innerHeight));
      scene.current!.style.setProperty("--p", p.toFixed(3));
      setStep(Math.min(2, Math.floor(p * 3)));
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
    <div id="how" ref={wrap} className="relative h-[420vh]">
      <div className="sticky top-0 grid h-screen items-center gap-4 overflow-hidden px-6 pt-20 md:grid-cols-[1fr_1.15fr] md:gap-10 md:px-20 md:pt-0">
        <div className="relative z-10">
          <p className="kicker mb-5">How it works</p>
          <div className="relative h-[250px] md:h-[330px]">
            {STEPS.map((s, i) => (
              <div
                key={s.name}
                className="absolute inset-x-0 top-0 max-w-[560px]"
                style={{
                  opacity: step === i ? 1 : 0,
                  transform: step === i ? "none" : `translateY(${step > i ? -24 : 24}px)`,
                  filter: step === i ? "none" : "blur(10px)",
                  transition: "all 800ms var(--ease-expo)",
                  pointerEvents: step === i ? "auto" : "none",
                }}
              >
                <h2 className="display-md mb-6">{s.name}.</h2>
                <p className="mb-3 text-xl font-extrabold leading-snug tracking-tight">{s.title}</p>
                <p className="max-w-[460px] text-muted max-md:text-base">{s.body}</p>
              </div>
            ))}
          </div>
          <ol className="flex items-center gap-4 text-sm">
            {STEPS.map((s, i) => (
              <li key={s.name} className="flex items-center gap-4">
                <span className={`transition-colors duration-700 ${step === i ? "text-fg" : "text-muted/60"}`}>
                  0{i + 1} {s.name}
                </span>
                {i < 2 && (
                  <span className="relative h-px w-10 bg-line">
                    <span
                      className="absolute inset-y-0 left-0 bg-orchid transition-[width] duration-700"
                      style={{ width: step > i ? "100%" : "0%" }}
                    />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>

        <div className="relative h-[360px] md:h-[640px]" style={{ perspective: 1800 }}>
          <div ref={scene} className="absolute inset-0 max-md:scale-[0.62]">
            <div
              className="absolute inset-0"
              style={{
                transformStyle: "preserve-3d",
                transform: "rotateX(58deg) rotateZ(calc(-40deg + var(--p, 0) * 14deg))",
                transition: "transform 200ms linear",
              }}
            >
              <Panel i={0} active={step === 0}>
                <Label>Prompt</Label>
                <p className="text-lg leading-snug">
                  A weekly digest for our customers, pulled from support tickets and product updates. Friendly, short, no jargon.
                  <i className="caret" />
                </p>
                <div className="mt-5 flex gap-2">
                  {["tickets.csv", "changelog.md"].map((f) => (
                    <span key={f} className="rounded-[12px] border border-line px-3 py-1 text-xs text-muted">
                      {f}
                    </span>
                  ))}
                </div>
              </Panel>
              <Panel i={1} active={step === 1}>
                <Label>Adjust</Label>
                {[
                  ["Tone", 0.62],
                  ["Length", 0.3],
                  ["Sources", 0.82],
                ].map(([n, v]) => (
                  <div key={n as string} className="mb-4 flex items-center gap-4 text-sm">
                    <span className="w-16 text-muted">{n}</span>
                    <span className="relative h-px flex-1 bg-line">
                      <span className="absolute inset-y-0 left-0 bg-orchid" style={{ width: `${(v as number) * 100}%` }} />
                      <span
                        className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg"
                        style={{ left: `${(v as number) * 100}%` }}
                      />
                    </span>
                  </div>
                ))}
                <span className="mt-1 inline-block rounded-[12px] border border-line px-3 py-1 text-xs text-muted">Plan: 4 steps</span>
              </Panel>
              <Panel i={2} active={step === 2}>
                <div className="mb-4 flex items-center justify-between">
                  <Label>Live</Label>
                  <span className="mb-4 flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs">
                    <span className="size-1.5 rounded-full bg-cyan" />
                    Published
                  </span>
                </div>
                <div className="space-y-2.5">
                  <div className="h-3 w-3/4 rounded-full bg-fg/80" />
                  <div className="h-2 w-full rounded-full bg-line" />
                  <div className="h-2 w-5/6 rounded-full bg-line" />
                  <div className="h-2 w-2/3 rounded-full bg-line" />
                </div>
                <p className="mt-6 text-xs text-muted">digest.nexus.app/weekly</p>
              </Panel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
