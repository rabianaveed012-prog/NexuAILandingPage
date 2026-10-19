import { Logo } from "./Nav";

const COLS: [string, string[]][] = [
  ["Platform", ["Overview", "Models", "API", "Pricing"]],
  ["Solutions", ["Teams", "Developers", "Students", "Enterprise"]],
  ["Research", ["Papers", "Safety", "Benchmarks", "Changelog"]],
  ["Company", ["About", "Careers", "Press", "Contact"]],
];

const s = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const SOCIALS = [
  ["X", <svg key="x" {...s}><path d="M4 4l16 16M20 4L4 20" /></svg>],
  [
    "GitHub",
    <svg key="g" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>,
  ],
  [
    "LinkedIn",
    <svg key="l" {...s}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v6M8 7.5v.01M12 16v-6m0 3c0-2.5 4-3 4 0v3" />
    </svg>,
  ],
  [
    "YouTube",
    <svg key="y" {...s}>
      <rect x="2.5" y="5" width="19" height="14" rx="4" />
      <path d="M10 9.5v5l4.5-2.5z" />
    </svg>,
  ],
] as const;

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-ink/80 px-6 pb-12 pt-20 backdrop-blur-xl md:px-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {COLS.map(([h, items]) => (
            <div key={h}>
              <p className="mb-5 text-sm font-extrabold">{h}</p>
              <ul className="space-y-3">
                {items.map((i) => (
                  <li key={i}>
                    <a href="#top" className="text-sm text-muted transition-colors hover:text-fg">
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-20 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Logo size={20} />
            <span className="text-sm font-extrabold">Nexus AI</span>
          </div>
          <p className="text-sm text-muted">© 2026 Nexus AI. Built slowly, on purpose.</p>
          <div className="flex gap-4 text-muted">
            {SOCIALS.map(([n, icon]) => (
              <a key={n} href="#top" aria-label={n} className="transition-colors hover:text-fg">
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
