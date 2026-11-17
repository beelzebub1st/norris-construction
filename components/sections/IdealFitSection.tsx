"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { useConversion } from "@/components/conversion/ConversionProvider";

const FITS = [
  {
    title: "White boxing & turnovers",
    body: "Lease-ready suites for landlords, leasing agents, and property managers.",
    image: "/images/services/whitebox.jpg",
    href: "/services/white-boxing",
  },
  {
    title: "Office build-outs",
    body: "Corporate, medical, and professional suites with practical layouts and finishes.",
    image: "/images/services/office.jpg",
    href: "/services/office-buildouts",
  },
  {
    title: "Restaurant renovations",
    body: "Dining rooms, bars, and hospitality interiors built for opening dates.",
    image: "/images/services/restaurant.jpg",
    href: "/services/restaurant-renovations",
  },
  {
    title: "Storage & warehouse",
    body: "Self-storage corridors, warehouse interiors, and industrial facility upgrades.",
    image: "/images/services/storage.jpg",
    href: "/services/storage-warehouse",
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
                Industries we serve
              </p>
              <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-5xl">
                Commercial spaces we renovate most
              </h2>
              <p className="mt-3 max-w-xl text-[var(--color-cream)]/70">
                Pick a starting point — or jump straight into a bid request.
              </p>
            </div>
            <button
              type="button"
              onClick={openQuiz}
              className="btn-primary w-fit touch-manipulation"
            >
              Request a Bid
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
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
