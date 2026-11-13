import type { Project } from "@prisma/client";
import { telHref } from "@/lib/site-settings";
import { siteUrl } from "@/lib/seo/sitemap-paths";

type SettingsForJsonLd = {
  phone: string;
  email: string;
  address: string;
};

export function localBusinessJsonLd(settings: SettingsForJsonLd) {
  const base = siteUrl();
  const phoneDigits = telHref(settings.phone).replace("tel:", "");

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Norris Construction",
    url: base,
    image: `${base}/images/logo.png`,
    telephone: phoneDigits,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Miami",
      addressRegion: "FL",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: "Miami",
    },
  };
}

export function projectJsonLd(project: Project, pageUrl: string) {
  const image = project.gallery[0];
  return {
    "@context": "https://schema.org",
    "@type": "Project",
    name: project.title,
    description: project.summary,
    url: pageUrl,
    ...(image ? { image } : {}),
  };
}
