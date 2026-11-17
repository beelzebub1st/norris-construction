"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { useConversion } from "@/components/conversion/ConversionProvider";
import { telHref } from "@/lib/phone-links";

type LeadMagnetBandProps = {
  phone: string;
};

export function LeadMagnetBand({ phone }: LeadMagnetBandProps) {
  const { openQuiz, openContact } = useConversion();

  return (
    <section className="relative overflow-hidden border-y border-[var(--color-stone)]/15">
      <Image
        src="/images/projects/whitebox.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[var(--color-ink)]/88" />
      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 sm:py-16 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
            Request a Bid
          </p>
          <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-5xl">
            Request a commercial construction estimate
          </h2>
          <p className="mt-4 max-w-xl text-[var(--color-cream)]/75">
            Share your property type, scope, and timeline. We map next steps —
            then follow up within one business day.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-[var(--color-cream)]/70">
            <li className="flex gap-2">
              <span className="text-[var(--color-orange)]">✓</span>
              No hard sell — just a clear path forward
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--color-orange)]">✓</span>
              Built for offices, restaurants, retail, white boxing, and warehouses
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--color-orange)]">✓</span>
              Prefer talking? Call and we book a walkthrough
            </li>
          </ul>
        </Reveal>

        <Reveal>
          <div className="flex flex-col gap-3 rounded-[1.75rem] border border-[var(--color-stone)]/25 bg-[var(--color-ink)]/70 p-6 backdrop-blur sm:p-7">
            <p className="font-display text-2xl text-[var(--color-cream)]">
              Start here
            </p>
            <button
              type="button"
              onClick={openQuiz}
              className="btn-primary w-full touch-manipulation"
            >
              Request a Bid
            </button>
            <button
              type="button"
              onClick={openContact}
              className="btn-ghost w-full touch-manipulation"
            >
              Send a message
            </button>
            <a
              href={telHref(phone)}
              className="btn-ghost w-full touch-manipulation text-center"
            >
              Call {phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
