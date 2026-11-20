import {
  AdminDeleteForm,
  AdminPageHeader,
  AdminPrimaryLink,
  AdminRowLink,
  AdminTable,
} from "@/components/admin/admin-chrome";
import { PROJECT_TYPE_LABELS } from "@/lib/project-labels";
import { getPrisma } from "@/lib/prisma";
import { deleteProject } from "./actions";

export default async function AdminProjectsPage() {
  const projects = await getPrisma().project.findMany({
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      type: true,
      areaSlug: true,
      featured: true,
      publishedAt: true,
    },
  });

  return (
    <div>
      <AdminPageHeader
        title="Projects"
        description="Commercial case studies shown on the live site. Upload photos when you create or edit a project."
        action={<AdminPrimaryLink href="/admin/projects/new">New project</AdminPrimaryLink>}
      />
      <AdminTable headers={["Title", "Type", "Area", "Status", "Featured", ""]}>
        {projects.map((project) => {
          const isLive =
            project.publishedAt != null && project.publishedAt <= new Date();
          return (
            <tr key={project.id} className="text-zinc-300">
              <td className="px-4 py-3">
                <AdminRowLink href={`/admin/projects/${project.id}/edit`}>
                  {project.title}
                </AdminRowLink>
                <p className="text-xs text-zinc-500">{project.slug}</p>
              </td>
              <td className="px-4 py-3">{PROJECT_TYPE_LABELS[project.type]}</td>
              <td className="px-4 py-3">{project.areaSlug}</td>
              <td className="px-4 py-3">
                {isLive ? (
                  <span className="inline-flex rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-400">
                    Live
                  </span>
                ) : (
                  <span className="inline-flex rounded-full bg-zinc-500/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                    Draft
                  </span>
                )}
              </td>
              <td className="px-4 py-3">{project.featured ? "Yes" : "—"}</td>
              <td className="px-4 py-3 text-right">
                <AdminDeleteForm
                  action={deleteProject.bind(null, project.id)}
                  confirmMessage={`Delete project "${project.title}"?`}
                />
              </td>
            </tr>
          );
        })}
      </AdminTable>
    </div>
  );
}
