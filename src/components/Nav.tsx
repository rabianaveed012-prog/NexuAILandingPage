import { useEffect, useState } from "react";
import { Magnetic } from "../lib/hooks";

export function Logo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <defs>
        <linearGradient id="lg" x1="4" y1="4" x2="20" y2="20">
          <stop stopColor="#7C5CF0" />
          <stop offset="1" stopColor="#7DD3FC" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="4.5" fill="url(#lg)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-24 12 12)" stroke="#C084FC" strokeOpacity=".8" />
    </svg>
  );
}

const links = [
  ["Platform", "#platform"],
  ["Solutions", "#solutions"],
  ["Research", "#how"],
  ["About", "#about"],
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(scrollY > 40);
    f();
    addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);

  return (
    <header className="fixed left-1/2 top-4 z-50 -translate-x-1/2 md:top-6">
      <nav
        className="flex h-14 items-center gap-6 rounded-full border border-line py-2 pl-5 pr-2 backdrop-blur-xl transition-colors duration-700 md:gap-12"
        style={{ background: scrolled ? "rgba(12,8,32,0.72)" : "rgba(12,8,32,0.4)" }}
      >
        <a href="#top" className="flex items-center gap-2 text-[15px] font-extrabold tracking-tight">
          <Logo />
          Nexus AI
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map(([l, h]) => (
            <li key={l}>
              <a href={h} className="text-sm text-muted transition-colors hover:text-fg">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <Magnetic strength={0.25}>
          <a
            href="#waitlist"
            className="block rounded-full border border-line px-5 py-2 text-sm transition-colors hover:border-orchid hover:bg-glass"
          >
            Get started
          </a>
        </Magnetic>
      </nav>
    </header>
  );
}
