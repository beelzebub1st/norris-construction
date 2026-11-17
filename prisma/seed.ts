import { PostStatus, PrismaClient, ProjectType } from "@prisma/client";
import { SERVICE_EXTRAS } from "../lib/service-extras";
import { SEO_BLOG_POSTS } from "../lib/seo-blog-posts";

const prisma = new PrismaClient();

const PLACEHOLDER = "/images/hero.jpg";
const SERVICE_IMAGES: Record<string, string> = {
  "custom-homes": "/images/services/custom-homes.jpg",
  renovations: "/images/services/renovations.jpg",
  kitchens: "/images/services/kitchens.jpg",
  bathrooms: "/images/services/bathrooms.jpg",
  additions: "/images/services/additions.jpg",
  "outdoor-living": "/images/services/outdoor-living.jpg",
};

const services = [
  {
    slug: "custom-homes",
    title: "Custom Homes",
    sortOrder: 0,
    summary:
      "Ground-up luxury residences tailored to your lot, lifestyle, and South Florida climate.",
    seoTitle: "Custom Homes in Miami & South Florida",
    seoDescription:
      "Luxury custom home builders in Miami-Dade and Broward — architecture coordination, permitting, and craft-led finishes.",
  },
  {
    slug: "renovations",
    title: "Renovations",
    sortOrder: 1,
    summary: "Whole-home and selective remodels that respect your home's character.",
    seoTitle: "Home Renovations in Miami",
    seoDescription:
      "Occupied-home renovations with clear phasing, dust control, and premium finishes across South Florida.",
  },
  {
    slug: "kitchens",
    title: "Kitchens",
    sortOrder: 2,
    summary: "Chef-ready kitchens with premium cabinetry, surfaces, and lighting.",
    seoTitle: "Kitchen Remodeling Miami",
    seoDescription:
      "Luxury kitchen remodels in Miami — layout, cabinetry, surfaces, and lighting built for humidity and entertaining.",
  },
  {
    slug: "bathrooms",
    title: "Bathrooms",
    sortOrder: 3,
    summary: "Spa-level primary suites and guest baths built for humidity and longevity.",
    seoTitle: "Bathroom Remodeling Miami",
    seoDescription:
      "Primary and guest bath remodels with waterproofing, ventilation, and spa-level finishes.",
  },
  {
    slug: "additions",
    title: "Additions",
    sortOrder: 4,
    summary: "Room additions and second stories that blend with existing architecture.",
    seoTitle: "Home Additions Miami",
    seoDescription:
      "Seamless home additions and second stories with structural engineering and matching finishes.",
  },
  {
    slug: "outdoor-living",
    title: "Outdoor Living",
    sortOrder: 5,
    summary: "Pools, summer kitchens, and terraces for year-round Florida living.",
    seoTitle: "Outdoor Living & Summer Kitchens",
    seoDescription:
      "Outdoor kitchens, pavilions, and lounges engineered for South Florida sun and storms.",
  },
] as const;

const areas = [
  {
    slug: "miami-beach",
    name: "Miami Beach",
    headline: "Coastal luxury construction on Miami Beach",
    body: "Condos, waterfront estates, and historic renovations with strict coastal code expertise. From penthouse kitchens to full-home refreshes, we navigate building rules, freight logistics, and salt-air materials so the finish lasts.",
    nearbyServiceSlugs: ["renovations", "kitchens", "bathrooms"],
  },
  {
    slug: "coral-gables",
    name: "Coral Gables",
    headline: "Timeless builds in Coral Gables",
    body: "Mediterranean revival updates, additions, and custom homes in tree-lined neighborhoods. We respect historic character while upgrading systems, kitchens, and outdoor rooms for modern living.",
    nearbyServiceSlugs: ["custom-homes", "additions", "renovations"],
  },
  {
    slug: "brickell",
    name: "Brickell",
    headline: "High-rise ready craftsmanship in Brickell",
    body: "Penthouse renovations and premium finish work for urban professionals. Quiet logistics, waterproofing that never fails, and finishes that feel residential — not hotel-generic.",
    nearbyServiceSlugs: ["kitchens", "bathrooms", "renovations"],
  },
  {
    slug: "fort-lauderdale",
    name: "Fort Lauderdale",
    headline: "South Florida living from Fort Lauderdale",
    body: "Waterfront remodels and custom residences along the Intracoastal and Las Olas corridors. Outdoor living, kitchens, and whole-home renovations built for year-round entertaining.",
    nearbyServiceSlugs: ["custom-homes", "outdoor-living", "renovations"],
  },
] as const;

const projects = [
  {
    slug: "coral-gables-estate-remodel",
    title: "Coral Gables Estate Remodel",
    type: ProjectType.remodel,
    areaSlug: "coral-gables",
    summary:
      "Full interior refresh of a 1920s Gables estate with modern kitchen and primary suite.",
    body: "Structural reinforcement, new MEP, and period-appropriate millwork restored the home's character while opening living spaces to the garden. The kitchen became an entertaining hub; the primary suite a quiet spa. Dust control and phased schedules kept the household functional throughout.",
    gallery: [
      "/images/projects/estate-1.jpg",
      "/images/projects/estate-2.jpg",
      "/images/projects/bath.jpg",
      "/images/services/renovations.jpg",
      "/images/projects/after-kitchen.jpg",
    ],
    featured: true,
    seoTitle: "Coral Gables Estate Remodel",
    seoDescription:
      "1920s Coral Gables estate remodel with kitchen, primary suite, and garden-facing living spaces.",
  },
  {
    slug: "miami-beach-penthouse-kitchen",
    title: "Miami Beach Penthouse Kitchen",
    type: ProjectType.kitchen,
    areaSlug: "miami-beach",
    summary: "Open-concept kitchen with Atlantic views and integrated appliances.",
    body: "Custom rift oak cabinetry, porcelain surfaces, and discreet lighting layers for entertaining. High-rise logistics, building coordination, and salt-air durable finishes delivered a chef-ready showpiece with Atlantic sightlines.",
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
    seoTitle: "Miami Beach Penthouse Kitchen",
    seoDescription:
      "Open-concept Miami Beach penthouse kitchen remodel with custom cabinetry and integrated appliances.",
  },
  {
    slug: "fort-lauderdale-outdoor-pavilion",
    title: "Fort Lauderdale Outdoor Pavilion",
    type: ProjectType.outdoor,
    areaSlug: "fort-lauderdale",
    summary: "Poolside summer kitchen and covered lounge engineered for year-round hosting.",
    body: "A covered pavilion with outdoor kitchen, lounge seating, drainage, and lighting designed for humid evenings. Weather-rated finishes and pool-deck tie-ins make the backyard feel like a true additional room.",
    gallery: [
      "/images/projects/outdoor.jpg",
      "/images/services/outdoor-living.jpg",
      "/images/areas/fort-lauderdale.jpg",
      "/images/cta-band.jpg",
    ],
    featured: true,
    seoTitle: "Fort Lauderdale Outdoor Pavilion",
    seoDescription:
      "Poolside outdoor kitchen and pavilion in Fort Lauderdale built for South Florida weather.",
  },
  {
    slug: "brickell-spa-bath",
    title: "Brickell Spa Primary Bath",
    type: ProjectType.bath,
    areaSlug: "brickell",
    summary: "Steam-ready primary bath with stone, niche storage, and high-rise logistics.",
    body: "Full primary bath rebuild with waterproofing-first detailing, steam-ready wet area, custom vanity, and layered lighting. Sequenced so the home retained a functioning bath during construction.",
    gallery: [
      "/images/projects/bath.jpg",
      "/images/services/bathrooms.jpg",
      "/images/placeholders/gallery-3.jpg",
      "/images/areas/brickell.jpg",
    ],
    featured: false,
    seoTitle: "Brickell Spa Primary Bath",
    seoDescription:
      "High-rise primary bathroom remodel in Brickell with steam shower and stone finishes.",
  },
] as const;

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    create: {
      id: "singleton",
      phone: "(312) 483-6046",
      sms: "+13124836046",
      email: "Info@norrisconstruction.co",
      address: "2412 Stonybrook Drive, Wellington, FL",
      licenseText: "Commercial general contractor · We pull permits",
      insuranceText: "Bonded and insured",
      yearsInBusiness: "Commercial renovations across South Florida",
    },
    update: {
      phone: "(312) 483-6046",
      sms: "+13124836046",
      email: "Info@norrisconstruction.co",
      address: "2412 Stonybrook Drive, Wellington, FL",
      licenseText: "Commercial general contractor · We pull permits",
      insuranceText: "Bonded and insured",
      yearsInBusiness: "Commercial renovations across South Florida",
    },
  });

  for (const service of services) {
    const extra = SERVICE_EXTRAS[service.slug];
    const body = extra
      ? extra.paragraphs.join("\n\n")
      : service.summary;
    const faqs = extra?.faqs ?? [];

    await prisma.service.upsert({
      where: { slug: service.slug },
      create: {
        slug: service.slug,
        title: service.title,
        summary: service.summary,
        body,
        faqs: [...faqs],
        sortOrder: service.sortOrder,
        heroImage: SERVICE_IMAGES[service.slug] ?? PLACEHOLDER,
        relatedProjectIds: [],
        seoTitle: service.seoTitle,
        seoDescription: service.seoDescription,
      },
      update: {
        title: service.title,
        summary: service.summary,
        body,
        faqs: [...faqs],
        sortOrder: service.sortOrder,
        heroImage: SERVICE_IMAGES[service.slug] ?? PLACEHOLDER,
        seoTitle: service.seoTitle,
        seoDescription: service.seoDescription,
      },
    });
  }

  for (const area of areas) {
    await prisma.area.upsert({
      where: { slug: area.slug },
      create: {
        ...area,
        nearbyServiceSlugs: [...area.nearbyServiceSlugs],
      },
      update: {
        name: area.name,
        headline: area.headline,
        body: area.body,
        nearbyServiceSlugs: [...area.nearbyServiceSlugs],
      },
    });
  }

  const projectRecords: { id: string; slug: string }[] = [];
  for (const project of projects) {
    const { beforeAfter, ...rest } = project as typeof project & {
      beforeAfter?: unknown;
    };
    const record = await prisma.project.upsert({
      where: { slug: project.slug },
      create: {
        ...rest,
        gallery: [...project.gallery],
        beforeAfter: beforeAfter ?? undefined,
        publishedAt: new Date(),
      },
      update: {
        title: project.title,
        summary: project.summary,
        body: project.body,
        gallery: [...project.gallery],
        featured: project.featured,
        type: project.type,
        areaSlug: project.areaSlug,
        beforeAfter: beforeAfter ?? undefined,
        seoTitle: project.seoTitle,
        seoDescription: project.seoDescription,
        publishedAt: new Date(),
      },
      select: { id: true, slug: true },
    });
    projectRecords.push(record);
  }

  const bySlug = Object.fromEntries(projectRecords.map((p) => [p.slug, p.id]));
  const serviceProjectMap: Record<string, string[]> = {
    "custom-homes": [bySlug["coral-gables-estate-remodel"]].filter(Boolean),
    renovations: [
      bySlug["coral-gables-estate-remodel"],
      bySlug["miami-beach-penthouse-kitchen"],
    ].filter(Boolean),
    kitchens: [bySlug["miami-beach-penthouse-kitchen"]].filter(Boolean),
    bathrooms: [bySlug["brickell-spa-bath"], bySlug["coral-gables-estate-remodel"]].filter(
      Boolean,
    ),
    additions: [bySlug["coral-gables-estate-remodel"]].filter(Boolean),
    "outdoor-living": [bySlug["fort-lauderdale-outdoor-pavilion"]].filter(Boolean),
  };

  for (const [slug, ids] of Object.entries(serviceProjectMap)) {
    await prisma.service.update({
      where: { slug },
      data: { relatedProjectIds: ids },
    });
  }

  const testimonialSeeds = [
    {
      name: "Patricia M.",
      quote:
        "Norris transformed our kitchen without disrupting family life. Communication was clear every week.",
      projectSlug: "miami-beach-penthouse-kitchen",
    },
    {
      name: "Daniel R.",
      quote:
        "The team handled permitting and finishes flawlessly. Our Gables home feels brand new.",
      projectSlug: "coral-gables-estate-remodel",
    },
    {
      name: "Elena S.",
      quote:
        "We compared three builders. Norris was the only team that asked how we actually live — then designed around that.",
      projectSlug: "brickell-spa-bath",
    },
  ];

  for (const testimonial of testimonialSeeds) {
    const project = projectRecords.find((p) => p.slug === testimonial.projectSlug);
    const existing = await prisma.testimonial.findFirst({
      where: { name: testimonial.name, quote: testimonial.quote },
    });
    if (existing) {
      await prisma.testimonial.update({
        where: { id: existing.id },
        data: {
          projectId: project?.id ?? null,
          published: true,
        },
      });
    } else {
      await prisma.testimonial.create({
        data: {
          name: testimonial.name,
          quote: testimonial.quote,
          rating: 5,
          projectId: project?.id,
          published: true,
        },
      });
    }
  }

  for (const [index, post] of SEO_BLOG_POSTS.entries()) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      create: {
        ...post,
        status: PostStatus.published,
        publishedAt: new Date(Date.now() - index * 86_400_000 * 3),
      },
      update: {
        title: post.title,
        cover: post.cover,
        body: post.body,
        status: PostStatus.published,
        publishedAt: new Date(Date.now() - index * 86_400_000 * 3),
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
      },
    });
  }

  // Keep thin legacy stubs out of the public index / sitemap
  await prisma.post.updateMany({
    where: {
      slug: {
        in: [
          "planning-a-miami-kitchen-remodel",
          "miami-primary-bath-remodel",
          "south-florida-outdoor-living",
        ],
      },
    },
    data: { status: PostStatus.draft },
  });

  await prisma.experiment.upsert({
    where: { key: "hero_headline" },
    create: {
      key: "hero_headline",
      active: false,
      variants: {
        a: "Miami luxury homes & remodeling, built with precision",
        b: "Custom craftsmanship for South Florida's finest residences",
      },
    },
    update: {
      active: false,
      variants: {
        a: "Miami luxury homes & remodeling, built with precision",
        b: "Custom craftsmanship for South Florida's finest residences",
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
