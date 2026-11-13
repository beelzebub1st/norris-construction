import { Reveal } from "@/components/motion/Reveal";

export type TestimonialItem = {
  name: string;
  quote: string;
};

const PLACEHOLDER_TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Homeowner, Coral Gables",
    quote:
      "Clear communication every week and finishes that matched what we approved on paper.",
  },
  {
    name: "Homeowner, Miami Beach",
    quote:
      "They coordinated trades and kept our occupied home livable through a full kitchen remodel.",
  },
];

type TestimonialsSectionProps = {
  testimonials: TestimonialItem[];
};

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const items =
    testimonials.length > 0 ? testimonials : PLACEHOLDER_TESTIMONIALS;

  return (
    <section className="border-t border-[var(--color-stone)]/15 bg-[var(--color-ink)] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-display text-3xl text-[var(--color-cream)] sm:text-4xl">
            What clients say
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-10 sm:grid-cols-2">
          {items.map((item) => (
            <li key={`${item.name}-${item.quote.slice(0, 24)}`}>
              <Reveal>
                <blockquote className="text-lg leading-relaxed text-[var(--color-cream)]/90">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <footer className="mt-4 text-sm text-[var(--color-cream)]/60">
                  — {item.name}
                </footer>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
