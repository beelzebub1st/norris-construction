import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import {
  FeaturedProjectCard,
  type FeaturedProjectItem,
} from "@/components/sections/FeaturedProjectCard";

type FeaturedProjectsProps = {
  projects: FeaturedProjectItem[];
};

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="section-pad border-t border-[var(--color-stone)]/15 bg-[var(--color-ink-soft)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
                Portfolio
              </p>
              <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-5xl">
                Recent work across Miami & Broward
              </h2>
              <p className="mt-3 text-[var(--color-cream)]/75">
                Kitchens that cook hard, baths that hold waterproofing, outdoor rooms built for
                year-round hosting — real homes, not mood boards.
              </p>
            </div>
            <Link href="/projects" className="btn-ghost w-fit">
              View all projects
            </Link>
          </div>
        </Reveal>

        {projects.length === 0 ? (
          <p className="mt-10 text-sm text-[var(--color-cream)]/55">
            Featured projects are loading — visit the full portfolio meanwhile.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal
                key={project.slug}
                className={index === 0 ? "lg:col-span-2" : undefined}
              >
                <FeaturedProjectCard
                  project={project}
                  featured={index === 0}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
