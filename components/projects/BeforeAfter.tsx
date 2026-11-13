import Image from "next/image";
import type { BeforeAfterPair } from "@/lib/content";

type BeforeAfterProps = {
  pairs: BeforeAfterPair[];
  title: string;
};

export function BeforeAfter({ pairs, title }: BeforeAfterProps) {
  if (pairs.length === 0) return null;

  return (
    <section className="mt-14 border-t border-[var(--color-stone)]/15 pt-12">
      <h2 className="font-display text-2xl text-[var(--color-cream)] sm:text-3xl">
        Before & after
      </h2>
      <ul className="mt-8 space-y-12">
        {pairs.map((pair, index) => (
          <li key={`${pair.before}-${index}`}>
            <div className="grid gap-4 sm:grid-cols-2">
              {(
                [
                  { src: pair.before, label: "Before" },
                  { src: pair.after, label: "After" },
                ] as const
              ).map((side) => (
                <div key={side.label}>
                  <p className="mb-2 text-xs uppercase tracking-wide text-[var(--color-cream)]/55">
                    {side.label}
                  </p>
                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-stone)]/10">
                    <Image
                      src={side.src}
                      alt={`${title} — ${side.label.toLowerCase()}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              ))}
            </div>
            {pair.caption ? (
              <p className="mt-3 text-sm text-[var(--color-cream)]/70">
                {pair.caption}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
