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
    <section className="border-t border-[var(--color-stone)]/15 bg-[var(--color-ink)] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-3xl text-[var(--color-cream)] sm:text-4xl">
                Featured work
              </h2>
              <p className="mt-3 max-w-xl text-[var(--color-cream)]/75">
                Recent remodels and custom builds across South Florida.
              </p>
            </div>
            <Link
              href="/projects"
              className="text-sm font-medium text-[var(--color-cream)]/80 underline-offset-4 hover:underline"
            >
              View all projects
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          {projects.map((project) => (
            <Reveal key={project.slug}>
              <FeaturedProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
