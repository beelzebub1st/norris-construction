"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useConversion } from "@/components/conversion/ConversionProvider";

export function CinematicBreak() {
  const ref = useRef<HTMLElement>(null);
  const { openQuiz } = useConversion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0.4, 1, 1, 0.55]);

  return (
    <section
      ref={ref}
      className="relative h-[62vh] min-h-[400px] overflow-hidden border-y border-[var(--color-stone)]/15"
    >
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src="/images/services/custom-homes.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/60" />
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-orange)]">
          South Florida standard
        </p>
        <h2 className="mt-4 max-w-3xl font-display text-3xl text-white sm:text-5xl">
          Architecture-grade builds. Remodel-friendly timelines.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
          Custom homes and high-end remodels with the same supervision, documentation, and
          finish discipline — from Coral Gables to Fort Lauderdale.
        </p>
        <button type="button" onClick={openQuiz} className="btn-primary mt-8">
          Plan my project
        </button>
      </motion.div>
    </section>
  );
}
