import { PostStatus, PrismaClient } from "@prisma/client";
import {
  DEMO_AREAS,
  DEMO_PROJECTS,
  DEMO_SERVICES,
  DEMO_SETTINGS,
  DEMO_TESTIMONIALS,
} from "../lib/demo-data";
import { SEO_BLOG_POSTS } from "../lib/seo-blog-posts";

const prisma = new PrismaClient();

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    create: {
      id: "singleton",
      phone: DEMO_SETTINGS.phone,
      sms: DEMO_SETTINGS.sms,
      email: DEMO_SETTINGS.email,
      address: DEMO_SETTINGS.address,
      licenseText: DEMO_SETTINGS.licenseText,
      insuranceText: DEMO_SETTINGS.insuranceText,
      yearsInBusiness: DEMO_SETTINGS.yearsInBusiness,
      socials: DEMO_SETTINGS.socials,
      chatEmbedHtml: DEMO_SETTINGS.chatEmbedHtml,
      chatEnabled: DEMO_SETTINGS.chatEnabled,
      nurtureEnabled: DEMO_SETTINGS.nurtureEnabled,
    },
    update: {
      phone: DEMO_SETTINGS.phone,
      sms: DEMO_SETTINGS.sms,
      email: DEMO_SETTINGS.email,
      address: DEMO_SETTINGS.address,
      licenseText: DEMO_SETTINGS.licenseText,
      insuranceText: DEMO_SETTINGS.insuranceText,
      yearsInBusiness: DEMO_SETTINGS.yearsInBusiness,
      socials: DEMO_SETTINGS.socials,
      chatEmbedHtml: DEMO_SETTINGS.chatEmbedHtml,
      chatEnabled: DEMO_SETTINGS.chatEnabled,
      nurtureEnabled: DEMO_SETTINGS.nurtureEnabled,
    },
  });

  const commercialSlugs = DEMO_SERVICES.map((s) => s.slug);
  await prisma.service.deleteMany({
    where: { slug: { notIn: commercialSlugs } },
  });

  for (const service of DEMO_SERVICES) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      create: {
        slug: service.slug,
        title: service.title,
        summary: service.summary,
        body: service.body,
        faqs: service.faqs,
        sortOrder: service.sortOrder,
        heroImage: service.heroImage,
        relatedProjectIds: [],
        seoTitle: service.seoTitle,
        seoDescription: service.seoDescription,
      },
      update: {
        title: service.title,
        summary: service.summary,
        body: service.body,
        faqs: service.faqs,
        sortOrder: service.sortOrder,
        heroImage: service.heroImage,
        seoTitle: service.seoTitle,
        seoDescription: service.seoDescription,
      },
    });
  }

  const commercialAreaSlugs = DEMO_AREAS.map((a) => a.slug);
  await prisma.area.deleteMany({
    where: { slug: { notIn: commercialAreaSlugs } },
  });

  for (const area of DEMO_AREAS) {
    await prisma.area.upsert({
      where: { slug: area.slug },
      create: {
        slug: area.slug,
        name: area.name,
        headline: area.headline,
        body: area.body,
        nearbyServiceSlugs: area.nearbyServiceSlugs,
        seoTitle: area.seoTitle,
        seoDescription: area.seoDescription,
      },
      update: {
        name: area.name,
        headline: area.headline,
        body: area.body,
        nearbyServiceSlugs: area.nearbyServiceSlugs,
        seoTitle: area.seoTitle,
        seoDescription: area.seoDescription,
      },
    });
  }

  const commercialProjectSlugs = DEMO_PROJECTS.map((p) => p.slug);
  await prisma.project.deleteMany({
    where: { slug: { notIn: commercialProjectSlugs } },
  });

  const projectRecords: { id: string; slug: string }[] = [];
  for (const project of DEMO_PROJECTS) {
    const record = await prisma.project.upsert({
      where: { slug: project.slug },
      create: {
        slug: project.slug,
        title: project.title,
        type: project.type,
        areaSlug: project.areaSlug,
        summary: project.summary,
        body: project.body,
        gallery: project.gallery,
        beforeAfter: project.beforeAfter ?? undefined,
        featured: project.featured,
        seoTitle: project.seoTitle,
        seoDescription: project.seoDescription,
        publishedAt: project.publishedAt,
      },
      update: {
        title: project.title,
        type: project.type,
        areaSlug: project.areaSlug,
        summary: project.summary,
        body: project.body,
        gallery: project.gallery,
        beforeAfter: project.beforeAfter ?? undefined,
        featured: project.featured,
        seoTitle: project.seoTitle,
        seoDescription: project.seoDescription,
        publishedAt: project.publishedAt,
      },
      select: { id: true, slug: true },
    });
    projectRecords.push(record);
  }

  const bySlug = Object.fromEntries(projectRecords.map((p) => [p.slug, p.id]));
  const serviceProjectMap: Record<string, string[]> = {
    "commercial-renovations": [
      bySlug["broward-warehouse-interior"],
      bySlug["west-palm-white-box-turnover"],
    ].filter(Boolean),
    "office-buildouts": [bySlug["jupiter-corporate-office-buildout"]].filter(Boolean),
    "restaurant-renovations": [bySlug["fort-lauderdale-restaurant-bar"]].filter(Boolean),
    "retail-shopping": [bySlug["west-palm-white-box-turnover"]].filter(Boolean),
    "white-boxing": [bySlug["west-palm-white-box-turnover"]].filter(Boolean),
    "storage-warehouse": [
      bySlug["palm-beach-self-storage-renovation"],
      bySlug["broward-warehouse-interior"],
    ].filter(Boolean),
    "tenant-improvements": [
      bySlug["jupiter-corporate-office-buildout"],
      bySlug["coral-springs-medical-dental"],
    ].filter(Boolean),
    "property-management": [
      bySlug["west-palm-white-box-turnover"],
      bySlug["coral-springs-medical-dental"],
    ].filter(Boolean),
  };

  for (const [slug, ids] of Object.entries(serviceProjectMap)) {
    await prisma.service.update({
      where: { slug },
      data: { relatedProjectIds: ids },
    });
  }

  await prisma.testimonial.deleteMany({});
  for (const [index, testimonial] of DEMO_TESTIMONIALS.entries()) {
    const projectId = projectRecords[index % projectRecords.length]?.id;
    await prisma.testimonial.create({
      data: {
        name: testimonial.name,
        quote: testimonial.quote,
        rating: 5,
        projectId: projectId ?? null,
        published: true,
      },
    });
  }

  const commercialPostSlugs = SEO_BLOG_POSTS.map((p) => p.slug);
  await prisma.post.deleteMany({
    where: { slug: { notIn: commercialPostSlugs } },
  });

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

  await prisma.experiment.upsert({
    where: { key: "hero_headline" },
    create: {
      key: "hero_headline",
      active: false,
      variants: {
        a: "Commercial Construction & Renovations in South Florida",
        b: "Building Better Commercial Spaces Across South Florida",
      },
    },
    update: {
      active: false,
      variants: {
        a: "Commercial Construction & Renovations in South Florida",
        b: "Building Better Commercial Spaces Across South Florida",
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed complete (commercial content).");
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
