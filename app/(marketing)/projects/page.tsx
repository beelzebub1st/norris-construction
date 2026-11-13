import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { Reveal } from "@/components/motion/Reveal";
import { listAreas, listProjects } from "@/lib/content";
import { PROJECT_TYPE_LABELS } from "@/lib/project-labels";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Featured remodels and custom homes across Miami Beach, Coral Gables, Brickell, and Fort Lauderdale.",
};

export const instant = false;

type PageProps = {
  searchParams: Promise<{ type?: string; area?: string }>;
};

export default async function ProjectsPage({ searchParams }: PageProps) {
  const areas = await listAreas();
  const areaNames = Object.fromEntries(areas.map((a) => [a.slug, a.name]));

  return (
    <>
      <section className="border-b border-[var(--color-stone)]/15 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="font-display text-4xl text-[var(--color-cream)] sm:text-5xl">
            Projects
          </h1>
          <p className="mt-4 max-w-2xl text-[var(--color-cream)]/75">
            A portfolio of recent work — filter by project type or neighborhood.
          </p>
          <div className="mt-8">
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
  const projects = await listProjects({ type, area });

  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {projects.length === 0 ? (
          <p className="text-[var(--color-cream)]/70">
            No projects match these filters yet. Try clearing type or area.
          </p>
        ) : (
          <ul className="divide-y divide-[var(--color-stone)]/20 border-y border-[var(--color-stone)]/20">
            {projects.map((project) => {
              const image =
                project.gallery[0] ?? "/images/placeholders/hero.jpg";
              return (
                <li key={project.slug}>
                  <Reveal>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:gap-10"
                    >
                      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-[var(--color-stone)]/10 sm:w-64">
                        <Image
                          src={image}
                          alt=""
                          fill
                          className="object-cover transition-opacity group-hover:opacity-90"
                          sizes="(max-width: 768px) 100vw, 16rem"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs uppercase tracking-wide text-[var(--color-cream)]/55">
                          {PROJECT_TYPE_LABELS[project.type]}
                          {areaNames[project.areaSlug]
                            ? ` · ${areaNames[project.areaSlug]}`
                            : null}
                        </p>
                        <h2 className="mt-1 font-display text-2xl text-[var(--color-cream)]">
                          {project.title}
                        </h2>
                        <p className="mt-2 text-sm text-[var(--color-cream)]/70">
                          {project.summary}
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
