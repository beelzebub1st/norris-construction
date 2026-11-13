import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { EstimateCta } from "@/components/sections/EstimateCta";
import { Reveal } from "@/components/motion/Reveal";
import { PageCtaButtons } from "@/components/conversion/PageCtaButtons";
import { SafeImage } from "@/components/ui/SafeImage";
import { listServices } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld-data";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getSiteSettings } from "@/lib/site-settings";
import { getServiceExtra } from "@/lib/service-extras";

export const metadata: Metadata = buildPageMetadata({
  title: "Services",
  description:
    "Custom homes, renovations, kitchens, baths, additions, and outdoor living across South Florida.",
  path: "/services",
  image: "/images/services/custom-homes.jpg",
});

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([
    listServices(),
    getSiteSettings(),
  ]);

  // listServices currently omits heroImage — fetch via extras for the deeper grid
  const detailed = services.map((service) => ({
    ...service,
    longSummary: getServiceExtra(service.slug)?.longSummary ?? service.summary,
    image:
      getServiceExtra(service.slug)?.gallery[0]?.src ??
      `/images/services/${service.slug}.jpg`,
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <section className="relative min-h-[min(58vh,520px)] overflow-hidden border-b border-[var(--color-stone)]/15">
        <SafeImage
          src="/images/services/custom-homes.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/70 to-black/35" />
        <div className="relative z-10 mx-auto flex min-h-[min(58vh,520px)] max-w-6xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6 sm:pb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
            Services
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-[var(--color-cream)] sm:text-6xl">
            Everything your home needs — one accountable team
          </h1>
          <p className="mt-4 max-w-2xl text-[var(--color-cream)]/80">
            Full-service residential construction for discerning homeowners across
            Miami-Dade and Broward.
          </p>
          <PageCtaButtons phone={settings.phone} className="mt-8" />
        </div>
      </section>

      <ServicesSection services={services} />

      <section className="section-pad border-t border-[var(--color-stone)]/15 bg-[var(--color-ink-soft)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2 className="font-display text-3xl text-[var(--color-cream)] sm:text-4xl">
              Dive deeper into each offering
            </h2>
            <p className="mt-3 max-w-2xl text-[var(--color-cream)]/70">
              Process, galleries, and FAQs for every service we deliver.
            </p>
          </Reveal>
          <div className="mt-10 space-y-5">
            {detailed.map((service) => (
              <Reveal key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group grid overflow-hidden rounded-[1.5rem] border border-[var(--color-stone)]/20 bg-[var(--color-ink)] sm:grid-cols-[14rem_1fr]"
                >
                  <div className="relative aspect-[16/10] sm:aspect-auto sm:min-h-[9rem]">
                    <SafeImage
                      src={service.image}
                      alt=""
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 14rem"
                      fallbackSrc="/images/services/custom-homes.jpg"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-5 sm:p-6">
                    <h3 className="font-display text-2xl text-[var(--color-cream)]">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-cream)]/70">
                      {service.longSummary}
                    </p>
                    <span className="mt-4 text-sm font-semibold text-[var(--color-orange)]">
                      Explore {service.title.toLowerCase()} →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <EstimateCta />
    </>
  );
}
