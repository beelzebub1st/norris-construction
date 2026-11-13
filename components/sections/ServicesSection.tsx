import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";

export type ServiceListItem = {
  title: string;
  slug: string;
  summary: string;
  heroImage?: string | null;
};

type ServicesSectionProps = {
  services: ServiceListItem[];
};

const FALLBACK: Record<string, string> = {
  "custom-homes": "/images/services/custom-homes.jpg",
  renovations: "/images/services/renovations.jpg",
  kitchens: "/images/services/kitchens.jpg",
  bathrooms: "/images/services/bathrooms.jpg",
  additions: "/images/services/additions.jpg",
  "outdoor-living": "/images/services/outdoor-living.jpg",
};

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="section-pad bg-[var(--color-ink)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
                Services
              </p>
              <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-5xl">
                Built for how Miami lives
              </h2>
              <p className="mt-3 text-[var(--color-cream)]/75">
                From ground-up estates to kitchens, baths, additions, and outdoor living — one
                accountable team from first sketch to final walkthrough.
              </p>
            </div>
            <Link href="/services" className="btn-ghost w-fit">
              All services
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const src =
              service.heroImage ||
              FALLBACK[service.slug] ||
              "/images/services/custom-homes.jpg";
            return (
              <Reveal key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative block min-h-[300px] overflow-hidden rounded-[1.5rem]"
                >
                  <SafeImage
                    src={src}
                    alt={service.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    fallbackSrc="/images/services/custom-homes.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-2xl text-white">
                      {service.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/78">
                      {service.summary}
                    </p>
                    <span className="mt-4 inline-flex text-sm font-semibold text-[var(--color-orange)]">
                      Explore →
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
