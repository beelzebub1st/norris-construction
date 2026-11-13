"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { useConversion } from "@/components/conversion/ConversionProvider";

const PILLARS = [
  {
    title: "Scope before dust",
    body: "Drawings, allowances, and a written estimate land before demolition — so the build stays calm instead of improvisational.",
  },
  {
    title: "One accountable lead",
    body: "A single project lead owns trades, updates, and walkthroughs. You are never ping-ponged between subcontractors.",
  },
  {
    title: "Climate-smart craft",
    body: "Humidity, storms, and coastal codes shape materials and assemblies — not just the Instagram finish layer.",
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
              src="/images/projects/estate-1.jpg"
              alt="Finished luxury interior by Norris Construction"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 right-5 text-sm text-white/85">
              Coral Gables estate remodel — kitchen, primary suite, and outdoor living in one sequenced build.
            </p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
              How we work
            </p>
            <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-5xl">
              Luxury that survives Miami — not just the photoshoot
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--color-cream)]/78">
              Norris Construction is a South Florida design-build team for homeowners who want
              architecture-grade finishes without remodel chaos. We run custom homes, whole-home
              renovations, kitchens, baths, additions, and outdoor living with the same standard:
              clear paperwork, supervised trades, and details that still look sharp after a wet season.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-cream)]/70">
              Whether you are opening a Coral Gables kitchen, rebuilding a Brickell bath, or
              starting a ground-up residence, you get one plan, one schedule rhythm, and one team
              that answers the phone.
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
                Start with a quote
              </button>
              <Link href="/about" className="btn-ghost">
                Our story
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
