import { useState, type FormEvent } from "react";
import { Magnetic, Reveal } from "../lib/hooks";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setState(/^\S+@\S+\.\S+$/.test(email) ? "done" : "error");
  };

  return (
    <section id="waitlist" className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-40">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]" aria-hidden>
        <div
          className="absolute left-1/2 top-[8%] h-[240px] w-[90%] -translate-x-1/2"
          style={{ background: "radial-gradient(ellipse at center, rgba(124,92,240,0.5), transparent 68%)" }}
        />
        <div
          className="grid-floor absolute -inset-x-1/2 bottom-[-8%] h-full"
          style={{ transform: "perspective(520px) rotateX(64deg)", transformOrigin: "50% 100%" }}
        />
      </div>

      <Reveal className="relative z-10 flex w-full flex-col items-center text-center">
        <h2 className="display mb-6">Be first in line.</h2>
        <p className="mb-10 max-w-[480px] text-muted">
          Early access opens in small waves. Leave your email and we will tell you where you stand.
        </p>

        {state === "done" ? (
          <p className="glass rounded-full px-8 py-4">You are on the list. We will write when your spot opens.</p>
        ) : (
          <form onSubmit={submit} className="flex w-full max-w-[560px] flex-col gap-3 sm:flex-row" noValidate>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setState("idle");
              }}
              placeholder="you@company.com"
              aria-label="Email address"
              aria-invalid={state === "error"}
              className="glass h-14 flex-1 rounded-full px-6 text-fg outline-none transition-[border-color,box-shadow] duration-500 placeholder:text-muted focus:border-orchid focus:shadow-[0_0_32px_rgba(124,92,240,0.4)]"
            />
            <Magnetic>
              <button
                type="submit"
                className="h-14 w-full whitespace-nowrap rounded-full bg-violet px-8 font-extrabold text-fg shadow-[0_0_40px_rgba(124,92,240,0.5)] transition-colors hover:bg-orchid sm:w-auto"
              >
                Join the waitlist
              </button>
            </Magnetic>
          </form>
        )}
        {state === "error" && <p className="mt-4 text-sm text-orchid">That email does not look quite right.</p>}
      </Reveal>
    </section>
  );
}
