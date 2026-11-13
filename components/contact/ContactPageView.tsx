"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { useConversion } from "@/components/conversion/ConversionProvider";
import { telHref, smsHref } from "@/lib/phone-links";

type ContactPageViewProps = {
  phone: string;
  sms: string;
  email: string;
  address: string;
  licenseText: string;
  insuranceText: string;
};

const CHANNELS = [
  {
    key: "call",
    label: "Call",
    detail: (p: ContactPageViewProps) => p.phone,
    href: (p: ContactPageViewProps) => telHref(p.phone),
    hint: "Fastest for urgent questions",
  },
  {
    key: "text",
    label: "Text",
    detail: (p: ContactPageViewProps) => p.sms,
    href: (p: ContactPageViewProps) => smsHref(p.sms),
    hint: "Send photos or a quick note",
  },
  {
    key: "email",
    label: "Email",
    detail: (p: ContactPageViewProps) => p.email,
    href: (p: ContactPageViewProps) => `mailto:${p.email}`,
    hint: "Docs, plans, and longer briefs",
  },
] as const;

const STEPS = [
  {
    n: "01",
    title: "You share the brief",
    body: "Form, quiz, call, or text — whatever is easiest.",
  },
  {
    n: "02",
    title: "We reply fast",
    body: "Within one business day with a clear next step.",
  },
  {
    n: "03",
    title: "Walkthrough & numbers",
    body: "Site visit when needed, then a transparent estimate path.",
  },
];

const AREAS = [
  { href: "/areas/miami-beach", label: "Miami Beach" },
  { href: "/areas/coral-gables", label: "Coral Gables" },
  { href: "/areas/brickell", label: "Brickell" },
  { href: "/areas/fort-lauderdale", label: "Fort Lauderdale" },
] as const;

const FAQS = [
  {
    q: "How fast do you respond?",
    a: "Within one business day — usually sooner for calls and texts during working hours.",
  },
  {
    q: "Do I need drawings first?",
    a: "No. A few photos and a description of how you live is enough to start. We’ll tell you when drawings help.",
  },
  {
    q: "Is the estimate free?",
    a: "The initial consultation and directional estimate path are free. Detailed proposals follow a scoped walkthrough.",
  },
];

export function ContactPageView(props: ContactPageViewProps) {
  const { openQuiz } = useConversion();
  const { phone, email, address, licenseText, insuranceText } = props;

  return (
    <>
      <section className="relative flex min-h-[min(78dvh,720px)] flex-col justify-end overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/cta-band.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/75 to-black/40" />
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[var(--color-ink)]/55 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-14 pt-28 sm:px-6 sm:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <Image
              src="/images/logo.png"
              alt="Norris Construction"
              width={240}
              height={80}
              className="mb-8 h-14 w-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] sm:h-16"
              priority
            />
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-orange)]">
              Contact
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95] text-[var(--color-cream)]">
              Let’s build the brief together
            </h1>
            <p className="mt-5 max-w-xl text-base text-[var(--color-cream)]/85 sm:text-lg">
              Tell us about the home. We reply within one business day with a
              clear path — quiz, call, or form, your call.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact-form" className="btn-primary touch-manipulation">
                Start the form
              </a>
              <button
                type="button"
                onClick={openQuiz}
                className="btn-ghost touch-manipulation"
              >
                Take the quote quiz
              </button>
              <a href={telHref(phone)} className="btn-ghost touch-manipulation">
                Call now
              </a>
            </div>
            <p className="mt-5 text-xs text-[var(--color-cream)]/55">
              Free consultation · {licenseText} · Response within 1 business day
            </p>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-[var(--color-stone)]/15 bg-[var(--color-ink-soft)] py-5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-cream)]/60 sm:px-6">
          <span className="text-[var(--color-orange)]">Trusted process</span>
          <span>Licensed & insured</span>
          <span>Miami-Dade & Broward</span>
          <span>No hard sell</span>
        </div>
      </section>

      <section className="section-pad border-b border-[var(--color-stone)]/15">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
              Reach us your way
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl text-[var(--color-cream)] sm:text-4xl">
              Call, text, email — or start the form below
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {CHANNELS.map((channel, index) => (
              <Reveal key={channel.key}>
                <a
                  href={channel.href(props)}
                  className="group relative block overflow-hidden rounded-[1.5rem] border border-[var(--color-stone)]/20 bg-[var(--color-ink-soft)] p-6 transition hover:border-[var(--color-orange)]/50"
                >
                  <span className="font-display text-4xl text-[var(--color-orange)]/35 transition group-hover:text-[var(--color-orange)]/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-cream)]/50">
                    {channel.label}
                  </p>
                  <p className="mt-2 break-all font-display text-xl text-[var(--color-cream)] sm:text-2xl">
                    {channel.detail(props)}
                  </p>
                  <p className="mt-3 text-sm text-[var(--color-cream)]/60">
                    {channel.hint}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact-form"
        className="section-pad scroll-mt-28 border-b border-[var(--color-stone)]/15 bg-[var(--color-ink-soft)]"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
              Project intake
            </p>
            <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-5xl">
              Tell us about the project
            </h2>
            <p className="mt-4 text-[var(--color-cream)]/70">
              The more specific you are — neighborhood, timeline, how you live —
              the sharper our first response.
            </p>

            <div className="relative mt-8 aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-[var(--color-stone)]/20 sm:aspect-[5/6]">
              <Image
                src="/images/projects/estate-1.jpg"
                alt="Luxury remodel by Norris Construction"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-sm text-white/85">
                  Prefer guided questions?{" "}
                  <button
                    type="button"
                    onClick={openQuiz}
                    className="font-semibold text-[var(--color-orange)] underline-offset-2 hover:underline"
                  >
                    Take the 60-second quote quiz
                  </button>
                </p>
              </div>
            </div>

            <ul className="mt-8 space-y-3 text-sm text-[var(--color-cream)]/65">
              <li className="flex gap-2">
                <span className="text-[var(--color-orange)]">✓</span>
                {address}
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-orange)]">✓</span>
                {licenseText}
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-orange)]">✓</span>
                {insuranceText}
              </li>
            </ul>
          </Reveal>

          <Reveal>
            <div className="rounded-[1.75rem] border border-[var(--color-stone)]/20 bg-[var(--color-ink)] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-8">
              <div className="mb-6 flex items-end justify-between gap-4 border-b border-[var(--color-stone)]/15 pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-orange)]">
                    Estimate request
                  </p>
                  <p className="mt-1 font-display text-2xl text-[var(--color-cream)]">
                    Project form
                  </p>
                </div>
                <a
                  href={telHref(phone)}
                  className="hidden text-sm font-semibold text-[var(--color-cream)]/70 transition hover:text-[var(--color-orange)] sm:inline"
                >
                  Or call {phone}
                </a>
              </div>
              <ContactForm source="contact-page" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad border-b border-[var(--color-stone)]/15">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
              What happens next
            </p>
            <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-4xl">
              Three steps. Zero fog.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {STEPS.map((step) => (
              <Reveal key={step.n}>
                <article className="h-full rounded-[1.5rem] border border-[var(--color-stone)]/20 bg-gradient-to-b from-[var(--color-ink-soft)] to-[var(--color-ink)] p-6">
                  <span className="font-display text-4xl text-[var(--color-orange)]">
                    {step.n}
                  </span>
                  <h3 className="mt-4 font-display text-xl text-[var(--color-cream)]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-cream)]/70">
                    {step.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-[var(--color-stone)]/15">
        <Image
          src="/images/services/custom-homes.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[var(--color-ink)]/88" />
        <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
              Service areas
            </p>
            <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-4xl">
              We build across Miami & South Florida
            </h2>
            <p className="mt-4 max-w-lg text-[var(--color-cream)]/70">
              Local permitting know-how from the coast to Coral Gables — one
              finish standard everywhere we work.
            </p>
          </Reveal>
          <Reveal>
            <div className="flex flex-wrap gap-3">
              {AREAS.map((area) => (
                <Link
                  key={area.href}
                  href={area.href}
                  className="rounded-full border border-[var(--color-stone)]/30 bg-[var(--color-ink)]/50 px-5 py-2.5 text-sm font-semibold text-[var(--color-cream)] backdrop-blur transition hover:border-[var(--color-orange)]/60 hover:text-[var(--color-orange)]"
                >
                  {area.label}
                </Link>
              ))}
              <Link
                href="/services"
                className="rounded-full border border-[var(--color-orange)]/50 bg-[var(--color-orange)]/15 px-5 py-2.5 text-sm font-semibold text-[var(--color-orange)] backdrop-blur transition hover:bg-[var(--color-orange)]/25"
              >
                All services →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-[var(--color-ink-soft)]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
              FAQ
            </p>
            <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-4xl">
              Before you hit send
            </h2>
          </Reveal>
          <dl className="mt-10 divide-y divide-[var(--color-stone)]/20 border-y border-[var(--color-stone)]/20">
            {FAQS.map((item) => (
              <div key={item.q} className="py-5">
                <dt className="font-display text-lg text-[var(--color-cream)]">
                  {item.q}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-[var(--color-cream)]/70">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 text-center">
            <a href={`mailto:${email}`} className="btn-ghost touch-manipulation">
              Email {email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
