"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { useConversion } from "@/components/conversion/ConversionProvider";

const ITEMS = [
  {
    title: "Fixed-scope clarity",
    teaser: "No foggy allowances",
    body: "Selections and allowances are documented before demolition. Change orders are written — never verbal surprises mid-project.",
  },
  {
    title: "Dedicated lead",
    teaser: "One throat to choke",
    body: "A single project lead owns schedule, trades, and walkthroughs so you are never ping-ponged between subcontractors.",
  },
  {
    title: "Clean site standard",
    teaser: "Respect the home",
    body: "Dust control, daily tidy-ups, and neighbor-aware logistics — especially for occupied remodels in Coral Gables, Brickell, and Miami Beach.",
  },
  {
    title: "Warranty follow-through",
    teaser: "After the champagne",
    body: "We schedule a post-handover check and stay reachable for punch items that show up after real living starts.",
  },
];

export function GuaranteesSection() {
  const [open, setOpen] = useState(0);
  const { openContact } = useConversion();

  return (
    <section className="section-pad border-t border-[var(--color-stone)]/15">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-14">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
            Why Norris
          </p>
          <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-5xl">
            Protections that feel expensive — in a good way
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-cream)]/75">
            Luxury construction fails when communication fails. These are the promises we put in
            writing on estimates — tap each one, then ask us to attach them to your project.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-[var(--color-cream)]/65">
            <li className="flex gap-2">
              <span className="text-[var(--color-orange)]">✓</span>
              Written scopes before demolition
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--color-orange)]">✓</span>
              Photo updates during active builds
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--color-orange)]">✓</span>
              Post-handover check-in on the calendar
            </li>
          </ul>
          <button type="button" onClick={openContact} className="btn-primary mt-8">
            Ask about warranties
          </button>
        </Reveal>

        <div className="space-y-3">
          {ITEMS.map((item, index) => {
            const active = open === index;
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => setOpen(index)}
                className={`w-full rounded-[1.25rem] border px-5 py-4 text-left transition ${
                  active
                    ? "border-[var(--color-orange)]/70 bg-[var(--color-orange)]/10"
                    : "border-[var(--color-stone)]/20 bg-[var(--color-ink-soft)] hover:border-[var(--color-stone)]/40"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-display text-lg text-[var(--color-cream)]">
                      {item.title}
                    </p>
                    <p className="text-xs uppercase tracking-wide text-[var(--color-cream)]/50">
                      {item.teaser}
                    </p>
                  </div>
                  <span className="text-[var(--color-orange)]">{active ? "−" : "+"}</span>
                </div>
                <AnimatePresence initial={false}>
                  {active ? (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden text-sm leading-relaxed text-[var(--color-cream)]/75"
                    >
                      <span className="mt-3 block pb-1">{item.body}</span>
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
