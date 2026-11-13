import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export type ServiceListItem = {
  title: string;
  slug: string;
  summary: string;
};

type ServicesSectionProps = {
  services: ServiceListItem[];
};

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="bg-[var(--color-ink)] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-display text-3xl text-[var(--color-cream)] sm:text-4xl">
            What we build
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--color-cream)]/75">
            Full-service residential construction — from ground-up estates to
            kitchens, baths, and outdoor living.
          </p>
        </Reveal>

        <ul className="mt-12 divide-y divide-[var(--color-stone)]/20 border-y border-[var(--color-stone)]/20">
          {services.map((service) => (
            <li key={service.slug}>
              <Reveal>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex flex-col gap-2 py-6 transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                >
                  <span className="font-display text-xl text-[var(--color-cream)] group-hover:text-[var(--color-cream)]">
                    {service.title}
                  </span>
                  <span className="max-w-md text-sm text-[var(--color-cream)]/70">
                    {service.summary}
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
