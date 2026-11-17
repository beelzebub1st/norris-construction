import { PostStatus } from "@prisma/client";
import { publicProjectWhere } from "@/lib/content";
import {
  DEMO_AREAS,
  DEMO_POSTS,
  DEMO_PROJECTS,
  DEMO_SERVICES,
  DEMO_SETTINGS,
  DEMO_TESTIMONIALS,
} from "@/lib/demo-data";
import {
  headlineForExperiment,
  resolveExperiment,
} from "@/lib/experiments/resolve";
import { hasDatabase } from "@/lib/has-database";
import { PROJECT_TYPE_LABELS } from "@/lib/project-labels";
import { getPrisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/site-settings";

export const DEFAULT_HEADLINE =
  "Commercial Construction & Renovations in South Florida";

export async function getHomepageData(visitorId?: string | null) {
  "use cache";

  if (!hasDatabase()) {
    const areaNameBySlug = Object.fromEntries(
      DEMO_AREAS.map((area) => [area.slug, area.name]),
    );
    const featuredProjects = DEMO_PROJECTS.filter((p) => p.featured).map(
      (project) => ({
        title: project.title,
        slug: project.slug,
        summary: project.summary,
        image: project.gallery[0] ?? "/images/hero.jpg",
        area:
          areaNameBySlug[project.areaSlug] ??
          project.areaSlug.replace(/-/g, " "),
        typeLabel: PROJECT_TYPE_LABELS[project.type] ?? null,
      }),
    );

    return {
      settings: DEMO_SETTINGS,
      headline: DEFAULT_HEADLINE,
      services: DEMO_SERVICES.map(
        ({ title, slug, summary, heroImage }) => ({
          title,
          slug,
          summary,
          heroImage,
        }),
      ),
      featuredProjects,
      testimonials: DEMO_TESTIMONIALS,
      areas: DEMO_AREAS.map(({ name, slug, headline }) => ({
        name,
        slug,
        headline,
      })),
      posts: DEMO_POSTS.slice(0, 6).map((post) => ({
        title: post.title,
        slug: post.slug,
        cover: post.cover,
        excerpt: post.seoDescription,
      })),
    };
  }

  const prisma = getPrisma();

  const [
    settings,
    services,
    projects,
    testimonials,
    areas,
    posts,
    experiment,
  ] = await Promise.all([
    getSiteSettings(),
    prisma.service.findMany({
      orderBy: { sortOrder: "asc" },
      select: { title: true, slug: true, summary: true, heroImage: true },
    }),
    prisma.project.findMany({
      where: { featured: true, ...publicProjectWhere() },
      orderBy: { publishedAt: "desc" },
      take: 6,
      select: {
        title: true,
        slug: true,
        summary: true,
        gallery: true,
        areaSlug: true,
        type: true,
      },
    }),
    prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 6,
      select: { name: true, quote: true },
    }),
    prisma.area.findMany({
      orderBy: { name: "asc" },
      select: { name: true, slug: true, headline: true },
    }),
    prisma.post.findMany({
      where: { status: PostStatus.published },
      orderBy: { publishedAt: "desc" },
      take: 6,
      select: {
        title: true,
        slug: true,
        cover: true,
        seoDescription: true,
      },
    }),
    prisma.experiment.findUnique({ where: { key: "hero_headline" } }),
  ]);

  const areaNameBySlug = Object.fromEntries(
    areas.map((area) => [area.slug, area.name]),
  );

  const featuredProjects = projects.map((project) => ({
    title: project.title,
    slug: project.slug,
    summary: project.summary,
    image: project.gallery[0] ?? "/images/hero.jpg",
    area: areaNameBySlug[project.areaSlug] ?? project.areaSlug.replace(/-/g, " "),
    typeLabel: PROJECT_TYPE_LABELS[project.type] ?? null,
  }));

  const variantKey =
    visitorId != null && visitorId !== ""
      ? resolveExperiment("hero_headline", visitorId, experiment)
      : null;
  const headline = headlineForExperiment(experiment, variantKey, DEFAULT_HEADLINE);

  const postTeasers = posts.map((post) => ({
    title: post.title,
    slug: post.slug,
    cover: post.cover,
    excerpt: post.seoDescription,
  }));

  return {
    settings,
    headline,
    services,
    featuredProjects,
    testimonials,
    areas,
    posts: postTeasers,
  };
}
