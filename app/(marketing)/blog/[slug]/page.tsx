import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { EstimateCta } from "@/components/sections/EstimateCta";
import { getPostBySlug, listPublishedPosts } from "@/lib/content";

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

  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.body.slice(0, 160),
  };
}

async function BlogPostContent({ slug }: { slug: string }) {
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <article>
        {post.cover ? (
          <div className="relative aspect-[21/9] max-h-[24rem] w-full bg-[var(--color-stone)]/10">
            <Image
              src={post.cover}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        ) : null}
        <header className="border-b border-[var(--color-stone)]/15 py-14 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            {post.publishedAt ? (
              <time
                dateTime={post.publishedAt.toISOString()}
                className="text-xs uppercase tracking-wide text-[var(--color-cream)]/55"
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
          </div>
        </header>
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16">
          <Reveal>
            <div className="text-[var(--color-cream)]/80 leading-relaxed whitespace-pre-line">
              {post.body}
            </div>
          </Reveal>
        </div>
      </article>
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
