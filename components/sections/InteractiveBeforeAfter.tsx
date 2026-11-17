"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { useConversion } from "@/components/conversion/ConversionProvider";

export function InteractiveBeforeAfter() {
  const { openQuiz } = useConversion();
  const [pos, setPos] = useState(52);
  const dragging = useRef(false);
  const frame = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = frame.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(92, Math.max(8, next)));
  }, []);

  return (
    <section className="section-pad border-t border-[var(--color-stone)]/15">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
            Drag to compare
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl text-[var(--color-cream)] sm:text-5xl">
            Before is vacant. After is lease-ready.
          </h2>
          <p className="mt-3 max-w-xl text-[var(--color-cream)]/75">
            Slide the handle — then start a quote for your own transformation.
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <div
            ref={frame}
            className="relative aspect-[16/10] cursor-ew-resize overflow-hidden rounded-[2rem] border border-[var(--color-stone)]/20 select-none touch-none"
            onPointerDown={(e) => {
              dragging.current = true;
              (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
              updateFromClientX(e.clientX);
            }}
            onPointerMove={(e) => {
              if (!dragging.current) return;
              updateFromClientX(e.clientX);
            }}
            onPointerUp={() => {
              dragging.current = false;
            }}
            onPointerCancel={() => {
              dragging.current = false;
            }}
          >
            <Image
              src="/images/projects/after-kitchen.jpg"
              alt="After commercial renovation"
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${pos}%` }}
            >
              <div className="relative h-full" style={{ width: `${10000 / pos}%` }}>
                <Image
                  src="/images/projects/before-kitchen.jpg"
                  alt="Before tenant turnover"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </div>
            <div
              className="absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              style={{ left: `${pos}%` }}
            >
              <div className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[var(--color-orange)] text-xs font-bold text-white shadow-xl">
                ↔
              </div>
            </div>
            <span className="absolute top-4 left-4 rounded-full bg-black/55 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
              Before
            </span>
            <span className="absolute top-4 right-4 rounded-full bg-[var(--color-orange)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              After
            </span>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button type="button" onClick={openQuiz} className="btn-primary">
            Request a bid like this
          </button>
          <p className="text-sm text-[var(--color-cream)]/60">
            Typical turnover path: walkthrough → scope → build → lease-ready
          </p>
        </div>
      </div>
    </section>
  );
}
