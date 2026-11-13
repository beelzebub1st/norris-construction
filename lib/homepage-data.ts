import { getPrisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/site-settings";
import { PostStatus } from "@prisma/client";

export const DEFAULT_HEADLINE =
  "Miami luxury builds & remodels, done right.";

function resolveHeroHeadline(
  experiment: { active: boolean; variants: unknown } | null,
): string {
  if (!experiment?.active) return DEFAULT_HEADLINE;
  const variants = experiment.variants as Record<string, string> | null;
  return variants?.a ?? DEFAULT_HEADLINE;
}

export async function getHomepageData() {
  "use cache";

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
      select: { title: true, slug: true, summary: true },
    }),
    prisma.project.findMany({
      where: { featured: true },
      orderBy: { publishedAt: "desc" },
      take: 4,
      select: { title: true, slug: true, summary: true, gallery: true },
    }),
    prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 4,
      select: { name: true, quote: true },
    }),
    prisma.area.findMany({
      orderBy: { name: "asc" },
      select: { name: true, slug: true, headline: true },
    }),
    prisma.post.findMany({
      where: { status: PostStatus.published },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: { title: true, slug: true, cover: true },
    }),
    prisma.experiment.findUnique({ where: { key: "hero_headline" } }),
  ]);

  const featuredProjects = projects.map((project) => ({
    title: project.title,
    slug: project.slug,
    summary: project.summary,
    image: project.gallery[0] ?? "/images/placeholders/hero.jpg",
  }));

  return {
    settings,
    headline: resolveHeroHeadline(experiment),
    services,
    featuredProjects,
    testimonials,
    areas,
    posts,
  };
}
