"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { useConversion } from "@/components/conversion/ConversionProvider";
import { telHref } from "@/lib/phone-links";

type HomeLeadSplitProps = {
  phone: string;
};

export function HomeLeadSplit({ phone }: HomeLeadSplitProps) {
  const { openQuiz } = useConversion();

  return (
    <section className="section-pad border-t border-[var(--color-stone)]/15 bg-[var(--color-ink-soft)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
            Talk to Norris
          </p>
          <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-4xl">
            Tell us about the project
          </h2>
          <p className="mt-3 text-[var(--color-cream)]/70">
            Share a few details. We reply within one business day with a clear
            next step — no pressure, no vague quotes.
          </p>
          <p className="mt-4 text-sm text-[var(--color-cream)]/60">
            Prefer the quiz?{" "}
            <button
              type="button"
              onClick={openQuiz}
              className="font-semibold text-[var(--color-orange)] underline-offset-2 hover:underline"
            >
              Start it here
            </button>{" "}
            · or{" "}
            <a
              href={telHref(phone)}
              className="font-semibold text-[var(--color-orange)] underline-offset-2 hover:underline"
            >
              call {phone}
            </a>
          </p>
          <div className="relative mt-8 aspect-[16/11] overflow-hidden rounded-[1.75rem] border border-[var(--color-stone)]/20">
            <Image
              src="/images/projects/estate-1.jpg"
              alt="Luxury remodel by Norris Construction"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </Reveal>

        <Reveal>
          <div className="rounded-[1.75rem] border border-[var(--color-stone)]/20 bg-[var(--color-ink)] p-5 sm:p-7">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
