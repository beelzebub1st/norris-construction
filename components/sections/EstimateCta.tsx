import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export function EstimateCta() {
  return (
    <section className="border-t border-[var(--color-stone)]/15 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col items-start gap-6 border border-[var(--color-stone)]/25 px-8 py-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-2xl text-[var(--color-cream)] sm:text-3xl">
                Ready for a clear estimate?
              </h2>
              <p className="mt-2 max-w-lg text-[var(--color-cream)]/75">
                Tell us about your project — we respond within one business day.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 rounded-full bg-[var(--color-orange)] px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Get estimate
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
