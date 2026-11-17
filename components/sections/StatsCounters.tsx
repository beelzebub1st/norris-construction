"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";

const STATS = [
  {
    label: "Projects delivered",
    value: 180,
    suffix: "+",
    hint: "Offices, retail, restaurants, warehouses, and turnovers",
  },
  {
    label: "Avg. client rating",
    value: 4.9,
    suffix: "",
    decimals: 1,
    hint: "From owners, managers, and operators who hired us",
  },
  {
    label: "South Florida cities",
    value: 20,
    suffix: "+",
    hint: "Palm Beach, Broward & Martin Counties",
  },
  {
    label: "Response window",
    value: 1,
    suffix: " day",
    hint: "Typical reply after a bid request",
  },
];

function useCountUp(
  target: number,
  active: boolean,
  decimals = 0,
  duration = 1400,
) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Number((target * eased).toFixed(decimals)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, decimals, duration]);
  return value;
}

function StatItem({
  label,
  value,
  suffix,
  hint,
  decimals = 0,
  active,
}: {
  label: string;
  value: number;
  suffix: string;
  hint: string;
  decimals?: number;
  active: boolean;
}) {
  const n = useCountUp(value, active, decimals);
  return (
    <div className="rounded-[1.35rem] border border-[var(--color-stone)]/20 bg-[var(--color-ink)]/80 p-5 text-left backdrop-blur sm:p-6">
      <p className="font-display text-4xl text-[var(--color-orange)] sm:text-5xl">
        {decimals ? n.toFixed(decimals) : Math.round(n)}
        {suffix}
      </p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-cream)]/70">
        {label}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-cream)]/55">
        {hint}
      </p>
    </div>
  );
}

export function StatsCounters() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden border-t border-[var(--color-stone)]/15 py-14 sm:py-16">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(224,104,32,0.16),transparent_42%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6" ref={ref}>
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
                Momentum
              </p>
              <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-5xl">
                Numbers that calm a big decision
              </h2>
              <p className="mt-4 text-[var(--color-cream)]/72">
                Commercial renovations are schedule- and budget-critical. These are the receipts
                we share before anyone picks up a hammer.
              </p>
            </div>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <StatItem key={s.label} {...s} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
