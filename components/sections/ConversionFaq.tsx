"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { useConversion } from "@/components/conversion/ConversionProvider";
import { HOME_FAQS } from "@/lib/seo/home-faqs";

const FAQS = HOME_FAQS;

export function ConversionFaq() {
  const [open, setOpen] = useState<number | null>(0);
  const { openQuiz } = useConversion();

  return (
    <section className="section-pad border-t border-[var(--color-stone)]/15 bg-[var(--color-ink-soft)]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
            FAQ
          </p>
          <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-5xl">
            Objections, handled
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-[var(--color-stone)]/20 border-y border-[var(--color-stone)]/20">
          {FAQS.map((item, index) => {
            const active = open === index;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  onClick={() => setOpen(active ? null : index)}
                >
                  <span className="font-display text-lg text-[var(--color-cream)] sm:text-xl">
                    {item.q}
                  </span>
                  <span className="text-[var(--color-orange)]">{active ? "−" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {active ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-relaxed text-[var(--color-cream)]/70">
                        {item.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-3xl border border-[var(--color-orange)]/40 bg-[var(--color-orange)]/10 p-6 text-center">
          <p className="font-display text-2xl text-[var(--color-cream)]">
            Still deciding?
          </p>
          <p className="mt-2 text-sm text-[var(--color-cream)]/70">
            Take the 60-second quiz — we’ll respond with a clear next step.
          </p>
          <button type="button" onClick={openQuiz} className="btn-primary mt-5">
            Start quote quiz
          </button>
        </div>
      </div>
    </section>
  );
}
