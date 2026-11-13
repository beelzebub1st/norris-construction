import { PostStatus, PrismaClient, ProjectType } from "@prisma/client";

const prisma = new PrismaClient();

const PLACEHOLDER = "/images/placeholders/hero.jpg";

const services = [
  {
    slug: "custom-homes",
    title: "Custom Homes",
    sortOrder: 0,
    summary:
      "Ground-up luxury residences tailored to your lot, lifestyle, and South Florida climate.",
    body: "From concept through certificate of occupancy, Norris Construction coordinates architecture partners, engineering, and craftsmen to deliver custom homes across Miami-Dade and Broward.",
    faqs: [
      {
        q: "How long does a custom home take?",
        a: "Most projects run 12–18 months depending on scope and permitting.",
      },
    ],
  },
  {
    slug: "renovations",
    title: "Renovations",
    sortOrder: 1,
    summary: "Whole-home and selective remodels that respect your home's character.",
    body: "We modernize living spaces while managing occupied-home logistics, dust control, and phased schedules so your household can stay comfortable.",
    faqs: [],
  },
  {
    slug: "kitchens",
    title: "Kitchens",
    sortOrder: 2,
    summary: "Chef-ready kitchens with premium cabinetry, surfaces, and lighting.",
    body: "Layout optimization, appliance integration, and millwork details that make everyday cooking and entertaining effortless.",
    faqs: [],
  },
  {
    slug: "bathrooms",
    title: "Bathrooms",
    sortOrder: 3,
    summary: "Spa-level primary suites and guest baths built for humidity and longevity.",
    body: "Waterproofing, ventilation, and tile craftsmanship executed to Miami building standards.",
    faqs: [],
  },
  {
    slug: "additions",
    title: "Additions",
    sortOrder: 4,
    summary: "Room additions and second stories that blend with existing architecture.",
    body: "Structural engineering, matching finishes, and seamless tie-ins to your current footprint.",
    faqs: [],
  },
  {
    slug: "outdoor-living",
    title: "Outdoor Living",
    sortOrder: 5,
    summary: "Pools, summer kitchens, and terraces for year-round Florida living.",
    body: "Integrated outdoor environments with durable materials and thoughtful drainage.",
    faqs: [],
  },
] as const;

const areas = [
  {
    slug: "miami-beach",
    name: "Miami Beach",
    headline: "Coastal luxury construction on Miami Beach",
    body: "Condos, waterfront estates, and historic renovations with strict coastal code expertise.",
    nearbyServiceSlugs: ["renovations", "kitchens", "bathrooms"],
  },
  {
    slug: "coral-gables",
    name: "Coral Gables",
    headline: "Timeless builds in Coral Gables",
    body: "Mediterranean revival updates, additions, and custom homes in tree-lined neighborhoods.",
    nearbyServiceSlugs: ["custom-homes", "additions", "renovations"],
  },
  {
    slug: "brickell",
    name: "Brickell",
    headline: "High-rise ready craftsmanship in Brickell",
    body: "Penthouse renovations and premium finish work for urban professionals.",
    nearbyServiceSlugs: ["kitchens", "bathrooms", "renovations"],
  },
  {
    slug: "fort-lauderdale",
    name: "Fort Lauderdale",
    headline: "South Florida living from Fort Lauderdale",
    body: "Waterfront remodels and custom residences along the Intracoastal and Las Olas corridors.",
    nearbyServiceSlugs: ["custom-homes", "outdoor-living", "renovations"],
  },
] as const;

const projects = [
  {
    slug: "coral-gables-estate-remodel",
    title: "Coral Gables Estate Remodel",
    type: ProjectType.remodel,
    areaSlug: "coral-gables",
    summary: "Full interior refresh of a 1920s Gables estate with modern kitchen and primary suite.",
    body: "Structural reinforcement, new MEP, and period-appropriate millwork restored the home's character while opening living spaces to the garden.",
    gallery: [PLACEHOLDER, "/images/placeholders/gallery-2.jpg"],
    featured: true,
  },
  {
    slug: "miami-beach-penthouse-kitchen",
    title: "Miami Beach Penthouse Kitchen",
    type: ProjectType.kitchen,
    areaSlug: "miami-beach",
    summary: "Open-concept kitchen with Atlantic views and integrated appliances.",
    body: "Custom rift oak cabinetry, porcelain surfaces, and discreet lighting layers for entertaining.",
    gallery: [PLACEHOLDER, "/images/placeholders/gallery-3.jpg"],
    featured: true,
  },
] as const;

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    create: { id: "singleton" },
    update: {},
  });

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      create: {
        ...service,
        heroImage: PLACEHOLDER,
        relatedProjectIds: [],
      },
      update: {
        title: service.title,
        summary: service.summary,
        body: service.body,
        faqs: service.faqs,
        sortOrder: service.sortOrder,
        heroImage: PLACEHOLDER,
      },
    });
  }

  for (const area of areas) {
    await prisma.area.upsert({
      where: { slug: area.slug },
      create: area,
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
    const record = await prisma.project.upsert({
      where: { slug: project.slug },
      create: {
        ...project,
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
        publishedAt: new Date(),
      },
      select: { id: true, slug: true },
    });
    projectRecords.push(record);
  }

  const testimonialSeeds = [
    {
      name: "Patricia M.",
      quote:
        "Norris transformed our kitchen without disrupting family life. Communication was clear every week.",
      projectSlug: projectRecords[0]?.slug,
    },
    {
      name: "Daniel R.",
      quote:
        "The team handled permitting and finishes flawlessly. Our Gables home feels brand new.",
      projectSlug: projectRecords[1]?.slug,
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
          published: false,
        },
      });
    } else {
      await prisma.testimonial.create({
        data: {
          name: testimonial.name,
          quote: testimonial.quote,
          rating: 5,
          projectId: project?.id,
          published: false,
        },
      });
    }
  }

  await prisma.post.upsert({
    where: { slug: "planning-a-miami-kitchen-remodel" },
    create: {
      title: "Planning a Miami Kitchen Remodel",
      slug: "planning-a-miami-kitchen-remodel",
      cover: PLACEHOLDER,
      body: "South Florida kitchens need ventilation, durable finishes, and layouts that flow to outdoor space. Start with how you cook, entertain, and store—then align cabinetry and lighting to those routines.",
      status: PostStatus.published,
      publishedAt: new Date(),
      seoTitle: "Planning a Miami Kitchen Remodel | Norris Construction",
      seoDescription:
        "What to consider before starting a kitchen remodel in Miami, from layout to materials.",
    },
    update: {
      status: PostStatus.published,
      publishedAt: new Date(),
    },
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
