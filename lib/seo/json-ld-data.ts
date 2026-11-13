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
    "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
    "@id": `${base}/#business`,
    name: "Norris Construction",
    legalName: "Norris Construction",
    url: base,
    image: [`${base}/images/logo.png`, `${base}/images/hero.jpg`],
    logo: `${base}/images/logo.png`,
    telephone: phoneDigits,
    email: settings.email,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: "Miami",
      addressRegion: "FL",
      postalCode: "33131",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.7617,
      longitude: -80.1918,
    },
    areaServed: [
      { "@type": "City", name: "Miami" },
      { "@type": "City", name: "Miami Beach" },
      { "@type": "City", name: "Coral Gables" },
      { "@type": "City", name: "Brickell" },
      { "@type": "City", name: "Fort Lauderdale" },
      { "@type": "AdministrativeArea", name: "Miami-Dade County" },
      { "@type": "AdministrativeArea", name: "Broward County" },
    ],
    knowsAbout: [
      "Custom home building",
      "Home remodeling",
      "Kitchen remodeling",
      "Bathroom remodeling",
      "Home additions",
      "Outdoor living",
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
      "@type": "HomeAndConstructionBusiness",
      name: "Norris Construction",
      url: siteUrl(),
    },
    areaServed: "Miami, FL",
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
  };
}
