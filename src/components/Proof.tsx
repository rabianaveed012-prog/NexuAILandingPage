import { Reveal, useCountUp, useInView } from "../lib/hooks";

function Stat({ target, decimals = 0, format, label, offset }: { target: number; decimals?: number; format: (v: string, done: boolean) => string; label: string; offset: string }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  const v = useCountUp(target, seen);
  const done = v >= target - 1e-6;
  return (
    <div ref={ref} className={`border-l border-line pl-8 ${offset}`}>
      <p className="font-extrabold leading-none tracking-[-0.04em] tabular-nums" style={{ fontSize: "clamp(64px, 9vw, 128px)" }}>
        {format(v.toFixed(decimals), done)}
      </p>
      <p className="mt-4 text-muted">{label}</p>
    </div>
  );
}

export function Proof() {
  return (
    <section id="about" className="px-6 py-48 md:px-20">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="max-w-[480px] text-muted">
            Newsrooms, labs and a lot of two-person startups run on Nexus. Figures from the last 90 days.
          </p>
        </Reveal>
        <div className="mt-20 grid gap-16 md:grid-cols-3 md:gap-8">
          <Reveal>
            <Stat target={1} decimals={1} format={(v, d) => (d ? "1M+" : `${v}M`)} label="active users" offset="" />
          </Reveal>
          <Reveal delay={150}>
            <Stat target={50} format={(v) => `${v}+`} label="AI models, one prompt" offset="md:mt-16" />
          </Reveal>
          <Reveal delay={300}>
            <Stat target={99.9} decimals={1} format={(v) => `${v}%`} label="uptime" offset="md:mt-32" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
