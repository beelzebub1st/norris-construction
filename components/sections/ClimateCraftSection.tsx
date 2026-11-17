"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { useConversion } from "@/components/conversion/ConversionProvider";

const BLOCKS = [
  {
    title: "Permits without the mystery",
    body: "As your commercial GC, we pull permits for Palm Beach, Broward, and Martin County scopes that need them — inspections included, surprises reduced.",
    image: "/images/services/whitebox.jpg",
  },
  {
    title: "Finishes that hold up",
    body: "We specify for commercial traffic, humidity, and daily operations: durable flooring, coatings, and assemblies that earn their keep.",
    image: "/images/services/storage.jpg",
  },
  {
    title: "Occupied-building discipline",
    body: "Phased renovations with dust control and clear daily expectations — so adjacent tenants and operations can keep moving.",
    image: "/images/services/office.jpg",
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
              Built for South Florida commercial
            </p>
            <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-5xl">
              From vacant suite to business-ready
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-cream)]/75">
              Pretty finishes fail when sequencing, code coordination, and landlord criteria are
              treated as afterthoughts. We plan commercial renovations for how properties actually
              lease and operate — then deliver spaces that are ready to show or occupy.
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
                Send plans or photos and a short note — we will tell you what is likely required
                before you spend on finishes.
              </p>
            </div>
            <button
              type="button"
              onClick={openContact}
              className="btn-primary shrink-0 touch-manipulation"
            >
              Ask about your project
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
