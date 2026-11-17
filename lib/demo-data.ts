import type { ProjectType } from "@prisma/client";
import { SEO_BLOG_POSTS } from "@/lib/seo-blog-posts";
import { SERVICE_EXTRAS } from "@/lib/service-extras";

const SERVICE_IMAGES: Record<string, string> = {
  "commercial-renovations": "/images/services/warehouse.jpg",
  "office-buildouts": "/images/services/office.jpg",
  "restaurant-renovations": "/images/services/restaurant.jpg",
  "retail-shopping": "/images/services/whitebox.jpg",
  "white-boxing": "/images/services/whitebox.jpg",
  "storage-warehouse": "/images/services/storage.jpg",
  "tenant-improvements": "/images/services/office.jpg",
  "property-management": "/images/services/medical-office.jpg",
};

export const DEMO_SETTINGS = {
  id: "singleton",
  phone: "(312) 483-6046",
  sms: "+13124836046",
  email: "Info@norrisconstruction.co",
  address: "2412 Stonybrook Drive, Wellington, FL",
  licenseText: "Commercial general contractor · We pull permits",
  insuranceText: "Bonded and insured",
  yearsInBusiness: "Commercial renovations across South Florida",
  socials: {},
  chatEmbedHtml: null as string | null,
  chatEnabled: false,
  nurtureEnabled: false,
};

export const DEMO_SERVICES = [
  {
    id: "demo-svc-commercial-renovations",
    slug: "commercial-renovations",
    title: "Commercial Renovations",
    sortOrder: 0,
    summary:
      "Full commercial interior renovations, reconfigurations, and facility upgrades for South Florida properties.",
    seoTitle: "Commercial Renovation Contractor South Florida",
    seoDescription:
      "Commercial renovations and build-outs across Palm Beach, Broward, and Martin Counties — interiors, TI, and facility upgrades.",
    heroImage: SERVICE_IMAGES["commercial-renovations"],
    relatedProjectIds: [] as string[],
  },
  {
    id: "demo-svc-office-buildouts",
    slug: "office-buildouts",
    title: "Office Build-Outs",
    sortOrder: 1,
    summary:
      "Corporate offices, medical suites, conference rooms, lobbies, and multi-tenant office improvements.",
    seoTitle: "Office Build-Out Contractor West Palm Beach",
    seoDescription:
      "Office renovations and professional suite build-outs for corporate, medical, and multi-tenant spaces in South Florida.",
    heroImage: SERVICE_IMAGES["office-buildouts"],
    relatedProjectIds: [] as string[],
  },
  {
    id: "demo-svc-restaurant-renovations",
    slug: "restaurant-renovations",
    title: "Restaurant Renovations",
    sortOrder: 2,
    summary:
      "Restaurant interiors, commercial kitchens, bars, cafés, and franchise hospitality build-outs.",
    seoTitle: "Restaurant Renovation Contractor Fort Lauderdale",
    seoDescription:
      "Restaurant and hospitality renovations — kitchens, dining rooms, bars, and franchise locations across South Florida.",
    heroImage: SERVICE_IMAGES["restaurant-renovations"],
    relatedProjectIds: [] as string[],
  },
  {
    id: "demo-svc-retail-shopping",
    slug: "retail-shopping",
    title: "Retail & Shopping Centers",
    sortOrder: 3,
    summary:
      "Retail storefronts, shopping center tenant improvements, showrooms, and plaza renovations.",
    seoTitle: "Retail Store Build-Out Contractor South Florida",
    seoDescription:
      "Retail and shopping center renovations, storefront build-outs, and tenant improvements in Palm Beach and Broward Counties.",
    heroImage: SERVICE_IMAGES["retail-shopping"],
    relatedProjectIds: [] as string[],
  },
  {
    id: "demo-svc-white-boxing",
    slug: "white-boxing",
    title: "White Boxing & Tenant Turnovers",
    sortOrder: 4,
    summary:
      "Lease-ready white-box conversions, vacant space prep, and landlord turnover renovations.",
    seoTitle: "White Box Commercial Construction Florida",
    seoDescription:
      "White-box conversions and commercial property turnover for landlords, leasing agents, and property managers in South Florida.",
    heroImage: SERVICE_IMAGES["white-boxing"],
    relatedProjectIds: [] as string[],
  },
  {
    id: "demo-svc-storage-warehouse",
    slug: "storage-warehouse",
    title: "Storage & Warehouse Renovations",
    sortOrder: 5,
    summary:
      "Self-storage facilities, warehouse interiors, industrial flooring, and light-industrial improvements.",
    seoTitle: "Self-Storage & Warehouse Renovation South Florida",
    seoDescription:
      "Self-storage, warehouse, and industrial facility renovations including epoxy floors, units, and office build-outs.",
    heroImage: SERVICE_IMAGES["storage-warehouse"],
    relatedProjectIds: [] as string[],
  },
  {
    id: "demo-svc-tenant-improvements",
    slug: "tenant-improvements",
    title: "Commercial Tenant Improvements",
    sortOrder: 6,
    summary:
      "TI packages for new and renewing tenants — partitions, finishes, MEP coordination, and punch-list delivery.",
    seoTitle: "Commercial Tenant Improvement Contractor",
    seoDescription:
      "Commercial tenant improvements for offices, retail, medical, and industrial spaces throughout South Florida.",
    heroImage: SERVICE_IMAGES["tenant-improvements"],
    relatedProjectIds: [] as string[],
  },
  {
    id: "demo-svc-property-management",
    slug: "property-management",
    title: "Property Management Renovations",
    sortOrder: 7,
    summary:
      "Capital improvements, common areas, restrooms, ADA upgrades, and portfolio turnovers for property managers.",
    seoTitle: "Commercial Property Management Renovations",
    seoDescription:
      "Capital improvement and turnover renovations for commercial property managers and landlords in Palm Beach, Broward, and Martin Counties.",
    heroImage: SERVICE_IMAGES["property-management"],
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
    id: "demo-area-jupiter",
    slug: "jupiter",
    name: "Jupiter",
    headline: "Commercial construction in Jupiter & northern Palm Beach",
    body: "Office build-outs, retail turnovers, restaurant renovations, and warehouse improvements for Jupiter, Palm Beach Gardens, and nearby commercial corridors. Norris supports landlords, franchise operators, and business owners with lease-ready interiors and efficient TI execution.",
    nearbyServiceSlugs: [
      "commercial-renovations",
      "office-buildouts",
      "white-boxing",
    ],
    seoTitle: "Commercial Build-Out Contractor Jupiter FL",
    seoDescription:
      "Commercial renovation and tenant improvement contractor serving Jupiter and Palm Beach County, Florida.",
  },
  {
    id: "demo-area-west-palm-beach",
    slug: "west-palm-beach",
    name: "West Palm Beach",
    headline: "Office and retail renovations in West Palm Beach",
    body: "From downtown professional suites to shopping plaza tenant spaces, we deliver commercial interior renovations, white-box conversions, and capital improvement projects for West Palm Beach property owners and managers.",
    nearbyServiceSlugs: [
      "office-buildouts",
      "tenant-improvements",
      "retail-shopping",
    ],
    seoTitle: "Office Renovation Contractor West Palm Beach",
    seoDescription:
      "Commercial office renovations, TI, and retail build-outs in West Palm Beach and Palm Beach County.",
  },
  {
    id: "demo-area-fort-lauderdale",
    slug: "fort-lauderdale",
    name: "Fort Lauderdale",
    headline: "Restaurant, retail & office renovations in Fort Lauderdale",
    body: "Hospitality interiors, storefront renovations, and commercial facility upgrades across Fort Lauderdale, Pompano Beach, Deerfield Beach, and greater Broward. Built for operators who need clear schedules and dependable closeout.",
    nearbyServiceSlugs: [
      "restaurant-renovations",
      "retail-shopping",
      "commercial-renovations",
    ],
    seoTitle: "Restaurant Renovation Contractor Fort Lauderdale",
    seoDescription:
      "Commercial restaurant, retail, and office renovation contractor serving Fort Lauderdale and Broward County.",
  },
  {
    id: "demo-area-coral-springs",
    slug: "coral-springs",
    name: "Coral Springs",
    headline: "Medical, office & plaza renovations in Coral Springs",
    body: "Medical and dental suites, multi-tenant offices, and shopping center improvements for Coral Springs, Coconut Creek, and northwest Broward. Practical commercial construction tailored to leasing timelines.",
    nearbyServiceSlugs: [
      "office-buildouts",
      "property-management",
      "white-boxing",
    ],
    seoTitle: "Commercial Renovation Coral Springs FL",
    seoDescription:
      "Medical office build-outs, commercial renovations, and tenant turnovers in Coral Springs and Broward County.",
  },
  {
    id: "demo-area-boca-raton",
    slug: "boca-raton",
    name: "Boca Raton",
    headline: "Commercial property renovations in Boca Raton",
    body: "Office modernization, retail build-outs, and landlord white-boxing for Boca Raton, Delray Beach, and Boynton Beach commercial properties. Focused on quality workmanship and efficient project execution.",
    nearbyServiceSlugs: [
      "tenant-improvements",
      "white-boxing",
      "commercial-renovations",
    ],
    seoTitle: "Commercial Property Renovation Boca Raton",
    seoDescription:
      "Commercial renovation and tenant improvement contractor serving Boca Raton and southern Palm Beach County.",
  },
  {
    id: "demo-area-stuart",
    slug: "stuart",
    name: "Stuart",
    headline: "Commercial renovations across Martin County",
    body: "Serving Stuart, Hobe Sound, Palm City, and Jensen Beach with commercial interior renovations, storage and warehouse work, and property turnover construction for owners and managers north of Jupiter.",
    nearbyServiceSlugs: [
      "storage-warehouse",
      "commercial-renovations",
      "property-management",
    ],
    seoTitle: "Commercial Construction Martin County FL",
    seoDescription:
      "Commercial renovations and facility improvements in Stuart and Martin County, Florida.",
  },
].map((area) => ({
  ...area,
  createdAt: new Date("2026-01-01"),
  updatedAt: new Date("2026-01-01"),
}));

export const DEMO_PROJECTS = [
  {
    id: "demo-proj-whitebox",
    slug: "west-palm-white-box-turnover",
    title: "West Palm Beach White-Box Turnover",
    type: "outdoor" as ProjectType,
    areaSlug: "west-palm-beach",
    summary:
      "Vacant retail suite demolished and returned to lease-ready white-box condition for a new tenant.",
    body: "Complete removal of prior tenant improvements, partition demolition, drywall repair, neutral paint, lighting prep, and concrete floor preparation — delivered on a leasing timeline for the property manager.",
    gallery: [
      "/images/projects/whitebox.jpg",
      "/images/services/whitebox.jpg",
      "/images/projects/warehouse.jpg",
      "/images/cta-band.jpg",
    ],
    beforeAfter: [
      {
        before: "/images/projects/before-kitchen.jpg",
        after: "/images/projects/after-kitchen.jpg",
        caption: "From vacated tenant space to lease-ready white box.",
      },
    ],
    featured: true,
    publishedAt: new Date("2025-11-01"),
    seoTitle: "West Palm Beach White-Box Commercial Turnover",
    seoDescription:
      "White-box commercial conversion and landlord turnover in West Palm Beach, Florida.",
  },
  {
    id: "demo-proj-office",
    slug: "jupiter-corporate-office-buildout",
    title: "Jupiter Corporate Office Build-Out",
    type: "custom_home" as ProjectType,
    areaSlug: "jupiter",
    summary:
      "Open-plan office with glass conference rooms, reception, and modern finishes for a professional suite.",
    body: "Metal stud framing, glass partitions, acoustical ceilings, LVP flooring, LED lighting, and finish carpentry for a multi-room commercial office build-out in northern Palm Beach County.",
    gallery: [
      "/images/projects/office.jpg",
      "/images/services/office.jpg",
      "/images/projects/medical-office.jpg",
      "/images/areas/west-palm-beach.jpg",
    ],
    beforeAfter: null,
    featured: true,
    publishedAt: new Date("2025-10-15"),
    seoTitle: "Jupiter FL Office Build-Out",
    seoDescription:
      "Corporate office build-out and interior renovation in Jupiter, Florida.",
  },
  {
    id: "demo-proj-restaurant",
    slug: "fort-lauderdale-restaurant-bar",
    title: "Fort Lauderdale Restaurant & Bar Renovation",
    type: "kitchen" as ProjectType,
    areaSlug: "fort-lauderdale",
    summary:
      "Full hospitality interior with custom bar, dining seating, and specialty lighting.",
    body: "Interior demolition, millwork, stone countertops, flooring, and finish packages for a restaurant and bar renovation designed for high-traffic hospitality use in Broward County.",
    gallery: [
      "/images/projects/restaurant.jpg",
      "/images/services/restaurant.jpg",
      "/images/areas/fort-lauderdale.jpg",
      "/images/projects/office.jpg",
    ],
    beforeAfter: null,
    featured: true,
    publishedAt: new Date("2025-09-20"),
    seoTitle: "Fort Lauderdale Restaurant Renovation",
    seoDescription:
      "Restaurant and bar commercial renovation in Fort Lauderdale, Florida.",
  },
  {
    id: "demo-proj-medical",
    slug: "coral-springs-medical-dental",
    title: "Coral Springs Medical & Dental Suite",
    type: "bath" as ProjectType,
    areaSlug: "coral-springs",
    summary:
      "Reception, waiting area, and clinical suite finishes for a medical and dental practice.",
    body: "Professional suite build-out including reception desk millwork, seating areas, corridor finishes, lighting, and code-conscious interiors for a medical and dental office.",
    gallery: [
      "/images/projects/medical-office.jpg",
      "/images/services/medical-office.jpg",
      "/images/areas/coral-springs.jpg",
      "/images/projects/office.jpg",
    ],
    beforeAfter: null,
    featured: true,
    publishedAt: new Date("2025-08-12"),
    seoTitle: "Coral Springs Medical Office Build-Out",
    seoDescription:
      "Medical and dental office commercial build-out in Coral Springs, Florida.",
  },
  {
    id: "demo-proj-storage",
    slug: "palm-beach-self-storage-renovation",
    title: "Palm Beach Self-Storage Renovation",
    type: "addition" as ProjectType,
    areaSlug: "jupiter",
    summary:
      "Self-storage corridor upgrades with unit doors, epoxy flooring, and commercial lighting.",
    body: "Storage unit corridor modernization including metal roll-up doors, epoxy flake flooring, LED lighting, and life-safety detailing for a self-storage facility.",
    gallery: [
      "/images/projects/storage.jpg",
      "/images/services/storage.jpg",
      "/images/projects/warehouse.jpg",
      "/images/areas/jupiter.jpg",
    ],
    beforeAfter: null,
    featured: true,
    publishedAt: new Date("2025-07-08"),
    seoTitle: "Self-Storage Facility Renovation South Florida",
    seoDescription:
      "Self-storage facility renovation with epoxy flooring and unit upgrades in Palm Beach County.",
  },
  {
    id: "demo-proj-warehouse",
    slug: "broward-warehouse-interior",
    title: "Broward Warehouse Interior Renovation",
    type: "remodel" as ProjectType,
    areaSlug: "fort-lauderdale",
    summary:
      "Large-scale warehouse interior prepared for distribution and light-industrial use.",
    body: "Warehouse interior improvements including polished concrete readiness, lighting, loading-area coordination, and broom-clean facility modernization for industrial tenants.",
    gallery: [
      "/images/projects/warehouse.jpg",
      "/images/cta-band.jpg",
      "/images/services/warehouse.jpg",
      "/images/projects/whitebox.jpg",
    ],
    beforeAfter: null,
    featured: true,
    publishedAt: new Date("2025-06-01"),
    seoTitle: "Warehouse Renovation South Florida",
    seoDescription:
      "Warehouse and industrial facility interior renovation in Broward County, Florida.",
  },
].map((project) => ({
  ...project,
  createdAt: new Date("2026-01-01"),
  updatedAt: new Date("2026-01-01"),
}));

export const DEMO_TESTIMONIALS = [
  {
    name: "Marcus T. · Property Manager, West Palm Beach",
    quote:
      "Norris turned a vacated retail suite into a clean white box on schedule. Leasing could show the space immediately — no punch-list drama.",
  },
  {
    name: "Dana L. · Restaurant Operator, Fort Lauderdale",
    quote:
      "Our bar and dining renovation stayed coordinated from demo through final finishes. Clear updates, practical solutions, and a space ready for service.",
  },
  {
    name: "James R. · Commercial Landlord, Jupiter",
    quote:
      "We use Norris for tenant turnovers and office TI across our Palm Beach portfolio. Dependable execution and communication our tenants appreciate.",
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
