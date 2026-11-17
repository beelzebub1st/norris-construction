import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";

export type PostTeaserItem = {
  title: string;
  slug: string;
  cover: string | null;
  excerpt?: string | null;
};

type BlogTeaserProps = {
  posts: PostTeaserItem[];
};

const COVER_FALLBACKS = [
  "/images/services/whitebox.jpg",
  "/images/services/office.jpg",
  "/images/services/restaurant.jpg",
];

export function BlogTeaser({ posts }: BlogTeaserProps) {
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-[var(--color-stone)]/15 bg-[var(--color-ink)] section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
                Guides
              </p>
              <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-4xl">
                Plan smarter before you build
              </h2>
              <p className="mt-3 text-[var(--color-cream)]/75">
                Cost ranges, permits, and hiring advice for South Florida commercial renovations — then book a
                walkthrough when you are ready.
              </p>
            </div>
            <Link href="/blog" className="btn-ghost w-fit">
              All posts
            </Link>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => {
            const cover =
              post.cover && post.cover.trim()
                ? post.cover
                : COVER_FALLBACKS[index % COVER_FALLBACKS.length];
            return (
              <li key={post.slug}>
                <Reveal>
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] border border-[var(--color-stone)]/15 bg-[var(--color-stone)]/10">
                      <SafeImage
                        src={cover}
                        alt=""
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        fallbackSrc={COVER_FALLBACKS[index % COVER_FALLBACKS.length]}
                      />
                    </div>
                    <h3 className="mt-4 font-display text-lg text-[var(--color-cream)] transition-colors group-hover:text-[var(--color-orange)]">
                      {post.title}
                    </h3>
                    {post.excerpt ? (
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--color-cream)]/65">
                        {post.excerpt}
                      </p>
                    ) : null}
                    <span className="mt-3 inline-block text-sm font-semibold text-[var(--color-orange)]">
                      Read guide →
                    </span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
