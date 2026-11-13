"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { useConversion } from "@/components/conversion/ConversionProvider";

export type AreaListItem = {
  name: string;
  slug: string;
  headline: string;
};

type AreasSectionProps = {
  areas: AreaListItem[];
};

const AREA_IMAGES: Record<string, string> = {
  "miami-beach": "/images/areas/miami-beach.jpg",
  "coral-gables": "/images/areas/coral-gables.jpg",
  brickell: "/images/areas/brickell.jpg",
  "fort-lauderdale": "/images/areas/fort-lauderdale.jpg",
};

const AREA_BLURBS: Record<string, string> = {
  "miami-beach":
    "Coastal assemblies, salt-aware finishes, and condo logistics that respect building rules.",
  "coral-gables":
    "Historic character protected while kitchens, baths, and outdoor rooms get a modern rewrite.",
  brickell:
    "High-rise ready craft — quiet hours, freight elevators, and finishes that still feel residential.",
  "fort-lauderdale":
    "Indoor-outdoor living with storm-smart detailing for canals, breezes, and weekend hosting.",
};

export function AreasSection({ areas }: AreasSectionProps) {
  const { openQuiz } = useConversion();

  return (
    <section className="section-pad border-t border-[var(--color-stone)]/15">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
                Service areas
              </p>
              <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-5xl">
                Where we build
              </h2>
              <p className="mt-3 text-[var(--color-cream)]/70">
                Local crews. Local permitting know-how. One standard of finish from Miami Beach to
                Fort Lauderdale.
              </p>
            </div>
            <button
              type="button"
              onClick={openQuiz}
              className="btn-ghost w-fit touch-manipulation"
            >
              Get a local estimate
            </button>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {areas.map((area) => (
            <Reveal key={area.slug}>
              <Link
                href={`/areas/${area.slug}`}
                className="group relative block min-h-[250px] overflow-hidden rounded-[1.5rem]"
              >
                <SafeImage
                  src={AREA_IMAGES[area.slug] || "/images/areas/miami-beach.jpg"}
                  alt={area.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  fallbackSrc="/images/areas/miami-beach.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl text-white">{area.name}</h3>
                  <p className="mt-2 text-sm text-white/80">{area.headline}</p>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/65">
                    {AREA_BLURBS[area.slug] ??
                      "Local craftsmanship with a finish standard that travels across South Florida."}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
