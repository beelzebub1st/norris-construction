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
        action={<AdminPrimaryLink href="/admin/projects/new">New project</AdminPrimaryLink>}
      />
      <AdminTable headers={["Title", "Type", "Area", "Featured", "Published", ""]}>
        {projects.map((project) => (
          <tr key={project.id} className="text-zinc-300">
            <td className="px-4 py-3">
              <AdminRowLink href={`/admin/projects/${project.id}/edit`}>
                {project.title}
              </AdminRowLink>
              <p className="text-xs text-zinc-500">{project.slug}</p>
            </td>
            <td className="px-4 py-3">{PROJECT_TYPE_LABELS[project.type]}</td>
            <td className="px-4 py-3">{project.areaSlug}</td>
            <td className="px-4 py-3">{project.featured ? "Yes" : "—"}</td>
            <td className="px-4 py-3 text-xs text-zinc-500">
              {project.publishedAt?.toLocaleDateString() ?? "—"}
            </td>
            <td className="px-4 py-3 text-right">
              <AdminDeleteForm
                action={deleteProject.bind(null, project.id)}
                confirmMessage={`Delete project "${project.title}"?`}
              />
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
