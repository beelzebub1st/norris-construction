import type { ProjectType } from "@prisma/client";
import { SEO_BLOG_POSTS } from "@/lib/seo-blog-posts";
import { SERVICE_EXTRAS } from "@/lib/service-extras";

const SERVICE_IMAGES: Record<string, string> = {
  "custom-homes": "/images/services/custom-homes.jpg",
  renovations: "/images/services/renovations.jpg",
  kitchens: "/images/services/kitchens.jpg",
  bathrooms: "/images/services/bathrooms.jpg",
  additions: "/images/services/additions.jpg",
  "outdoor-living": "/images/services/outdoor-living.jpg",
};

export const DEMO_SETTINGS = {
  id: "singleton",
  phone: "(305) 555-0100",
  sms: "+13055550100",
  email: "hello@norris.construction",
  address: "Serving Miami-Dade & Broward · Miami, FL",
  licenseText: "Florida CBC · Licensed & bonded",
  insuranceText: "General liability & workers’ comp",
  yearsInBusiness: "15+ years in South Florida",
  socials: {},
  chatEmbedHtml: null as string | null,
  chatEnabled: false,
  nurtureEnabled: false,
};

export const DEMO_SERVICES = [
  {
    id: "demo-svc-custom-homes",
    slug: "custom-homes",
    title: "Custom Homes",
    sortOrder: 0,
    summary:
      "Ground-up luxury residences tailored to your lot, lifestyle, and South Florida climate.",
    seoTitle: "Custom Homes in Miami & South Florida",
    seoDescription:
      "Luxury custom home builders in Miami-Dade and Broward — architecture coordination, permitting, and craft-led finishes.",
    heroImage: SERVICE_IMAGES["custom-homes"],
    relatedProjectIds: [] as string[],
  },
  {
    id: "demo-svc-renovations",
    slug: "renovations",
    title: "Renovations",
    sortOrder: 1,
    summary: "Whole-home and selective remodels that respect your home's character.",
    seoTitle: "Home Renovations in Miami",
    seoDescription:
      "Occupied-home renovations with clear phasing, dust control, and premium finishes across South Florida.",
    heroImage: SERVICE_IMAGES.renovations,
    relatedProjectIds: [] as string[],
  },
  {
    id: "demo-svc-kitchens",
    slug: "kitchens",
    title: "Kitchens",
    sortOrder: 2,
    summary: "Chef-ready kitchens with premium cabinetry, surfaces, and lighting.",
    seoTitle: "Kitchen Remodeling Miami",
    seoDescription:
      "Luxury kitchen remodels in Miami — layout, cabinetry, surfaces, and lighting built for humidity and entertaining.",
    heroImage: SERVICE_IMAGES.kitchens,
    relatedProjectIds: [] as string[],
  },
  {
    id: "demo-svc-bathrooms",
    slug: "bathrooms",
    title: "Bathrooms",
    sortOrder: 3,
    summary: "Spa-level primary suites and guest baths built for humidity and longevity.",
    seoTitle: "Bathroom Remodeling Miami",
    seoDescription:
      "Primary and guest bath remodels with waterproofing, ventilation, and spa-level finishes.",
    heroImage: SERVICE_IMAGES.bathrooms,
    relatedProjectIds: [] as string[],
  },
  {
    id: "demo-svc-additions",
    slug: "additions",
    title: "Additions",
    sortOrder: 4,
    summary: "Room additions and second stories that blend with existing architecture.",
    seoTitle: "Home Additions Miami",
    seoDescription:
      "Seamless home additions and second stories with structural engineering and matching finishes.",
    heroImage: SERVICE_IMAGES.additions,
    relatedProjectIds: [] as string[],
  },
  {
    id: "demo-svc-outdoor",
    slug: "outdoor-living",
    title: "Outdoor Living",
    sortOrder: 5,
    summary: "Pools, summer kitchens, and terraces for year-round Florida living.",
    seoTitle: "Outdoor Living & Summer Kitchens",
    seoDescription:
      "Outdoor kitchens, pavilions, and lounges engineered for South Florida sun and storms.",
    heroImage: SERVICE_IMAGES["outdoor-living"],
    relatedProjectIds: [] as string[],
  },
].map((service) => {
  const extra = SERVICE_EXTRAS[service.slug];
  return {
    ...service,
    body: extra ? extra.paragraphs.join("\n\n") : service.summary,
    faqs: extra?.faqs ?? [],
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  };
});

export const DEMO_AREAS = [
  {
    id: "demo-area-miami-beach",
    slug: "miami-beach",
    name: "Miami Beach",
    headline: "Coastal luxury construction on Miami Beach",
    body: "Condos, waterfront estates, and historic renovations with strict coastal code expertise. From penthouse kitchens to full-home refreshes, we navigate building rules, freight logistics, and salt-air materials so the finish lasts.",
    nearbyServiceSlugs: ["renovations", "kitchens", "bathrooms"],
    seoTitle: "Miami Beach Construction & Remodeling",
    seoDescription:
      "Luxury remodeling and construction on Miami Beach — condos, kitchens, baths, and coastal finishes.",
  },
  {
    id: "demo-area-coral-gables",
    slug: "coral-gables",
    name: "Coral Gables",
    headline: "Timeless builds in Coral Gables",
    body: "Mediterranean revival updates, additions, and custom homes in tree-lined neighborhoods. We respect historic character while upgrading systems, kitchens, and outdoor rooms for modern living.",
    nearbyServiceSlugs: ["custom-homes", "additions", "renovations"],
    seoTitle: "Coral Gables Home Renovation",
    seoDescription:
      "Coral Gables remodels, additions, and custom homes with historic character and modern systems.",
  },
  {
    id: "demo-area-brickell",
    slug: "brickell",
    name: "Brickell",
    headline: "High-rise ready craftsmanship in Brickell",
    body: "Penthouse renovations and premium finish work for urban professionals. Quiet logistics, waterproofing that never fails, and finishes that feel residential — not hotel-generic.",
    nearbyServiceSlugs: ["kitchens", "bathrooms", "renovations"],
    seoTitle: "Brickell Condo Renovation",
    seoDescription:
      "Brickell high-rise renovations — kitchens, baths, and premium finishes with building logistics handled.",
  },
  {
    id: "demo-area-ftl",
    slug: "fort-lauderdale",
    name: "Fort Lauderdale",
    headline: "South Florida living from Fort Lauderdale",
    body: "Waterfront remodels and custom residences along the Intracoastal and Las Olas corridors. Outdoor living, kitchens, and whole-home renovations built for year-round entertaining.",
    nearbyServiceSlugs: ["custom-homes", "outdoor-living", "renovations"],
    seoTitle: "Fort Lauderdale Remodeling",
    seoDescription:
      "Fort Lauderdale custom homes, outdoor living, and renovations for Intracoastal and Las Olas living.",
  },
].map((area) => ({
  ...area,
  createdAt: new Date("2026-01-01"),
  updatedAt: new Date("2026-01-01"),
}));

export const DEMO_PROJECTS = [
  {
    id: "demo-proj-gables",
    slug: "coral-gables-estate-remodel",
    title: "Coral Gables Estate Remodel",
    type: "remodel" as ProjectType,
    areaSlug: "coral-gables",
    summary:
      "Full interior refresh of a 1920s Gables estate with modern kitchen and primary suite.",
    body: "Structural reinforcement, new MEP, and period-appropriate millwork restored the home's character while opening living spaces to the garden.",
    gallery: [
      "/images/projects/estate-1.jpg",
      "/images/projects/estate-2.jpg",
      "/images/projects/bath.jpg",
      "/images/services/renovations.jpg",
      "/images/projects/after-kitchen.jpg",
    ],
    beforeAfter: null,
    featured: true,
    publishedAt: new Date("2025-11-01"),
    seoTitle: "Coral Gables Estate Remodel",
    seoDescription:
      "1920s Coral Gables estate remodel with kitchen, primary suite, and garden-facing living spaces.",
  },
  {
    id: "demo-proj-mb-kitchen",
    slug: "miami-beach-penthouse-kitchen",
    title: "Miami Beach Penthouse Kitchen",
    type: "kitchen" as ProjectType,
    areaSlug: "miami-beach",
    summary: "Open-concept kitchen with Atlantic views and integrated appliances.",
    body: "Custom rift oak cabinetry, porcelain surfaces, and discreet lighting layers for entertaining.",
    gallery: [
      "/images/projects/kitchen.jpg",
      "/images/projects/after-kitchen.jpg",
      "/images/services/kitchens.jpg",
      "/images/projects/outdoor.jpg",
      "/images/projects/before-kitchen.jpg",
    ],
    beforeAfter: [
      {
        before: "/images/projects/before-kitchen.jpg",
        after: "/images/projects/after-kitchen.jpg",
        caption: "From dated galley to Atlantic-view entertaining kitchen.",
      },
    ],
    featured: true,
    publishedAt: new Date("2025-10-15"),
    seoTitle: "Miami Beach Penthouse Kitchen",
    seoDescription:
      "Open-concept Miami Beach penthouse kitchen remodel with custom cabinetry and integrated appliances.",
  },
  {
    id: "demo-proj-ftl",
    slug: "fort-lauderdale-outdoor-pavilion",
    title: "Fort Lauderdale Outdoor Pavilion",
    type: "outdoor" as ProjectType,
    areaSlug: "fort-lauderdale",
    summary: "Poolside summer kitchen and covered lounge engineered for year-round hosting.",
    body: "A covered pavilion with outdoor kitchen, lounge seating, drainage, and lighting designed for humid evenings.",
    gallery: [
      "/images/projects/outdoor.jpg",
      "/images/services/outdoor-living.jpg",
      "/images/areas/fort-lauderdale.jpg",
      "/images/cta-band.jpg",
    ],
    beforeAfter: null,
    featured: true,
    publishedAt: new Date("2025-09-20"),
    seoTitle: "Fort Lauderdale Outdoor Pavilion",
    seoDescription:
      "Poolside outdoor kitchen and pavilion in Fort Lauderdale built for South Florida weather.",
  },
  {
    id: "demo-proj-brickell-bath",
    slug: "brickell-spa-bath",
    title: "Brickell Spa Primary Bath",
    type: "bath" as ProjectType,
    areaSlug: "brickell",
    summary: "Steam-ready primary bath with stone, niche storage, and high-rise logistics.",
    body: "Full primary bath rebuild with waterproofing-first detailing, steam-ready wet area, custom vanity, and layered lighting.",
    gallery: [
      "/images/projects/bath.jpg",
      "/images/services/bathrooms.jpg",
      "/images/placeholders/gallery-3.jpg",
      "/images/areas/brickell.jpg",
    ],
    beforeAfter: null,
    featured: true,
    publishedAt: new Date("2025-08-12"),
    seoTitle: "Brickell Spa Primary Bath",
    seoDescription:
      "High-rise primary bathroom remodel in Brickell with steam shower and stone finishes.",
  },
].map((project) => ({
  ...project,
  createdAt: new Date("2026-01-01"),
  updatedAt: new Date("2026-01-01"),
}));

export const DEMO_TESTIMONIALS = [
  {
    name: "Patricia M. · Coral Gables",
    quote:
      "Norris rebuilt our kitchen and primary bath without the usual remodel nightmare. Updates every week. Finishes look expensive — because they are.",
  },
  {
    name: "Daniel R. · Miami Beach",
    quote:
      "From permitting to punch list, they owned the timeline. Our penthouse kitchen feels custom, not contractor-generic.",
  },
  {
    name: "Elena S. · Brickell",
    quote:
      "We compared three builders. Norris was the only team that asked how we actually live — then designed around that.",
  },
];

export const DEMO_POSTS = SEO_BLOG_POSTS.map((post, index) => ({
  id: `demo-post-${post.slug}`,
  title: post.title,
  slug: post.slug,
  cover: post.cover,
  body: post.body,
  status: "published" as const,
  seoTitle: post.seoTitle,
  seoDescription: post.seoDescription,
  publishedAt: new Date(Date.UTC(2026, 0, 15 - index)),
  createdAt: new Date("2026-01-01"),
  updatedAt: new Date("2026-01-01"),
}));
