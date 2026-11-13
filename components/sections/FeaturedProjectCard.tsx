"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/SafeImage";

export type FeaturedProjectItem = {
  title: string;
  slug: string;
  summary: string;
  image: string;
  area?: string | null;
  typeLabel?: string | null;
};

export function FeaturedProjectCard({
  project,
  featured = false,
}: {
  project: FeaturedProjectItem;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group block overflow-hidden rounded-[1.5rem] border border-[var(--color-stone)]/15 bg-[var(--color-ink)] ${
        featured ? "lg:grid lg:grid-cols-2" : ""
      }`}
    >
      <motion.div
        className={`relative overflow-hidden ${
          featured ? "aspect-[16/11] lg:aspect-auto lg:min-h-[320px]" : "aspect-[16/11]"
        }`}
        whileHover="hover"
        initial="rest"
        animate="rest"
      >
        <motion.div
          className="absolute inset-0"
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.06 },
          }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <SafeImage
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes={featured ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 1024px) 100vw, 50vw"}
            fallbackSrc="/images/projects/kitchen.jpg"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
        <span className="absolute bottom-4 left-4 rounded-full bg-[var(--color-orange)] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white opacity-0 transition group-hover:opacity-100">
          View project
        </span>
      </motion.div>
      <div className={`flex flex-col justify-center p-5 sm:p-6 ${featured ? "lg:p-8" : ""}`}>
        {(project.typeLabel || project.area) && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-orange)]">
            {[project.typeLabel, project.area].filter(Boolean).join(" · ")}
          </p>
        )}
        <h3
          className={`font-display text-[var(--color-cream)] ${
            featured ? "mt-2 text-3xl sm:text-4xl" : "mt-1 text-2xl"
          }`}
        >
          {project.title}
        </h3>
        <p
          className={`mt-3 text-[var(--color-cream)]/70 ${
            featured ? "text-base leading-relaxed" : "text-sm"
          }`}
        >
          {project.summary}
        </p>
        <span className="mt-5 text-sm font-semibold text-[var(--color-orange)]">
          Explore the build →
        </span>
      </div>
    </Link>
  );
}
