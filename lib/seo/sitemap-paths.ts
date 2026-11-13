export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  );
}

export type SitemapSlugs = {
  services: { slug: string }[];
  projects: { slug: string }[];
  areas: { slug: string }[];
  posts: { slug: string }[];
};

const STATIC_MARKETING_PATHS = [
  "/",
  "/about",
  "/contact",
  "/services",
  "/projects",
  "/blog",
] as const;

export function buildSitemapPaths(data: SitemapSlugs): string[] {
  return [
    ...STATIC_MARKETING_PATHS,
    ...data.services.map((row) => `/services/${row.slug}`),
    ...data.projects.map((row) => `/projects/${row.slug}`),
    ...data.areas.map((row) => `/areas/${row.slug}`),
    ...data.posts.map((row) => `/blog/${row.slug}`),
  ];
}
