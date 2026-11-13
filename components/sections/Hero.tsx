import Image from "next/image";
import Link from "next/link";
import { HeroMotion } from "@/components/motion/HeroMotion";
import { telHref, smsHref } from "@/lib/site-settings";

type HeroProps = {
  headline: string;
  phone: string;
  sms: string;
};

const SUPPORTING =
  "Custom homes and remodels across Miami-Dade and Broward — one team from vision through handover.";

export function Hero({ headline, phone, sms }: HeroProps) {
  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] flex-col justify-end">
      <Image
        src="/images/placeholders/hero.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/70 to-[var(--color-ink)]/30"
        aria-hidden
      />

      <HeroMotion>
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-14 pt-20 sm:px-6 sm:pb-16">
          <Image
            src="/images/logo.png"
            alt="Norris Construction"
            width={220}
            height={76}
            className="mb-8 h-14 w-auto sm:mb-10 sm:h-20"
            priority
          />
          <h1 className="max-w-3xl font-display text-4xl leading-tight text-[var(--color-cream)] sm:text-5xl md:text-6xl">
            {headline}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-[var(--color-cream)]/85">
            {SUPPORTING}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-[var(--color-orange)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Get estimate
            </Link>
            <a
              href={telHref(phone)}
              className="rounded-full border border-[var(--color-stone)]/50 px-6 py-3 text-sm font-medium text-[var(--color-cream)] transition-colors hover:border-[var(--color-cream)]/60"
            >
              Call
            </a>
            <a
              href={smsHref(sms)}
              className="rounded-full border border-[var(--color-stone)]/50 px-6 py-3 text-sm font-medium text-[var(--color-cream)] transition-colors hover:border-[var(--color-cream)]/60"
            >
              Text
            </a>
          </div>
        </div>
      </HeroMotion>
    </section>
  );
}
