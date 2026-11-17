import type { Project } from "@prisma/client";
import { telHref } from "@/lib/site-settings";
import { absoluteUrl } from "@/lib/seo/metadata";
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
    "@type": ["GeneralContractor", "LocalBusiness"],
    "@id": `${base}/#business`,
    name: "Norris Construction",
    legalName: "Norris Construction Corp",
    url: base,
    image: [`${base}/images/logo.png`, `${base}/images/hero.jpg`],
    logo: `${base}/images/logo.png`,
    telephone: phoneDigits,
    email: settings.email,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2412 Stonybrook Drive",
      addressLocality: "Wellington",
      addressRegion: "FL",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.6587,
      longitude: -80.2414,
    },
    areaServed: [
      { "@type": "City", name: "Jupiter" },
      { "@type": "City", name: "West Palm Beach" },
      { "@type": "City", name: "Boca Raton" },
      { "@type": "City", name: "Fort Lauderdale" },
      { "@type": "City", name: "Coral Springs" },
      { "@type": "City", name: "Stuart" },
      { "@type": "AdministrativeArea", name: "Palm Beach County" },
      { "@type": "AdministrativeArea", name: "Broward County" },
      { "@type": "AdministrativeArea", name: "Martin County" },
    ],
    knowsAbout: [
      "Commercial renovations",
      "Tenant improvements",
      "Office build-outs",
      "Restaurant renovations",
      "White box commercial construction",
      "Warehouse and self-storage renovations",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
  };
}

export function projectJsonLd(project: Project, pageUrl: string) {
  const image = project.gallery[0];
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: pageUrl,
    ...(image
      ? {
          image: image.startsWith("http") ? image : absoluteUrl(image),
        }
      : {}),
    about: {
      "@type": "Place",
      name: project.areaSlug.replace(/-/g, " "),
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  if (faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function serviceJsonLd(input: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: {
      "@type": "GeneralContractor",
      name: "Norris Construction",
      url: siteUrl(),
    },
    areaServed: "South Florida",
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
  };
}
