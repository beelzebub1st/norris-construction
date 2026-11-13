"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { useConversion } from "@/components/conversion/ConversionProvider";

export function EstimateCta() {
  const { openQuiz, openContact } = useConversion();

  return (
    <section className="relative overflow-hidden section-pad">
      <Image
        src="/images/cta-band.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[var(--color-ink)]/80" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
              Next step
            </p>
            <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-5xl">
              Ready when you are — estimate in under a minute
            </h2>
            <p className="mt-4 text-[var(--color-cream)]/80">
              Answer a few questions or send a quick message. We reply within
              one business day with a clear next step — no vague ranges, no
              hard sell.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={openQuiz} className="btn-primary">
                Take the quote quiz
              </button>
              <button type="button" onClick={openContact} className="btn-ghost">
                Open contact form
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
