import Link from "next/link";
import { connection } from "next/server";
import { EmailStatus, LeadStatus, PostStatus } from "@prisma/client";
import {
  AdminEmpty,
  AdminPageHeader,
  AdminPanel,
  AdminPrimaryLink,
  AdminRowLink,
  AdminStatCard,
  AdminTable,
} from "@/components/admin/admin-chrome";
import { LEAD_STATUS_LABELS } from "@/lib/leads/status-labels";
import { PROJECT_TYPE_LABELS } from "@/lib/project-labels";
import { getPrisma } from "@/lib/prisma";

const PIPELINE_ORDER: LeadStatus[] = [
  LeadStatus.new,
  LeadStatus.contacted,
  LeadStatus.qualified,
  LeadStatus.quoted,
  LeadStatus.won,
  LeadStatus.lost,
];

function startOfDaysAgo(days: number) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - days);
  return d;
}

export default async function AdminDashboardPage() {
  await connection();
  const prisma = getPrisma();
  const since7 = startOfDaysAgo(7);
  const since30 = startOfDaysAgo(30);

  const [
    newLeads,
    leads7,
    leads30,
    won30,
    projectCount,
    publishedProjects,
    draftPosts,
    publishedPosts,
    serviceCount,
    areaCount,
    testimonialCount,
    emailSent7,
    emailFailed7,
    views7,
    submissions7,
    recentLeads,
    topPaths,
    leadStatusGroups,
    missingSeoServices,
    missingSeoProjects,
    missingSeoPosts,
  ] = await Promise.all([
    prisma.lead.count({ where: { status: LeadStatus.new } }),
    prisma.lead.count({ where: { createdAt: { gte: since7 } } }),
    prisma.lead.count({ where: { createdAt: { gte: since30 } } }),
    prisma.lead.count({
      where: { status: LeadStatus.won, updatedAt: { gte: since30 } },
    }),
    prisma.project.count(),
    prisma.project.count({ where: { publishedAt: { not: null } } }),
    prisma.post.count({ where: { status: PostStatus.draft } }),
    prisma.post.count({ where: { status: PostStatus.published } }),
    prisma.service.count(),
    prisma.area.count(),
    prisma.testimonial.count({ where: { published: true } }),
    prisma.emailLog.count({
      where: { createdAt: { gte: since7 }, status: EmailStatus.sent },
    }),
    prisma.emailLog.count({
      where: { createdAt: { gte: since7 }, status: EmailStatus.failed },
    }),
    prisma.visitorEvent.count({ where: { createdAt: { gte: since7 } } }),
    prisma.submission.count({ where: { createdAt: { gte: since7 } } }),
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      select: {
        id: true,
        name: true,
        projectType: true,
        status: true,
        area: true,
        createdAt: true,
      },
    }),
    prisma.visitorEvent.groupBy({
      by: ["path"],
      where: { createdAt: { gte: since7 } },
      _count: { path: true },
      orderBy: { _count: { path: "desc" } },
      take: 6,
    }),
    prisma.lead.groupBy({
      by: ["status"],
      _count: { status: true },
    }),
    prisma.service.count({
      where: {
        OR: [{ seoTitle: null }, { seoTitle: "" }, { seoDescription: null }, { seoDescription: "" }],
      },
    }),
    prisma.project.count({
      where: {
        OR: [{ seoTitle: null }, { seoTitle: "" }, { seoDescription: null }, { seoDescription: "" }],
      },
    }),
    prisma.post.count({
      where: {
        status: PostStatus.published,
        OR: [{ seoTitle: null }, { seoTitle: "" }, { seoDescription: null }, { seoDescription: "" }],
      },
    }),
  ]);

  const statusCounts = Object.fromEntries(
    leadStatusGroups.map((row) => [row.status, row._count.status]),
  ) as Partial<Record<LeadStatus, number>>;
  const pipelineTotal = PIPELINE_ORDER.reduce(
    (sum, status) => sum + (statusCounts[status] ?? 0),
    0,
  );
  const seoGaps = missingSeoServices + missingSeoProjects + missingSeoPosts;

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="Lead pipeline, content coverage, and site activity at a glance."
        action={<AdminPrimaryLink href="/admin/leads?status=new">Review new leads</AdminPrimaryLink>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          label="New leads"
          value={newLeads}
          href="/admin/leads?status=new"
          hint="Awaiting first contact"
          accent={newLeads > 0}
        />
        <AdminStatCard
          label="Leads · 7 days"
          value={leads7}
          href="/admin/leads"
          hint={`${leads30} in last 30 days`}
        />
        <AdminStatCard
          label="Page views · 7 days"
          value={views7}
          href="/admin/visitors"
          hint={`${submissions7} form submissions`}
        />
        <AdminStatCard
          label="Won · 30 days"
          value={won30}
          href="/admin/leads?status=won"
          hint={`${emailSent7} emails sent · ${emailFailed7} failed`}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <AdminPanel title="Lead pipeline" className="xl:col-span-2">
          <div className="space-y-3">
            {PIPELINE_ORDER.map((status) => {
              const count = statusCounts[status] ?? 0;
              const pct = pipelineTotal ? Math.round((count / pipelineTotal) * 100) : 0;
              return (
                <Link
                  key={status}
                  href={`/admin/leads?status=${status}`}
                  className="group block"
                >
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-zinc-300 group-hover:text-white">
                      {LEAD_STATUS_LABELS[status]}
                    </span>
                    <span className="tabular-nums text-zinc-500">{count}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#E06820]/80 to-[#E06820]"
                      style={{ width: `${Math.max(pct, count > 0 ? 4 : 0)}%` }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </AdminPanel>

        <AdminPanel title="Quick actions">
          <div className="grid gap-2">
            {[
              { href: "/admin/projects/new", label: "Add project" },
              { href: "/admin/blog/new", label: "Write blog post" },
              { href: "/admin/services/new", label: "Add service" },
              { href: "/admin/testimonials/new", label: "Add testimonial" },
              { href: "/admin/seo", label: "Open SEO health" },
              { href: "/admin/settings", label: "Site settings" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-white/10 px-3 py-2.5 text-sm text-zinc-300 transition hover:border-[#E06820]/40 hover:bg-[#E06820]/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </AdminPanel>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <AdminPanel
          title="Recent leads"
          action={
            <Link href="/admin/leads" className="text-xs text-[#E06820] hover:underline">
              View all
            </Link>
          }
        >
          {recentLeads.length === 0 ? (
            <AdminEmpty>No leads yet — quiz and contact form will land here.</AdminEmpty>
          ) : (
            <AdminTable headers={["Name", "Type", "Status", "When"]}>
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="text-zinc-300">
                  <td className="px-4 py-3">
                    <AdminRowLink href={`/admin/leads/${lead.id}`}>
                      {lead.name}
                    </AdminRowLink>
                    {lead.area ? (
                      <span className="mt-0.5 block text-[11px] text-zinc-500">
                        {lead.area}
                      </span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-xs text-zinc-400">
                    {lead.projectType
                      ? PROJECT_TYPE_LABELS[lead.projectType]
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {LEAD_STATUS_LABELS[lead.status]}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-zinc-500">
                    {lead.createdAt.toLocaleString()}
                  </td>
                </tr>
              ))}
            </AdminTable>
          )}
        </AdminPanel>

        <AdminPanel
          title="Top pages · 7 days"
          action={
            <Link href="/admin/visitors" className="text-xs text-[#E06820] hover:underline">
              Visitor log
            </Link>
          }
        >
          {topPaths.length === 0 ? (
            <AdminEmpty>No page views recorded yet.</AdminEmpty>
          ) : (
            <ul className="space-y-2">
              {topPaths.map((row) => (
                <li
                  key={row.path}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5"
                >
                  <span className="truncate font-mono text-xs text-zinc-300">
                    {row.path}
                  </span>
                  <span className="shrink-0 tabular-nums text-sm text-[#E06820]">
                    {row._count.path}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </AdminPanel>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard
          label="Published projects"
          value={`${publishedProjects}/${projectCount}`}
          href="/admin/projects"
        />
        <AdminStatCard
          label="Blog posts"
          value={`${publishedPosts} live`}
          href="/admin/blog"
          hint={`${draftPosts} drafts`}
        />
        <AdminStatCard
          label="Services · areas"
          value={`${serviceCount} · ${areaCount}`}
          href="/admin/services"
          hint={`${testimonialCount} published testimonials`}
        />
        <AdminStatCard
          label="SEO gaps"
          value={seoGaps}
          href="/admin/seo"
          hint="Missing title or description"
          accent={seoGaps > 0}
        />
      </div>
    </div>
  );
}
