import { PostStatus, type ProjectType, type Prisma } from "@prisma/client";
import {
  DEMO_AREAS,
  DEMO_POSTS,
  DEMO_PROJECTS,
  DEMO_SERVICES,
} from "@/lib/demo-data";
import { hasDatabase } from "@/lib/has-database";
import { getPrisma } from "@/lib/prisma";

/** Projects visible on the marketing site (published, not scheduled for the future). */
export function publicProjectWhere(
  now: Date = new Date(),
): Pick<Prisma.ProjectWhereInput, "publishedAt"> {
  return {
    publishedAt: { not: null, lte: now },
  };
}

export function isProjectPubliclyVisible(
  publishedAt: Date | null | undefined,
  now: Date = new Date(),
): boolean {
  if (publishedAt == null) return false;
  return publishedAt.getTime() <= now.getTime();
}

export async function getServiceBySlug(slug: string) {
  "use cache";
  if (!hasDatabase()) {
    return DEMO_SERVICES.find((row) => row.slug === slug) ?? null;
  }
  return getPrisma().service.findUnique({ where: { slug } });
}

export async function getProjectBySlug(slug: string) {
  "use cache";
  if (!hasDatabase()) {
    return DEMO_PROJECTS.find((row) => row.slug === slug) ?? null;
  }
  return getPrisma().project.findFirst({
    where: { slug, ...publicProjectWhere() },
  });
}

export async function getAreaBySlug(slug: string) {
  "use cache";
  if (!hasDatabase()) {
    return DEMO_AREAS.find((row) => row.slug === slug) ?? null;
  }
  return getPrisma().area.findUnique({ where: { slug } });
}

export async function getPostBySlug(slug: string) {
  "use cache";
  if (!hasDatabase()) {
    return DEMO_POSTS.find((row) => row.slug === slug) ?? null;
  }
  return getPrisma().post.findFirst({
    where: { slug, status: PostStatus.published },
  });
}

export async function listServices() {
  "use cache";
  if (!hasDatabase()) {
    return DEMO_SERVICES.map(({ title, slug, summary }) => ({
      title,
      slug,
      summary,
    }));
  }
  return getPrisma().service.findMany({
    orderBy: { sortOrder: "asc" },
    select: { title: true, slug: true, summary: true },
  });
}

export async function listAreas() {
  "use cache";
  if (!hasDatabase()) {
    return DEMO_AREAS.map(({ name, slug, headline }) => ({
      name,
      slug,
      headline,
    }));
  }
  return getPrisma().area.findMany({
    orderBy: { name: "asc" },
    select: { name: true, slug: true, headline: true },
  });
}

export async function listPublishedPosts() {
  "use cache";
  if (!hasDatabase()) {
    return DEMO_POSTS.map(({ title, slug, cover, publishedAt }) => ({
      title,
      slug,
      cover,
      publishedAt,
    }));
  }
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
  if (!hasDatabase()) {
    return DEMO_PROJECTS.filter((project) => {
      if (filters.type && project.type !== filters.type) return false;
      if (filters.area && project.areaSlug !== filters.area) return false;
      return true;
    }).map(({ title, slug, summary, type, areaSlug, gallery }) => ({
      title,
      slug,
      summary,
      type,
      areaSlug,
      gallery,
    }));
  }

  const where: Prisma.ProjectWhereInput = {
    ...publicProjectWhere(),
  };

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
  if (!hasDatabase()) {
    return DEMO_SERVICES.filter((row) => slugs.includes(row.slug)).map(
      ({ title, slug, summary }) => ({ title, slug, summary }),
    );
  }
  return getPrisma().service.findMany({
    where: { slug: { in: slugs } },
    orderBy: { sortOrder: "asc" },
    select: { title: true, slug: true, summary: true },
  });
}

export async function getProjectsByIds(ids: string[]) {
  "use cache";
  if (ids.length === 0) return [];
  if (!hasDatabase()) {
    return DEMO_PROJECTS.filter((row) => ids.includes(row.id)).map(
      ({ title, slug, summary, gallery }) => ({
        title,
        slug,
        summary,
        gallery,
      }),
    );
  }
  return getPrisma().project.findMany({
    where: { id: { in: ids }, ...publicProjectWhere() },
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
