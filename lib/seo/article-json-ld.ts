import { siteUrl } from "@/lib/seo/sitemap-paths";

type ArticleJsonLdInput = {
  title: string;
  description: string;
  slug: string;
  cover: string | null;
  publishedAt: Date | null;
  modifiedAt?: Date | null;
};

export function articleJsonLd(post: ArticleJsonLdInput) {
  const url = `${siteUrl()}/blog/${post.slug}`;
  const image = post.cover
    ? post.cover.startsWith("http")
      ? post.cover
      : `${siteUrl()}${post.cover}`
    : `${siteUrl()}/images/hero.jpg`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: [image],
    datePublished: post.publishedAt?.toISOString(),
    dateModified: (post.modifiedAt ?? post.publishedAt)?.toISOString(),
    author: {
      "@type": "Organization",
      name: "Norris Construction",
      url: siteUrl(),
    },
    publisher: {
      "@type": "Organization",
      name: "Norris Construction",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl()}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}
