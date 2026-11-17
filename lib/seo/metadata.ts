import type { Metadata } from "next";
import { siteUrl } from "@/lib/seo/sitemap-paths";

const DEFAULT_DESCRIPTION =
  "Commercial renovations, tenant improvements, office build-outs, white boxing, and warehouse renovations across Palm Beach, Broward, and Martin Counties.";

const DEFAULT_OG_IMAGE = "/images/hero.jpg";

export function absoluteUrl(path = "/") {
  const base = siteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  noIndex = false,
  absoluteTitle = false,
}: {
  title: string;
  description?: string | null;
  path: string;
  image?: string | null;
  type?: "website" | "article";
  noIndex?: boolean;
  absoluteTitle?: boolean;
}): Metadata {
  const desc = (description?.trim() || DEFAULT_DESCRIPTION).slice(0, 160);
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image || DEFAULT_OG_IMAGE);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: desc,
      url,
      siteName: "Norris Construction",
      locale: "en_US",
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export { DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE };
