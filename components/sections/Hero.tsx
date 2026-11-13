"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useConversion } from "@/components/conversion/ConversionProvider";
import { telHref, smsHref } from "@/lib/phone-links";

type HeroProps = {
  headline: string;
  phone: string;
  sms: string;
};

const SUPPORTING =
  "Custom homes and residential remodeling across Miami-Dade and Broward — clear scopes, accountable supervision, finishes built for South Florida weather.";

export function Hero({ headline, phone, sms }: HeroProps) {
  const { openQuiz, openContact } = useConversion();

  return (
    <section className="relative flex min-h-[min(100dvh,900px)] flex-col justify-end overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/images/hero.jpg"
          alt="Luxury South Florida residence by Norris Construction"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/60 to-black/30"
        aria-hidden
      />
      <div
        className="absolute inset-y-0 left-0 w-[55%] max-w-3xl bg-gradient-to-r from-[var(--color-ink)]/70 via-[var(--color-ink)]/25 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-14 pt-28 sm:px-6 sm:pb-16 lg:pb-20">
        <motion.div
          initial={{ opacity: 0.92, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
        >
          <Image
            src="/images/logo.png"
            alt="Norris Construction"
            width={280}
            height={96}
            className="mb-7 h-14 w-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)] sm:mb-8 sm:h-20"
            priority
          />
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-orange)]">
            Miami · Coral Gables · Brickell · Fort Lauderdale
          </p>
          <h1 className="max-w-4xl font-display text-[clamp(2.35rem,5.6vw,4.5rem)] leading-[0.95] text-[var(--color-cream)]">
            {headline}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-cream)]/88 sm:text-lg">
            {SUPPORTING}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button type="button" onClick={openQuiz} className="btn-primary">
              Start quote quiz
            </button>
            <button type="button" onClick={openContact} className="btn-ghost">
              Contact us
            </button>
            <a href={telHref(phone)} className="btn-ghost">
              Call now
            </a>
            <a href={smsHref(sms)} className="btn-ghost">
              Text
            </a>
          </div>
          <p className="mt-5 text-xs text-[var(--color-cream)]/55">
            Free estimate · Licensed & insured · Response within 1 business day
          </p>
        </motion.div>
      </div>
    </section>
  );
}
