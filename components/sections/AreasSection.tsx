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
  jupiter: "/images/areas/jupiter.jpg",
  "west-palm-beach": "/images/areas/west-palm-beach.jpg",
  "fort-lauderdale": "/images/areas/fort-lauderdale.jpg",
  "coral-springs": "/images/areas/coral-springs.jpg",
  "boca-raton": "/images/areas/west-palm-beach.jpg",
  stuart: "/images/areas/jupiter.jpg",
};

const AREA_BLURBS: Record<string, string> = {
  jupiter:
    "Office build-outs, retail turnovers, and commercial renovations for northern Palm Beach.",
  "west-palm-beach":
    "Professional suites, shopping plaza TI, and landlord white-boxing on leasing timelines.",
  "fort-lauderdale":
    "Restaurant, retail, and office renovations across Fort Lauderdale and greater Broward.",
  "coral-springs":
    "Medical suites, multi-tenant offices, and plaza improvements in northwest Broward.",
  "boca-raton":
    "Office modernization, retail build-outs, and commercial property renovations.",
  stuart:
    "Commercial renovations and facility work north through Stuart and Martin County.",
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
                Local crews. Local permitting know-how. One standard of finish across Palm Beach,
                Broward, and Martin Counties.
              </p>
            </div>
            <button
              type="button"
              onClick={openQuiz}
              className="btn-ghost w-fit touch-manipulation"
            >
              Request a local bid
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
                  src={AREA_IMAGES[area.slug] || "/images/hero.jpg"}
                  alt={area.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  fallbackSrc="/images/hero.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />
                <div className="relative z-10 flex h-full min-h-[250px] flex-col justify-end p-6">
                  <h3 className="font-display text-2xl text-white">{area.name}</h3>
                  <p className="mt-2 max-w-md text-sm text-white/75">
                    {AREA_BLURBS[area.slug] || area.headline}
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
