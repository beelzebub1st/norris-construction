import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { Reveal } from "@/components/motion/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { EstimateCta } from "@/components/sections/EstimateCta";
import { PageCtaButtons } from "@/components/conversion/PageCtaButtons";
import { listAreas, listProjects } from "@/lib/content";
import { projectTypeEnum } from "@/lib/leads/validate";
import { PROJECT_TYPE_LABELS } from "@/lib/project-labels";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld-data";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = buildPageMetadata({
  title: "Projects",
  description:
    "Featured commercial renovations, office build-outs, restaurants, white boxing, and warehouse projects across Palm Beach, Broward, and Martin Counties.",
  path: "/projects",
  image: "/images/projects/office.jpg",
});

export const instant = false;

type PageProps = {
  searchParams: Promise<{ type?: string; area?: string }>;
};

export default async function ProjectsPage({ searchParams }: PageProps) {
  const [areas, settings] = await Promise.all([
    listAreas(),
    getSiteSettings(),
  ]);
  const areaNames = Object.fromEntries(areas.map((a) => [a.slug, a.name]));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
      <section className="relative min-h-[min(58vh,520px)] overflow-hidden border-b border-[var(--color-stone)]/15">
        <SafeImage
          src="/images/projects/estate-1.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/70 to-black/35" />
        <div className="relative z-10 mx-auto flex min-h-[min(58vh,520px)] max-w-6xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6 sm:pb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
            Portfolio
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-[var(--color-cream)] sm:text-6xl">
            Work that converts skeptics into believers
          </h1>
          <p className="mt-4 max-w-2xl text-[var(--color-cream)]/80">
            Real offices, restaurants, white boxing, storage, and warehouse work across South Florida —
            filter by type or neighborhood.
          </p>
          <PageCtaButtons
            phone={settings.phone}
            primaryLabel="Get a project like these"
            className="mt-8"
          />
        </div>
      </section>

      <section className="border-b border-[var(--color-stone)]/15 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Suspense
            fallback={
              <p className="text-sm text-[var(--color-cream)]/55">
                Loading filters…
              </p>
            }
          >
            <ProjectFilters
              areas={areas.map((a) => ({ slug: a.slug, name: a.name }))}
            />
          </Suspense>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="mx-auto max-w-6xl px-4 py-14 text-[var(--color-cream)]/60">
            Loading projects…
          </div>
        }
      >
        <ProjectList searchParams={searchParams} areaNames={areaNames} />
      </Suspense>

      <EstimateCta />
    </>
  );
}

async function ProjectList({
  searchParams,
  areaNames,
}: {
  searchParams: Promise<{ type?: string; area?: string }>;
  areaNames: Record<string, string>;
}) {
  const { type, area } = await searchParams;
  const typeFilter =
    type && projectTypeEnum.safeParse(type).success ? type : undefined;
  const projects = await listProjects({ type: typeFilter, area });

  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {projects.length === 0 ? (
          <p className="text-[var(--color-cream)]/70">
            No projects match these filters yet. Try clearing type or area.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project, index) => {
              const image =
                project.gallery[0] ?? "/images/placeholders/hero.jpg";
              return (
                <Reveal
                  key={project.slug}
                  className={index === 0 ? "sm:col-span-2" : undefined}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group relative block overflow-hidden rounded-[1.75rem] border border-[var(--color-stone)]/15"
                  >
                    <div
                      className={`relative ${
                        index === 0 ? "aspect-[21/10]" : "aspect-[4/3]"
                      }`}
                    >
                      <SafeImage
                        src={image}
                        alt=""
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                        sizes={
                          index === 0
                            ? "100vw"
                            : "(max-width: 768px) 100vw, 50vw"
                        }
                        fallbackSrc="/images/projects/kitchen.jpg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                        <p className="text-xs uppercase tracking-wide text-white/65">
                          {PROJECT_TYPE_LABELS[project.type]}
                          {areaNames[project.areaSlug]
                            ? ` · ${areaNames[project.areaSlug]}`
                            : null}
                        </p>
                        <h2 className="mt-2 font-display text-2xl text-white sm:text-3xl">
                          {project.title}
                        </h2>
                        <p className="mt-2 max-w-xl text-sm text-white/75">
                          {project.summary}
                        </p>
                        <span className="mt-4 inline-block text-sm font-semibold text-[var(--color-orange)]">
                          View project →
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
