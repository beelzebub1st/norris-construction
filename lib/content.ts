import { PostStatus, type ProjectType, type Prisma } from "@prisma/client";
import { getPrisma } from "@/lib/prisma";

export async function getServiceBySlug(slug: string) {
  "use cache";
  return getPrisma().service.findUnique({ where: { slug } });
}

export async function getProjectBySlug(slug: string) {
  "use cache";
  return getPrisma().project.findUnique({ where: { slug } });
}

export async function getAreaBySlug(slug: string) {
  "use cache";
  return getPrisma().area.findUnique({ where: { slug } });
}

export async function getPostBySlug(slug: string) {
  "use cache";
  return getPrisma().post.findFirst({
    where: { slug, status: PostStatus.published },
  });
}

export async function listServices() {
  "use cache";
  return getPrisma().service.findMany({
    orderBy: { sortOrder: "asc" },
    select: { title: true, slug: true, summary: true },
  });
}

export async function listAreas() {
  "use cache";
  return getPrisma().area.findMany({
    orderBy: { name: "asc" },
    select: { name: true, slug: true, headline: true },
  });
}

export async function listPublishedPosts() {
  "use cache";
  return getPrisma().post.findMany({
    where: { status: PostStatus.published },
    orderBy: { publishedAt: "desc" },
    select: { title: true, slug: true, cover: true, publishedAt: true },
  });
}

export type ProjectListFilters = {
  type?: string;
  area?: string;
};

export async function listProjects(filters: ProjectListFilters = {}) {
  "use cache";
  const where: Prisma.ProjectWhereInput = {};

  if (filters.type) {
    where.type = filters.type as ProjectType;
  }
  if (filters.area) {
    where.areaSlug = filters.area;
  }

  return getPrisma().project.findMany({
    where,
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
    select: {
      title: true,
      slug: true,
      summary: true,
      type: true,
      areaSlug: true,
      gallery: true,
    },
  });
}

export async function getServicesBySlugs(slugs: string[]) {
  "use cache";
  if (slugs.length === 0) return [];
  return getPrisma().service.findMany({
    where: { slug: { in: slugs } },
    orderBy: { sortOrder: "asc" },
    select: { title: true, slug: true, summary: true },
  });
}

export async function getProjectsByIds(ids: string[]) {
  "use cache";
  if (ids.length === 0) return [];
  return getPrisma().project.findMany({
    where: { id: { in: ids } },
    select: {
      title: true,
      slug: true,
      summary: true,
      gallery: true,
    },
  });
}

export type ServiceFaq = { q: string; a: string };

export function parseServiceFaqs(faqs: unknown): ServiceFaq[] {
  if (!Array.isArray(faqs)) return [];
  return faqs.filter(
    (item): item is ServiceFaq =>
      typeof item === "object" &&
      item !== null &&
      "q" in item &&
      "a" in item &&
      typeof (item as ServiceFaq).q === "string" &&
      typeof (item as ServiceFaq).a === "string",
  );
}

export type BeforeAfterPair = {
  before: string;
  after: string;
  caption?: string;
};

export function parseBeforeAfter(value: unknown): BeforeAfterPair[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is BeforeAfterPair => {
    if (typeof item !== "object" || item === null) return false;
    const pair = item as BeforeAfterPair;
    return typeof pair.before === "string" && typeof pair.after === "string";
  });
}
