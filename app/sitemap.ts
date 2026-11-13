import type { MetadataRoute } from "next";
import { PostStatus } from "@prisma/client";
import { publicProjectWhere } from "@/lib/content";
import { getPrisma } from "@/lib/prisma";
import { buildSitemapPaths, siteUrl } from "@/lib/seo/sitemap-paths";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const prisma = getPrisma();

  const [services, projects, areas, posts] = await Promise.all([
    prisma.service.findMany({
      select: { slug: true, updatedAt: true },
    }),
    prisma.project.findMany({
      where: publicProjectWhere(),
      select: { slug: true, updatedAt: true },
    }),
    prisma.area.findMany({
      select: { slug: true, updatedAt: true },
    }),
    prisma.post.findMany({
      where: { status: PostStatus.published },
      select: { slug: true, updatedAt: true },
    }),
  ]);

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
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
