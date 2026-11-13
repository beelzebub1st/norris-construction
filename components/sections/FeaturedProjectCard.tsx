"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export type FeaturedProjectItem = {
  title: string;
  slug: string;
  summary: string;
  image: string;
};

export function FeaturedProjectCard({ project }: { project: FeaturedProjectItem }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden"
    >
      <motion.div
        className="relative aspect-[4/3] overflow-hidden bg-[var(--color-stone)]/10"
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
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <Image
            src={project.image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </motion.div>
      <h3 className="mt-4 font-display text-xl text-[var(--color-cream)]">
        {project.title}
      </h3>
      <p className="mt-2 text-sm text-[var(--color-cream)]/70">{project.summary}</p>
    </Link>
  );
}
