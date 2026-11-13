"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useConversion } from "@/components/conversion/ConversionProvider";

const STEPS = [
  {
    n: "01",
    title: "Vision call",
    body: "We listen hard — scope, lifestyle, budget band, and the feel you want every morning.",
    deliverables: ["Project goals map", "Rough budget band", "Site-visit plan"],
  },
  {
    n: "02",
    title: "Design & numbers",
    body: "Clear drawings, selections, and a transparent estimate so there are no surprise invoices.",
    deliverables: ["Scope + allowances", "Written estimate", "Selection schedule"],
  },
  {
    n: "03",
    title: "Build & handover",
    body: "Dedicated supervision, photo updates, and a clean finish that photographs like a magazine.",
    deliverables: ["Weekly updates", "Punch walkthrough", "Warranty check-in"],
  },
];

export function ProcessSection() {
  const { openQuiz } = useConversion();

  return (
    <section className="section-pad relative overflow-hidden border-t border-[var(--color-stone)]/15">
      <div
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[var(--color-orange)]/10 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
                Process
              </p>
              <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-5xl">
                Three steps. Zero chaos.
              </h2>
              <p className="mt-4 text-[var(--color-cream)]/72">
                Every project follows the same rhythm — so you always know what happens next, who
                owns it, and what “done” looks like on paper.
              </p>
            </div>
            <button
              type="button"
              onClick={openQuiz}
              className="btn-primary w-fit touch-manipulation"
            >
              Start step one
            </button>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((step) => (
            <Reveal key={step.n}>
              <article className="flex h-full flex-col rounded-[1.5rem] border border-[var(--color-stone)]/20 bg-gradient-to-b from-[var(--color-ink-soft)] to-[var(--color-ink)] p-6 sm:p-7">
                <span className="font-display text-4xl text-[var(--color-orange)]">
                  {step.n}
                </span>
                <h3 className="mt-4 font-display text-xl text-[var(--color-cream)]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-cream)]/70">
                  {step.body}
                </p>
                <ul className="mt-5 space-y-2 border-t border-[var(--color-stone)]/15 pt-5">
                  {step.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-cream)]/55"
                    >
                      <span className="text-[var(--color-orange)]">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
