import Link from "next/link";
import { PostStatus } from "@prisma/client";
import {
  AdminEmpty,
  AdminPageHeader,
  AdminPanel,
  AdminPrimaryLink,
  AdminStatCard,
  AdminTable,
} from "@/components/admin/admin-chrome";
import { getPrisma } from "@/lib/prisma";
import { siteUrl } from "@/lib/seo/sitemap-paths";

type SeoRow = {
  kind: string;
  title: string;
  slug: string;
  editHref: string;
  publicHref: string;
  seoTitle: string | null;
  seoDescription: string | null;
  issues: string[];
};

function issuesFor(row: {
  seoTitle: string | null;
  seoDescription: string | null;
  coverMissing?: boolean;
}) {
  const issues: string[] = [];
  if (!row.seoTitle?.trim()) issues.push("Missing SEO title");
  else if (row.seoTitle.length > 60) issues.push("SEO title > 60 chars");
  if (!row.seoDescription?.trim()) issues.push("Missing SEO description");
  else if (row.seoDescription.length > 160)
    issues.push("SEO description > 160 chars");
  else if (row.seoDescription.length < 70)
    issues.push("SEO description short (<70)");
  if (row.coverMissing) issues.push("No cover/hero image");
  return issues;
}

export default async function AdminSeoPage() {
  const prisma = getPrisma();
  const base = siteUrl();

  const [services, projects, areas, posts] = await Promise.all([
    prisma.service.findMany({
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        title: true,
        slug: true,
        seoTitle: true,
        seoDescription: true,
        heroImage: true,
      },
    }),
    prisma.project.findMany({
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        seoTitle: true,
        seoDescription: true,
        gallery: true,
      },
    }),
    prisma.area.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
        seoTitle: true,
        seoDescription: true,
      },
    }),
    prisma.post.findMany({
      where: { status: PostStatus.published },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        seoTitle: true,
        seoDescription: true,
        cover: true,
      },
    }),
  ]);

  const rows: SeoRow[] = [
    ...services.map((row) => {
      const issues = issuesFor({
        seoTitle: row.seoTitle,
        seoDescription: row.seoDescription,
        coverMissing: !row.heroImage,
      });
      return {
        kind: "Service",
        title: row.title,
        slug: row.slug,
        editHref: `/admin/services/${row.id}/edit`,
        publicHref: `/services/${row.slug}`,
        seoTitle: row.seoTitle,
        seoDescription: row.seoDescription,
        issues,
      };
    }),
    ...projects.map((row) => {
      const issues = issuesFor({
        seoTitle: row.seoTitle,
        seoDescription: row.seoDescription,
        coverMissing: row.gallery.length === 0,
      });
      return {
        kind: "Project",
        title: row.title,
        slug: row.slug,
        editHref: `/admin/projects/${row.id}/edit`,
        publicHref: `/projects/${row.slug}`,
        seoTitle: row.seoTitle,
        seoDescription: row.seoDescription,
        issues,
      };
    }),
    ...areas.map((row) => {
      const issues = issuesFor({
        seoTitle: row.seoTitle,
        seoDescription: row.seoDescription,
      });
      return {
        kind: "Area",
        title: row.name,
        slug: row.slug,
        editHref: `/admin/areas/${row.id}/edit`,
        publicHref: `/areas/${row.slug}`,
        seoTitle: row.seoTitle,
        seoDescription: row.seoDescription,
        issues,
      };
    }),
    ...posts.map((row) => {
      const issues = issuesFor({
        seoTitle: row.seoTitle,
        seoDescription: row.seoDescription,
        coverMissing: !row.cover,
      });
      return {
        kind: "Blog",
        title: row.title,
        slug: row.slug,
        editHref: `/admin/blog/${row.id}/edit`,
        publicHref: `/blog/${row.slug}`,
        seoTitle: row.seoTitle,
        seoDescription: row.seoDescription,
        issues,
      };
    }),
  ];

  const flagged = rows.filter((row) => row.issues.length > 0);
  const healthy = rows.length - flagged.length;

  const checklist = [
    {
      label: "Sitemap",
      href: `${base}/sitemap.xml`,
      ok: true,
      detail: "Dynamic sitemap for services, projects, areas, blog",
    },
    {
      label: "Robots.txt",
      href: `${base}/robots.txt`,
      ok: true,
      detail: "Blocks /admin and /api; points to sitemap",
    },
    {
      label: "Web app manifest",
      href: `${base}/manifest.webmanifest`,
      ok: true,
      detail: "Name, theme color, icons",
    },
    {
      label: "Canonical + Open Graph",
      href: `${base}/`,
      ok: true,
      detail: "Per-page metadata helpers on marketing routes",
    },
    {
      label: "Structured data",
      href: `${base}/`,
      ok: true,
      detail: "LocalBusiness, FAQ, Service, Article, BreadcrumbList",
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="SEO health"
        description="Spot missing titles, thin descriptions, and uncovered pages before they hit Google."
        action={
          <AdminPrimaryLink href="/admin/blog/new">New SEO post</AdminPrimaryLink>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Pages audited" value={rows.length} />
        <AdminStatCard label="Healthy" value={healthy} />
        <AdminStatCard
          label="Needs attention"
          value={flagged.length}
          accent={flagged.length > 0}
        />
        <AdminStatCard
          label="Published posts"
          value={posts.length}
          href="/admin/blog"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <AdminPanel title="Technical checklist" className="xl:col-span-1">
          <ul className="space-y-3">
            {checklist.map((item) => (
              <li
                key={item.label}
                className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-zinc-200">{item.label}</p>
                  <span className="text-[11px] uppercase tracking-wide text-emerald-400">
                    Live
                  </span>
                </div>
                <p className="mt-1 text-xs text-zinc-500">{item.detail}</p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-xs text-[#E06820] hover:underline"
                >
                  Open
                </a>
              </li>
            ))}
          </ul>
        </AdminPanel>

        <AdminPanel
          title="Pages needing SEO work"
          className="xl:col-span-2"
          action={
            <span className="text-xs text-zinc-500">
              {flagged.length} flagged
            </span>
          }
        >
          {flagged.length === 0 ? (
            <AdminEmpty>All audited pages look solid. Nice work.</AdminEmpty>
          ) : (
            <AdminTable headers={["Type", "Page", "Issues", "Edit"]}>
              {flagged.map((row) => (
                <tr key={`${row.kind}-${row.slug}`} className="align-top text-zinc-300">
                  <td className="px-4 py-3 text-xs text-zinc-500">{row.kind}</td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-white">{row.title}</p>
                    <Link
                      href={row.publicHref}
                      target="_blank"
                      className="mt-0.5 block font-mono text-[11px] text-zinc-500 hover:text-[#E06820]"
                    >
                      {row.publicHref}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <ul className="space-y-1">
                      {row.issues.map((issue) => (
                        <li
                          key={issue}
                          className="text-xs text-amber-300/90"
                        >
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={row.editHref}
                      className="text-sm text-[#E06820] hover:underline"
                    >
                      Fix
                    </Link>
                  </td>
                </tr>
              ))}
            </AdminTable>
          )}
        </AdminPanel>
      </div>

      <AdminPanel title="Full inventory" className="mt-6">
        <AdminTable
          headers={["Type", "Title", "SEO title", "Description length", "Public"]}
        >
          {rows.map((row) => (
            <tr key={`${row.kind}-all-${row.slug}`} className="text-zinc-300">
              <td className="px-4 py-3 text-xs text-zinc-500">{row.kind}</td>
              <td className="px-4 py-3 text-sm text-white">{row.title}</td>
              <td className="max-w-xs truncate px-4 py-3 text-xs text-zinc-400">
                {row.seoTitle?.trim() || "—"}
              </td>
              <td className="px-4 py-3 text-xs tabular-nums text-zinc-400">
                {row.seoDescription?.trim()?.length ?? 0}
              </td>
              <td className="px-4 py-3">
                <Link
                  href={row.publicHref}
                  target="_blank"
                  className="text-xs text-[#E06820] hover:underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminPanel>
    </div>
  );
}
