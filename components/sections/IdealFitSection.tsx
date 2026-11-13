"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { useConversion } from "@/components/conversion/ConversionProvider";

const FITS = [
  {
    title: "Kitchen remodels",
    body: "Layouts that cook and entertain — durable finishes for Miami humidity.",
    image: "/images/services/kitchens.jpg",
    href: "/services/kitchens",
  },
  {
    title: "Primary baths",
    body: "Spa-level suites with waterproofing and ventilation done right.",
    image: "/images/services/bathrooms.jpg",
    href: "/services/bathrooms",
  },
  {
    title: "Outdoor living",
    body: "Summer kitchens, lounges, and poolside spaces for year-round use.",
    image: "/images/services/outdoor-living.jpg",
    href: "/services/outdoor-living",
  },
  {
    title: "Custom homes",
    body: "Ground-up residences with one accountable team from concept to keys.",
    image: "/images/services/custom-homes.jpg",
    href: "/services/custom-homes",
  },
];

export function IdealFitSection() {
  const { openQuiz } = useConversion();

  return (
    <section className="section-pad border-t border-[var(--color-stone)]/15 bg-[var(--color-ink)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
                Popular starts
              </p>
              <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-5xl">
                What Miami homeowners ask for most
              </h2>
              <p className="mt-3 max-w-xl text-[var(--color-cream)]/70">
                Pick a starting point — or jump straight into the quote quiz.
              </p>
            </div>
            <button
              type="button"
              onClick={openQuiz}
              className="btn-primary w-fit touch-manipulation"
            >
              Match me to a scope
            </button>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {FITS.map((item) => (
            <Reveal key={item.title}>
              <Link
                href={item.href}
                className="group relative flex min-h-[200px] overflow-hidden rounded-[1.5rem] border border-[var(--color-stone)]/15 sm:min-h-[230px]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-black/20" />
                <div className="relative z-10 flex flex-col justify-end p-5 sm:p-6">
                  <h3 className="font-display text-2xl text-white">{item.title}</h3>
                  <p className="mt-2 max-w-sm text-sm text-white/75">{item.body}</p>
                  <span className="mt-4 text-sm font-semibold text-[var(--color-orange)]">
                    Explore →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
