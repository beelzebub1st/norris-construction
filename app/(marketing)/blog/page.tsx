import type { Metadata } from "next";
import Link from "next/link";
import { PostStatus } from "@prisma/client";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { EstimateCta } from "@/components/sections/EstimateCta";
import { DEMO_POSTS } from "@/lib/demo-data";
import { hasDatabase } from "@/lib/has-database";
import { getPrisma } from "@/lib/prisma";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld-data";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Commercial Construction Guides",
  description:
    "Expert guides on white-box construction, commercial tenant improvements, office build-outs, restaurant renovations, and warehouse work in South Florida.",
  path: "/blog",
  image: "/images/services/whitebox.jpg",
});

async function listPostsWithSeo() {
  "use cache";
  if (!hasDatabase()) {
    return DEMO_POSTS.map((post) => ({
      title: post.title,
      slug: post.slug,
      cover: post.cover,
      publishedAt: post.publishedAt,
      seoDescription: post.seoDescription,
    }));
  }
  return getPrisma().post.findMany({
    where: { status: PostStatus.published },
    orderBy: { publishedAt: "desc" },
    select: {
      title: true,
      slug: true,
      cover: true,
      publishedAt: true,
      seoDescription: true,
    },
  });
}

export default async function BlogIndexPage() {
  const posts = await listPostsWithSeo();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <section className="border-b border-[var(--color-stone)]/15 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
            Resources
          </p>
          <h1 className="mt-3 font-display text-4xl text-[var(--color-cream)] sm:text-5xl">
            Commercial construction & renovation guides
          </h1>
          <p className="mt-4 max-w-2xl text-[var(--color-cream)]/75">
            Practical planning advice for South Florida property owners and
            managers — costs, permits, timelines, and how to hire with confidence.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {posts.length === 0 ? (
            <p className="text-[var(--color-cream)]/70">
              New articles will appear here as they publish.
            </p>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Reveal>
                    <Link href={`/blog/${post.slug}`} className="group block h-full">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--color-stone)]/15 bg-[var(--color-stone)]/10">
                        <SafeImage
                          src={post.cover}
                          alt=""
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          fallbackSrc="/images/services/kitchens.jpg"
                        />
                      </div>
                      {post.publishedAt ? (
                        <time
                          dateTime={post.publishedAt.toISOString()}
                          className="mt-4 block text-xs uppercase tracking-wide text-[var(--color-cream)]/50"
                        >
                          {post.publishedAt.toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                      ) : null}
                      <h2 className="mt-2 font-display text-xl text-[var(--color-cream)] transition-colors group-hover:text-[var(--color-orange)]">
                        {post.title}
                      </h2>
                      {post.seoDescription ? (
                        <p className="mt-2 text-sm leading-relaxed text-[var(--color-cream)]/65">
                          {post.seoDescription}
                        </p>
                      ) : null}
                      <span className="mt-3 inline-block text-sm font-semibold text-[var(--color-orange)]">
                        Read guide →
                      </span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <EstimateCta />
    </>
  );
}
