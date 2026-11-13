import { Reveal } from "@/components/motion/Reveal";

const STEPS = [
  {
    title: "Vision & Planning",
    description:
      "Site walks, scope, budget alignment, and permitting strategy before a single swing.",
  },
  {
    title: "Design & Development",
    description:
      "Drawings, selections, and schedule milestones with clear weekly updates.",
  },
  {
    title: "Build & Handover",
    description:
      "Craftsmanship on site, punch list, and a clean handover you can move into.",
  },
] as const;

export function ProcessSection() {
  return (
    <section className="border-t border-[var(--color-stone)]/15 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-display text-3xl text-[var(--color-cream)] sm:text-4xl">
            How we work
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--color-cream)]/75">
            A straightforward path from first conversation to keys in hand.
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-10 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title}>
              <Reveal>
                <span className="font-display text-sm text-[var(--color-stone)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-xl text-[var(--color-cream)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-cream)]/70">
                  {step.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
