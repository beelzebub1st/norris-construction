import { Reveal } from "@/components/motion/Reveal";

export type TestimonialItem = {
  name: string;
  quote: string;
};

type TestimonialsSectionProps = {
  testimonials: TestimonialItem[];
};

const PLACEHOLDERS: TestimonialItem[] = [
  {
    name: "Patricia M. · Coral Gables",
    quote:
      "Norris rebuilt our kitchen and primary bath without the usual remodel nightmare. Updates every week. Finishes look expensive — because they are.",
  },
  {
    name: "Daniel R. · Miami Beach",
    quote:
      "From permitting to punch list, they owned the timeline. Our penthouse kitchen feels custom, not contractor-generic.",
  },
  {
    name: "Elena S. · Brickell",
    quote:
      "We compared three builders. Norris was the only team that asked how we actually live — then designed around that.",
  },
];

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const items =
    testimonials.length >= 3
      ? testimonials
      : [
          ...testimonials,
          ...PLACEHOLDERS.filter(
            (p) => !testimonials.some((t) => t.quote === p.quote),
          ),
        ].slice(0, 3);

  return (
    <section className="section-pad border-t border-[var(--color-stone)]/15 bg-[var(--color-ink-soft)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
              Proof
            </p>
            <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-5xl">
              Homeowners talk. We listen.
            </h2>
            <p className="mt-4 text-[var(--color-cream)]/72">
              The compliments we care about are about communication and craft — not just the final
              photoshoot.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((t) => (
            <Reveal key={`${t.name}-${t.quote.slice(0, 24)}`}>
              <blockquote className="flex h-full flex-col rounded-[1.5rem] border border-[var(--color-stone)]/20 bg-[var(--color-ink)] p-6">
                <p className="text-[var(--color-orange)]" aria-hidden>
                  ★★★★★
                </p>
                <p className="mt-4 text-lg leading-relaxed text-[var(--color-cream)]/90">
                  “{t.quote}”
                </p>
                <footer className="mt-auto pt-6 text-sm font-semibold text-[var(--color-orange)]">
                  {t.name}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
