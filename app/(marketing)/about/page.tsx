import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { EstimateCta } from "@/components/sections/EstimateCta";
import { PageCtaButtons } from "@/components/conversion/PageCtaButtons";
import { SafeImage } from "@/components/ui/SafeImage";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld-data";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description:
    "Norris Construction — commercial renovations, tenant improvements, and build-outs across Palm Beach, Broward, and Martin Counties.",
  path: "/about",
  image: "/images/hero.jpg",
});

const VALUES = [
  {
    title: "Clarity before chaos",
    body: "Scope, schedules, and bids are written before demolition — so the build feels calm.",
  },
  {
    title: "One accountable lead",
    body: "You get a single project lead who owns trades, updates, and walkthroughs end to end.",
  },
  {
    title: "Lease-ready discipline",
    body: "We plan around openings, renewals, and showings — not just finish samples.",
  },
  {
    title: "Finishes that hold up",
    body: "Details are supervised for commercial traffic and South Florida conditions.",
  },
];

const TIMELINE = [
  {
    year: "Origins",
    body: "Hands-on commercial renovation work across South Florida — learning how offices, retail, and facilities actually operate.",
  },
  {
    year: "Growth",
    body: "Expanded into tenant improvements, white boxing, restaurants, medical suites, and warehouse renovations with trusted trades partners.",
  },
  {
    year: "Today",
    body: "Commercial only — no residential homes. A renovation and build-out partner for property owners, managers, franchise operators, and businesses.",
  },
];

const GALLERY = [
  { src: "/images/hero.jpg", alt: "White-box commercial suite" },
  { src: "/images/projects/office.jpg", alt: "Office build-out" },
  { src: "/images/projects/restaurant.jpg", alt: "Restaurant renovation" },
  { src: "/images/projects/warehouse.jpg", alt: "Warehouse interior" },
  { src: "/images/projects/storage.jpg", alt: "Self-storage renovation" },
  { src: "/images/cta-band.jpg", alt: "Commercial facility interior" },
];

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <section className="relative min-h-[min(70vh,640px)] overflow-hidden border-b border-[var(--color-stone)]/15">
        <SafeImage
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/65 to-black/30" />
        <div className="relative z-10 mx-auto flex min-h-[min(70vh,640px)] max-w-6xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6 sm:pb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
            About Norris
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-[var(--color-cream)] sm:text-6xl">
            Building better commercial spaces across South Florida.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-[var(--color-cream)]/80 sm:text-lg">
            Strictly commercial — renovations, tenant improvements, and facility
            conversions for property owners, developers, managers, and businesses.
            We do not build houses.
          </p>
          <PageCtaButtons phone={settings.phone} className="mt-8" />
        </div>
      </section>

      <TrustStrip
        licenseText={settings.licenseText}
        insuranceText={settings.insuranceText}
        yearsInBusiness={settings.yearsInBusiness}
      />

      <section className="section-pad border-b border-[var(--color-stone)]/15">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
              Our story
            </p>
            <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-4xl">
              Craft first. Communication always.
            </h2>
            <div className="mt-6 space-y-4 text-[var(--color-cream)]/80 leading-relaxed">
              <p>
                Norris Construction Corp is focused exclusively on commercial work —
                renovations, interior build-outs, tenant improvements, and property
                turnovers throughout Palm Beach, Broward, and Martin Counties. We
                do not build houses. As a commercial general contractor, we pull
                permits and coordinate trades under one accountable team so projects
                stay on schedule and lease-ready.
              </p>
              <p>
                Every engagement starts with listening: how the space needs to
                operate, lease, and serve customers or tenants. From there we
                align scope, finishes, and phasing before demolition begins.
              </p>
              <p>
                Today we deliver office build-outs, restaurant renovations, retail
                TI, white boxing, storage and warehouse work, and property
                management renovations with the same standard — clear bids,
                dedicated supervision, and dependable results.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-[var(--color-stone)]/20 sm:aspect-[5/6]">
              <SafeImage
                src="/images/projects/estate-1.jpg"
                alt="Craftsmanship detail from a Norris remodel"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad border-b border-[var(--color-stone)]/15 bg-[var(--color-ink-soft)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
              What we stand for
            </p>
            <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-4xl">
              Principles that show up on site
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {VALUES.map((value) => (
              <Reveal key={value.title}>
                <article className="h-full rounded-3xl border border-[var(--color-stone)]/20 bg-[var(--color-ink)] p-6">
                  <h3 className="font-display text-xl text-[var(--color-cream)]">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-cream)]/70">
                    {value.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-[var(--color-stone)]/15">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
              Path
            </p>
            <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-4xl">
              How we got here
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {TIMELINE.map((item) => (
              <Reveal key={item.year}>
                <article className="rounded-3xl border border-[var(--color-stone)]/20 bg-[var(--color-ink-soft)] p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-orange)]">
                    {item.year}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--color-cream)]/75">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-[var(--color-stone)]/15 bg-[var(--color-ink-soft)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
              In the field
            </p>
            <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-4xl">
              Work that represents us
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((item, index) => (
              <Reveal
                key={item.src}
                className={index === 0 ? "sm:col-span-2 lg:col-span-2" : undefined}
              >
                <div
                  className={`relative overflow-hidden rounded-2xl border border-[var(--color-stone)]/15 ${
                    index === 0 ? "aspect-[16/10]" : "aspect-[4/3]"
                  }`}
                >
                  <SafeImage
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes={
                      index === 0
                        ? "(max-width: 1024px) 100vw, 66vw"
                        : "(max-width: 1024px) 50vw, 33vw"
                    }
                  />
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/projects" className="btn-ghost">
              Browse projects
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-[var(--color-stone)]/15">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
              Credentials
            </p>
            <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-4xl">
              Trust, on paper
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "License", value: settings.licenseText },
              { label: "Insurance", value: settings.insuranceText },
              { label: "Experience", value: settings.yearsInBusiness },
              { label: "Service area", value: settings.address },
            ].map((item) => (
              <Reveal key={item.label}>
                <div className="rounded-3xl border border-[var(--color-stone)]/20 bg-[var(--color-ink-soft)] p-5">
                  <p className="text-xs uppercase tracking-wide text-[var(--color-cream)]/50">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-medium text-[var(--color-cream)]">
                    {item.value}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <PageCtaButtons phone={settings.phone} className="mt-10" />
        </div>
      </section>

      <EstimateCta />
    </>
  );
}
