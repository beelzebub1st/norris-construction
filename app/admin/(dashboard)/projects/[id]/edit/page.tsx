import { notFound } from "next/navigation";
import { AdminPageHeader, AdminPrimaryLink } from "@/components/admin/admin-chrome";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { getPrisma } from "@/lib/prisma";
import { updateProject } from "../../actions";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const prisma = getPrisma();
  const [project, areas] = await Promise.all([
    prisma.project.findUnique({ where: { id } }),
    prisma.area.findMany({
      select: { name: true, slug: true },
      orderBy: { name: "asc" },
    }),
  ]);
  if (!project) notFound();

  const liveHref =
    project.publishedAt && project.publishedAt <= new Date()
      ? `/projects/${project.slug}`
      : null;

  return (
    <div>
      <AdminPageHeader
        title={`Edit: ${project.title}`}
        description={
          liveHref
            ? "This project is live on the public site."
            : "Not published yet — set a publish date or use Publish now."
        }
        action={
          liveHref ? (
            <AdminPrimaryLink href={liveHref}>View on site</AdminPrimaryLink>
          ) : undefined
        }
      />
      <ProjectForm
        action={updateProject.bind(null, id)}
        project={project}
        areas={areas}
      />
    </div>
  );
}
