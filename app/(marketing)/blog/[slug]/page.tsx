import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BlogBody } from "@/components/blog/BlogBody";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { EstimateCta } from "@/components/sections/EstimateCta";
import { PageCtaButtons } from "@/components/conversion/PageCtaButtons";
import { SafeImage } from "@/components/ui/SafeImage";
import { getPostBySlug, listPublishedPosts } from "@/lib/content";
import { articleJsonLd } from "@/lib/seo/article-json-ld";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld-data";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getSiteSettings } from "@/lib/site-settings";

export const instant = false;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await listPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found" };

  return buildPageMetadata({
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.body.slice(0, 160),
    path: `/blog/${slug}`,
    image: post.cover,
    type: "article",
  });
}

async function BlogPostContent({ slug }: { slug: string }) {
  const [post, settings, more] = await Promise.all([
    getPostBySlug(slug),
    getSiteSettings(),
    listPublishedPosts(),
  ]);
  if (!post) notFound();

  const related = more.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.seoDescription ?? post.title,
          slug: post.slug,
          cover: post.cover,
          publishedAt: post.publishedAt,
          modifiedAt: post.updatedAt,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <article>
        <div className="relative aspect-[21/9] max-h-[24rem] w-full bg-[var(--color-stone)]/10">
          <SafeImage
            src={post.cover}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
            fallbackSrc="/images/services/kitchens.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/80 to-transparent" />
        </div>
        <header className="border-b border-[var(--color-stone)]/15 py-12 sm:py-14">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
              Guide
            </p>
            {post.publishedAt ? (
              <time
                dateTime={post.publishedAt.toISOString()}
                className="mt-3 block text-xs uppercase tracking-wide text-[var(--color-cream)]/55"
              >
                {post.publishedAt.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            ) : null}
            <h1 className="mt-3 font-display text-4xl text-[var(--color-cream)] sm:text-5xl">
              {post.title}
            </h1>
            {post.seoDescription ? (
              <p className="mt-4 text-lg text-[var(--color-cream)]/75">
                {post.seoDescription}
              </p>
            ) : null}
          </div>
        </header>
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <Reveal>
            <BlogBody content={post.body} />
          </Reveal>
          <div className="mt-12 rounded-[1.5rem] border border-[var(--color-stone)]/20 bg-[var(--color-ink-soft)] p-6">
            <p className="font-display text-2xl text-[var(--color-cream)]">
              Planning a project in Miami?
            </p>
            <p className="mt-2 text-sm text-[var(--color-cream)]/70">
              Get a clear next step — quiz, call, or message. We reply within one
              business day.
            </p>
            <PageCtaButtons phone={settings.phone} className="mt-5" />
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="border-t border-[var(--color-stone)]/15 bg-[var(--color-ink-soft)] section-pad">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-display text-3xl text-[var(--color-cream)]">
              Keep reading
            </h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/blog/${item.slug}`} className="group block">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--color-stone)]/15">
                      <SafeImage
                        src={item.cover}
                        alt=""
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        fallbackSrc="/images/services/kitchens.jpg"
                      />
                    </div>
                    <h3 className="mt-3 font-display text-lg text-[var(--color-cream)] group-hover:text-[var(--color-orange)]">
                      {item.title}
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <EstimateCta />
    </>
  );
}

export default function BlogPostPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-20 text-[var(--color-cream)]/60">
          Loading…
        </div>
      }
    >
      <BlogPostLoader params={params} />
    </Suspense>
  );
}

async function BlogPostLoader({ params }: PageProps) {
  const { slug } = await params;
  return <BlogPostContent slug={slug} />;
}
