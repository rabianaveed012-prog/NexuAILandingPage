import { useEffect, useRef, useState, type FormEvent } from "react";
import { Magnetic, reducedMotion } from "../lib/hooks";

const PHRASES = [
  "Design a landing page for my startup…",
  "Summarize this 40-page report in five bullets…",
  "Compare three pricing models for my app…",
];
const SUGGESTIONS = [
  "Plan a product launch",
  "Summarize a research paper",
  "Clean up a messy spreadsheet",
  "Write a landing page",
];

function useTypewriter(phrases: string[]) {
  const [text, setText] = useState(reducedMotion() ? phrases[0] : "");
  useEffect(() => {
    if (reducedMotion()) return;
    let i = 0,
      n = 0,
      del = false,
      timer = 0;
    const step = () => {
      const full = phrases[i];
      if (!del) {
        n++;
        setText(full.slice(0, n));
        if (n === full.length) {
          del = true;
          timer = window.setTimeout(step, 2400);
          return;
        }
        timer = window.setTimeout(step, 55);
      } else {
        n--;
        setText(full.slice(0, n));
        if (n === 0) {
          del = false;
          i = (i + 1) % phrases.length;
          timer = window.setTimeout(step, 500);
          return;
        }
        timer = window.setTimeout(step, 22);
      }
    };
    timer = window.setTimeout(step, 1400);
    return () => clearTimeout(timer);
  }, [phrases]);
  return text;
}

export function PromptBar() {
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [file, setFile] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typed = useTypewriter(PHRASES);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setTimeout(() => setBusy(false), 1800);
  };

  return (
    <>
      <form onSubmit={submit} className="fade-in w-full max-w-[760px]" style={{ "--d": "900ms" } as React.CSSProperties}>
        <div className="prompt-wrap">
          <div className="prompt-inner flex h-[72px] items-center gap-3 pl-3 pr-[9px]">
            <button
              type="button"
              aria-label="Attach a file"
              onClick={() => fileRef.current?.click()}
              className="grid size-12 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:border-orchid hover:text-fg"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M9 3v12M3 9h12" />
              </svg>
            </button>
            <input
              ref={fileRef}
              type="file"
              hidden
              onChange={(e) => setFile(e.target.files?.[0]?.name ?? null)}
            />
            <div className="relative h-full min-w-0 flex-1">
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                aria-label="Describe what you want Nexus to do"
                className="h-full w-full bg-transparent text-base text-fg outline-none md:text-lg"
              />
              {!value && (
                <span className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center overflow-hidden whitespace-nowrap text-left text-base text-muted md:text-lg">
                  {typed}
                  <i className="caret" />
                </span>
              )}
            </div>
            {file && (
              <span className="hidden max-w-[140px] truncate rounded-[12px] border border-line px-3 py-1 text-xs text-muted md:block">
                {file}
              </span>
            )}
            <Magnetic strength={0.2}>
              <button
                type="submit"
                className="gen-btn relative flex h-[54px] items-center justify-center gap-2.5 overflow-hidden rounded-full px-5 text-sm text-white md:px-[29px]"
              >
                <span className="max-sm:sr-only">{busy ? "Thinking…" : "Generate"}</span>
                <img src="/assets/81144.svg" alt="" className="h-[21px] w-[23px]" />
              </button>
            </Magnetic>
          </div>
        </div>
      </form>

      <div
        className="fade-in mt-6 flex max-w-[760px] flex-wrap justify-center gap-2"
        style={{ "--d": "1100ms" } as React.CSSProperties}
      >
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              setValue(s);
              inputRef.current?.focus();
            }}
            className="rounded-[12px] border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-orchid hover:text-fg"
          >
            {s}
          </button>
        ))}
      </div>
    </>
  );
}
