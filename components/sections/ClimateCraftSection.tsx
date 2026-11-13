"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { useConversion } from "@/components/conversion/ConversionProvider";

const BLOCKS = [
  {
    title: "Permits without the mystery",
    body: "Miami-Dade and Broward scopes that need permitting get a documented path — inspections included, surprises reduced.",
    image: "/images/services/renovations.jpg",
  },
  {
    title: "Materials that hold up",
    body: "We specify for humidity, salt air, and storm seasons: waterproofing, ventilation, and finishes that earn their keep.",
    image: "/images/services/bathrooms.jpg",
  },
  {
    title: "Occupied-home discipline",
    body: "Phased kitchens and baths with dust control and daily expectations — so you can stay livable while we build.",
    image: "/images/services/kitchens.jpg",
  },
];

export function ClimateCraftSection() {
  const { openContact } = useConversion();

  return (
    <section className="section-pad border-t border-[var(--color-stone)]/15">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
              Built for South Florida
            </p>
            <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-5xl">
              Climate is not a footnote. It is the brief.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-cream)]/75">
              Pretty kitchens fail when waterproofing, HVAC returns, and coastal detailing are treated
              as afterthoughts. We design assemblies for how Miami actually lives — then finish them
              so they photograph.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {BLOCKS.map((block) => (
            <Reveal key={block.title}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[var(--color-stone)]/15 bg-[var(--color-ink-soft)]">
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={block.image}
                    alt=""
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-display text-xl text-[var(--color-cream)]">
                    {block.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-cream)]/70">
                    {block.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 flex flex-col gap-4 rounded-[1.5rem] border border-[var(--color-stone)]/20 bg-gradient-to-br from-[var(--color-orange)]/15 to-transparent p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="font-display text-2xl text-[var(--color-cream)]">
                Not sure if your scope needs permitting?
              </p>
              <p className="mt-2 max-w-xl text-sm text-[var(--color-cream)]/70">
                Send photos and a short note — we will tell you what is likely required before you
                spend on finishes.
              </p>
            </div>
            <button
              type="button"
              onClick={openContact}
              className="btn-primary shrink-0 touch-manipulation"
            >
              Ask about your home
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
