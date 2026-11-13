import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { EstimateCta } from "@/components/sections/EstimateCta";
import {
  getAreaBySlug,
  getServicesBySlugs,
  listAreas,
  listProjects,
} from "@/lib/content";
import { PROJECT_TYPE_LABELS } from "@/lib/project-labels";

export const instant = false;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const areas = await listAreas();
  return areas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = await getAreaBySlug(slug);
  if (!area) return { title: "Area not found" };

  return {
    title: area.seoTitle ?? `${area.name} Construction`,
    description: area.seoDescription ?? area.headline,
  };
}

async function AreaDetailContent({ slug }: { slug: string }) {
  const area = await getAreaBySlug(slug);
  if (!area) notFound();

  const [services, projects] = await Promise.all([
    getServicesBySlugs(area.nearbyServiceSlugs),
    listProjects({ area: area.slug }),
  ]);

  return (
    <>
      <section className="border-b border-[var(--color-stone)]/15 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs uppercase tracking-wide text-[var(--color-cream)]/55">
            Areas we serve
          </p>
          <h1 className="mt-2 font-display text-4xl text-[var(--color-cream)] sm:text-5xl">
            {area.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-cream)]/75">
            {area.headline}
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <div className="text-[var(--color-cream)]/80 leading-relaxed whitespace-pre-line">
              {area.body}
            </div>
          </Reveal>
        </div>
      </section>

      {services.length > 0 ? (
        <section className="border-t border-[var(--color-stone)]/15 py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="font-display text-2xl text-[var(--color-cream)] sm:text-3xl">
                Popular services in {area.name}
              </h2>
              <ul className="mt-8 divide-y divide-[var(--color-stone)]/20 border-y border-[var(--color-stone)]/20">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="block py-5 transition-colors hover:text-[var(--color-orange)]"
                    >
                      <span className="font-display text-lg text-[var(--color-cream)]">
                        {service.title}
                      </span>
                      <p className="mt-1 text-sm text-[var(--color-cream)]/70">
                        {service.summary}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="border-t border-[var(--color-stone)]/15 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2 className="font-display text-2xl text-[var(--color-cream)] sm:text-3xl">
              Projects in {area.name}
            </h2>
          </Reveal>
          {projects.length === 0 ? (
            <p className="mt-6 text-[var(--color-cream)]/70">
              New case studies for this area are on the way.
            </p>
          ) : (
            <ul className="mt-8 divide-y divide-[var(--color-stone)]/20 border-y border-[var(--color-stone)]/20">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Reveal>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="block py-5"
                    >
                      <p className="text-xs uppercase tracking-wide text-[var(--color-cream)]/55">
                        {PROJECT_TYPE_LABELS[project.type]}
                      </p>
                      <span className="font-display text-lg text-[var(--color-cream)]">
                        {project.title}
                      </span>
                      <p className="mt-1 text-sm text-[var(--color-cream)]/70">
                        {project.summary}
                      </p>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <EstimateCta />
    </>
  );
}

export default function AreaPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-20 text-[var(--color-cream)]/60">
          Loading…
        </div>
      }
    >
      <AreaDetailLoader params={params} />
    </Suspense>
  );
}

async function AreaDetailLoader({ params }: PageProps) {
  const { slug } = await params;
  return <AreaDetailContent slug={slug} />;
}
