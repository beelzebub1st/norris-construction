"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useConversion } from "@/components/conversion/ConversionProvider";

const YES = [
  {
    title: "You want clarity before chaos",
    body: "You would rather read a real scope and allowance list than chase verbal promises mid-demo.",
  },
  {
    title: "You care how it lives — not just how it lists",
    body: "Storage, light, traffic flow, and humidity performance matter as much as the stone sample.",
  },
  {
    title: "You expect one throat to choke",
    body: "A dedicated lead, weekly updates, and written change orders feel non-negotiable — not optional polish.",
  },
];

const NO = [
  "Lowest-bid shopping with no drawings",
  "Surprise invoices as a business model",
  "Generic flip finishes that fail in year two",
];

export function OwnerFitSection() {
  const { openQuiz } = useConversion();

  return (
    <section className="section-pad border-t border-[var(--color-stone)]/15 bg-[var(--color-ink)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
              Ideal partnership
            </p>
            <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-5xl">
              Built for owners who refuse remodel roulette
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-cream)]/75">
              We are not the right fit for every project — and that is intentional. When the match
              is right, the build feels calm, documented, and surprisingly enjoyable.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-4 sm:grid-cols-3">
            {YES.map((item) => (
              <Reveal key={item.title}>
                <article className="h-full rounded-[1.35rem] border border-[var(--color-stone)]/20 bg-[var(--color-ink-soft)] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-orange)]">
                    Good fit
                  </p>
                  <h3 className="mt-3 font-display text-lg text-[var(--color-cream)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-cream)]/68">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <aside className="flex h-full flex-col justify-between rounded-[1.35rem] border border-[var(--color-stone)]/20 bg-[var(--color-ink-soft)] p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-cream)]/45">
                  Probably not us
                </p>
                <ul className="mt-5 space-y-3">
                  {NO.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-relaxed text-[var(--color-cream)]/65"
                    >
                      <span className="mt-1 text-[var(--color-orange)]">×</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={openQuiz}
                className="btn-primary mt-8 w-full touch-manipulation"
              >
                See if we match
              </button>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
