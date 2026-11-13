import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { listPublishedPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Planning tips and insights for South Florida homeowners.",
};

export default async function BlogIndexPage() {
  const posts = await listPublishedPosts();

  return (
    <>
      <section className="border-b border-[var(--color-stone)]/15 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="font-display text-4xl text-[var(--color-cream)] sm:text-5xl">
            Blog
          </h1>
          <p className="mt-4 max-w-2xl text-[var(--color-cream)]/75">
            Guides for remodeling and custom builds in Miami&apos;s climate.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {posts.length === 0 ? (
            <p className="text-[var(--color-cream)]/70">
              New articles will appear here as they publish.
            </p>
          ) : (
            <ul className="divide-y divide-[var(--color-stone)]/20 border-y border-[var(--color-stone)]/20">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Reveal>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:gap-10"
                    >
                      {post.cover ? (
                        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-[var(--color-stone)]/10 sm:w-56">
                          <Image
                            src={post.cover}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 14rem"
                          />
                        </div>
                      ) : null}
                      <div>
                        <h2 className="font-display text-2xl text-[var(--color-cream)] group-hover:text-[var(--color-cream)]">
                          {post.title}
                        </h2>
                        {post.publishedAt ? (
                          <time
                            dateTime={post.publishedAt.toISOString()}
                            className="mt-2 block text-xs text-[var(--color-cream)]/55"
                          >
                            {post.publishedAt.toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </time>
                        ) : null}
                      </div>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
