"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Reveal } from "@/components/motion/Reveal";
import { useConversion } from "@/components/conversion/ConversionProvider";
import type { FeaturedProjectItem } from "@/components/sections/FeaturedProjectCard";
import { SafeImage } from "@/components/ui/SafeImage";

const EXTRA = [
  {
    title: "Outdoor living pavilion",
    slug: "projects",
    summary: "Poolside summer kitchen & covered lounge",
    image: "/images/projects/outdoor.jpg",
  },
  {
    title: "Spa primary bath",
    slug: "projects",
    summary: "Stone, steam, and quiet luxury",
    image: "/images/projects/bath.jpg",
  },
  {
    title: "Custom coastal estate",
    slug: "services/custom-homes",
    summary: "Ground-up architecture partnership",
    image: "/images/services/custom-homes.jpg",
  },
];

type ProjectMagnetProps = {
  projects: FeaturedProjectItem[];
};

export function ProjectMagnet({ projects }: ProjectMagnetProps) {
  const { openQuiz } = useConversion();
  const railRef = useRef<HTMLDivElement>(null);
  const scrubRef = useRef<HTMLDivElement>(null);
  const suppressClick = useRef(false);
  const drag = useRef({
    active: false,
    startX: 0,
    startScroll: 0,
    moved: false,
  });
  const scrubbing = useRef(false);
  const [progress, setProgress] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  const items = [
    ...projects.map((p) => ({
      ...p,
      href: `/projects/${p.slug}`,
    })),
    ...EXTRA.map((p) => ({ ...p, href: `/${p.slug}` })),
  ];

  const updateProgress = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanScroll(max > 8);
    setProgress(max <= 0 ? 0 : Math.min(1, Math.max(0, el.scrollLeft / max)));
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    updateProgress();
    el.addEventListener("scroll", updateProgress, { passive: true });
    const ro = new ResizeObserver(updateProgress);
    ro.observe(el);
    window.addEventListener("resize", updateProgress);
    return () => {
      el.removeEventListener("scroll", updateProgress);
      ro.disconnect();
      window.removeEventListener("resize", updateProgress);
    };
  }, [updateProgress, items.length]);

  const endRailDrag = () => {
    if (!drag.current.active) return;
    const moved = drag.current.moved;
    drag.current.active = false;
    drag.current.moved = false;
    railRef.current?.classList.remove("is-dragging");
    if (moved) {
      suppressClick.current = true;
      window.setTimeout(() => {
        suppressClick.current = false;
      }, 80);
    }
  };

  const onRailPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    // Mouse/pen drag only — touch keeps native momentum scroll
    if (e.button !== 0 || e.pointerType === "touch") return;
    const el = railRef.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
    el.setPointerCapture(e.pointerId);
    el.classList.add("is-dragging");
  };

  const onRailPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const el = railRef.current;
    if (!el) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 5) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };

  const scrollFromClientX = (clientX: number) => {
    const rail = railRef.current;
    const scrub = scrubRef.current;
    if (!rail || !scrub) return;
    const rect = scrub.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const max = rail.scrollWidth - rail.clientWidth;
    rail.scrollLeft = ratio * max;
  };

  const onScrubPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    scrubbing.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    scrollFromClientX(e.clientX);
  };

  const onScrubPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!scrubbing.current) return;
    scrollFromClientX(e.clientX);
  };

  const endScrub = () => {
    scrubbing.current = false;
  };

  const guardClick = (e: React.MouseEvent) => {
    if (!suppressClick.current) return;
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <section className="section-pad overflow-hidden border-t border-[var(--color-stone)]/15 bg-[var(--color-ink-soft)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
                Swipe the work
              </p>
              <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-5xl">
                Find a vibe. Steal the brief.
              </h2>
              <p className="mt-3 max-w-md text-sm text-[var(--color-cream)]/65 sm:text-base">
                Drag or swipe through recent builds — then grab the look for your
                home.
              </p>
            </div>
            <button
              type="button"
              onClick={openQuiz}
              className="btn-primary w-fit touch-manipulation"
            >
              I want this energy
            </button>
          </div>
        </Reveal>
      </div>

      <div
        ref={railRef}
        className="project-magnet-rail mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 sm:gap-4 sm:px-6 md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
        onPointerDown={onRailPointerDown}
        onPointerMove={onRailPointerMove}
        onPointerUp={endRailDrag}
        onPointerCancel={endRailDrag}
        onClickCapture={guardClick}
      >
        {items.map((item) => (
          <article
            key={`${item.title}-${item.image}`}
            className="relative w-[min(78vw,19.5rem)] shrink-0 snap-start overflow-hidden rounded-[1.5rem] border border-[var(--color-stone)]/20 sm:w-[22rem] sm:rounded-[1.75rem] md:w-[26rem]"
          >
            <div className="relative aspect-[3/4] sm:aspect-[4/5]">
              <SafeImage
                src={item.image}
                alt={item.title}
                fill
                className="pointer-events-none object-cover"
                sizes="(max-width: 640px) 78vw, (max-width: 768px) 22rem, 26rem"
                draggable={false}
                fallbackSrc="/images/projects/kitchen.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <h3 className="font-display text-xl text-white sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-snug text-white/75 sm:mt-2">
                  {item.summary}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
                  <Link
                    href={item.href}
                    className="btn-ghost touch-manipulation !px-3.5 !py-2 text-xs"
                  >
                    Open
                  </Link>
                  <button
                    type="button"
                    onClick={openQuiz}
                    className="btn-primary touch-manipulation !px-3.5 !py-2 text-xs"
                  >
                    Get this look
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
        {/* Trailing spacer so the last card clears floating CTAs on phones */}
        <div
          aria-hidden
          className="w-4 shrink-0 snap-end sm:w-2 md:w-[max(0px,calc((100vw-72rem)/2))]"
        />
      </div>

      <div className="mx-auto mt-4 max-w-6xl px-4 pb-16 sm:px-6 md:pb-0">
        <div
          ref={scrubRef}
          role="slider"
          aria-label="Scroll portfolio"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          aria-disabled={!canScroll}
          tabIndex={canScroll ? 0 : -1}
          className={`project-magnet-scrub group relative h-2 touch-none select-none rounded-full ${
            canScroll ? "cursor-grab active:cursor-grabbing" : "opacity-40"
          }`}
          onPointerDown={onScrubPointerDown}
          onPointerMove={onScrubPointerMove}
          onPointerUp={endScrub}
          onPointerCancel={endScrub}
          onKeyDown={(e) => {
            const el = railRef.current;
            if (!el || !canScroll) return;
            const step = el.clientWidth * 0.65;
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
              e.preventDefault();
              el.scrollBy({ left: step, behavior: "smooth" });
            }
            if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
              e.preventDefault();
              el.scrollBy({ left: -step, behavior: "smooth" });
            }
          }}
        >
          <div className="absolute inset-0 rounded-full bg-[var(--color-stone)]/20" />
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--color-orange-hot)] to-[var(--color-orange)] transition-[width] duration-75 ease-out"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
          <div
            className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-[var(--color-cream)] bg-[var(--color-orange)] shadow-[0_2px_10px_rgba(0,0,0,0.45)] transition-transform group-active:scale-110"
            style={{ left: `calc(${progress * 100}% - 0.5rem)` }}
          />
        </div>
        <p className="mt-2 text-center text-[11px] uppercase tracking-[0.18em] text-[var(--color-mist)] md:hidden">
          Drag to explore
        </p>
      </div>
    </section>
  );
}
