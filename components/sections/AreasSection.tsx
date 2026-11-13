import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export type AreaListItem = {
  name: string;
  slug: string;
  headline: string;
};

type AreasSectionProps = {
  areas: AreaListItem[];
};

export function AreasSection({ areas }: AreasSectionProps) {
  return (
    <section className="border-t border-[var(--color-stone)]/15 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-display text-3xl text-[var(--color-cream)] sm:text-4xl">
            Areas we serve
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--color-cream)]/75">
            Local crews and relationships across Miami-Dade, Broward, and the
            beaches.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {areas.map((area) => (
            <li key={area.slug}>
              <Reveal>
                <Link
                  href={`/areas/${area.slug}`}
                  className="block border-l-2 border-[var(--color-stone)]/40 py-1 pl-5 transition-colors hover:border-[var(--color-cream)]/50"
                >
                  <span className="font-display text-xl text-[var(--color-cream)]">
                    {area.name}
                  </span>
                  <p className="mt-1 text-sm text-[var(--color-cream)]/65">
                    {area.headline}
                  </p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
