import type { MetadataRoute } from "next";
import { PostStatus } from "@prisma/client";
import { publicProjectWhere } from "@/lib/content";
import {
  DEMO_AREAS,
  DEMO_POSTS,
  DEMO_PROJECTS,
  DEMO_SERVICES,
} from "@/lib/demo-data";
import { hasDatabase } from "@/lib/has-database";
import { getPrisma } from "@/lib/prisma";
import { buildSitemapPaths, siteUrl } from "@/lib/seo/sitemap-paths";

function priorityFor(path: string): number {
  if (path === "/") return 1;
  if (path === "/contact" || path === "/services" || path === "/projects")
    return 0.9;
  if (path.startsWith("/services/") || path.startsWith("/projects/")) return 0.85;
  if (path.startsWith("/areas/") || path.startsWith("/blog/")) return 0.8;
  if (path === "/about" || path === "/blog") return 0.75;
  return 0.6;
}

function changeFreqFor(
  path: string,
): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (path === "/" || path === "/blog") return "weekly";
  if (path.startsWith("/blog/")) return "monthly";
  return "monthly";
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();

  const [services, projects, areas, posts] = hasDatabase()
    ? await Promise.all([
        getPrisma().service.findMany({
          select: { slug: true, updatedAt: true },
        }),
        getPrisma().project.findMany({
          where: publicProjectWhere(),
          select: { slug: true, updatedAt: true },
        }),
        getPrisma().area.findMany({
          select: { slug: true, updatedAt: true },
        }),
        getPrisma().post.findMany({
          where: { status: PostStatus.published },
          select: { slug: true, updatedAt: true },
        }),
      ])
    : [
        DEMO_SERVICES.map(({ slug, updatedAt }) => ({ slug, updatedAt })),
        DEMO_PROJECTS.map(({ slug, updatedAt }) => ({ slug, updatedAt })),
        DEMO_AREAS.map(({ slug, updatedAt }) => ({ slug, updatedAt })),
        DEMO_POSTS.map(({ slug, updatedAt }) => ({ slug, updatedAt })),
      ];

  const latestByPath = new Map<string, Date>();
  for (const row of services) {
    latestByPath.set(`/services/${row.slug}`, row.updatedAt);
  }
  for (const row of projects) {
    latestByPath.set(`/projects/${row.slug}`, row.updatedAt);
  }
  for (const row of areas) {
    latestByPath.set(`/areas/${row.slug}`, row.updatedAt);
  }
  for (const row of posts) {
    latestByPath.set(`/blog/${row.slug}`, row.updatedAt);
  }

  const paths = buildSitemapPaths({ services, projects, areas, posts });
  const now = new Date();

  return paths.map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified: latestByPath.get(path) ?? now,
    changeFrequency: changeFreqFor(path),
    priority: priorityFor(path),
  }));
}
