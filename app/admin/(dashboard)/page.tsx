import Link from "next/link";
import { LeadStatus, PostStatus } from "@prisma/client";
import { AdminPageHeader } from "@/components/admin/admin-chrome";
import { getPrisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const prisma = getPrisma();
  const [newLeads, projectCount, draftPosts, publishedPosts] = await Promise.all([
    prisma.lead.count({ where: { status: LeadStatus.new } }),
    prisma.project.count(),
    prisma.post.count({ where: { status: PostStatus.draft } }),
    prisma.post.count({ where: { status: PostStatus.published } }),
  ]);

  const stats = [
    { label: "New leads", value: newLeads, href: "/admin/leads" },
    { label: "Projects", value: projectCount, href: "/admin/projects" },
    { label: "Draft posts", value: draftPosts, href: "/admin/blog" },
    { label: "Published posts", value: publishedPosts, href: "/admin/blog" },
  ];

  return (
    <div>
      <AdminPageHeader title="Dashboard" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5 transition hover:border-zinc-700"
          >
            <p className="text-xs uppercase tracking-wide text-zinc-500">{stat.label}</p>
            <p className="mt-2 font-display text-3xl text-white">{stat.value}</p>
          </Link>
        ))}
      </div>
      <p className="mt-8 max-w-xl text-sm text-zinc-400">
        Manage content from the sidebar: projects, services, areas, blog, testimonials, and site
        settings.
      </p>
    </div>
  );
}
