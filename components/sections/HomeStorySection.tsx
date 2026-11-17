"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { useConversion } from "@/components/conversion/ConversionProvider";

const PILLARS = [
  {
    title: "Scope before dust",
    body: "Walkthroughs, written scopes, and clear bids land before demolition — so the build stays controlled instead of improvisational.",
  },
  {
    title: "One accountable lead",
    body: "A single project lead owns trades, updates, and walkthroughs. You are never ping-ponged between subcontractors.",
  },
  {
    title: "Lease-ready execution",
    body: "Schedules align to openings, renewals, and showings — with finishes built for commercial traffic and South Florida conditions.",
  },
];

export function HomeStorySection() {
  const { openQuiz } = useConversion();

  return (
    <section className="section-pad border-t border-[var(--color-stone)]/15 bg-[var(--color-ink-soft)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] sm:aspect-[5/6]">
            <Image
              src="/images/projects/office.jpg"
              alt="Commercial office build-out by Norris Construction"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 right-5 text-sm text-white/85">
              Jupiter office build-out — open plan, glass conference rooms, and professional finishes in one sequenced TI.
            </p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
              How we work
            </p>
            <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-5xl">
              Commercial spaces built for business
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--color-cream)]/78">
              Norris Construction is a commercial renovation and build-out contractor for South
              Florida — offices, restaurants, retail, white boxing, storage facilities, and
              warehouses. We do not build houses. Our clients are property owners, developers,
              property managers, franchise operators, and business owners.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-cream)]/70">
              Whether you are preparing a vacant retail suite, modernizing an office, renovating a
              restaurant, or upgrading a commercial facility, you get practical construction
              solutions, quality workmanship, and dependable closeout.
            </p>
          </Reveal>

          <div className="mt-8 space-y-5">
            {PILLARS.map((item) => (
              <Reveal key={item.title}>
                <div className="border-l-2 border-[var(--color-orange)] pl-4">
                  <h3 className="font-display text-lg text-[var(--color-cream)]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-cream)]/68">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-9 flex flex-wrap gap-3">
              <button type="button" onClick={openQuiz} className="btn-primary">
                Request a Bid
              </button>
              <Link href="/about" className="btn-ghost">
                About Norris
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
