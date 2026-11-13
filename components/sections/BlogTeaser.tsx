import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export type PostTeaserItem = {
  title: string;
  slug: string;
  cover: string | null;
};

type BlogTeaserProps = {
  posts: PostTeaserItem[];
};

export function BlogTeaser({ posts }: BlogTeaserProps) {
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-[var(--color-stone)]/15 bg-[var(--color-ink)] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-3xl text-[var(--color-cream)] sm:text-4xl">
                From the blog
              </h2>
              <p className="mt-3 text-[var(--color-cream)]/75">
                Planning tips for South Florida homeowners.
              </p>
            </div>
            <Link
              href="/blog"
              className="text-sm font-medium text-[var(--color-cream)]/80 underline-offset-4 hover:underline"
            >
              All posts
            </Link>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-8 sm:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Reveal>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-stone)]/10">
                    {post.cover ? (
                      <Image
                        src={post.cover}
                        alt=""
                        fill
                        className="object-cover transition-opacity group-hover:opacity-90"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : null}
                  </div>
                  <h3 className="mt-4 font-display text-lg text-[var(--color-cream)]">
                    {post.title}
                  </h3>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
