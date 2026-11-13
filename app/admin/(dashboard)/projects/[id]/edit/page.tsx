import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-chrome";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { getPrisma } from "@/lib/prisma";
import { updateProject } from "../../actions";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getPrisma().project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <div>
      <AdminPageHeader title={`Edit: ${project.title}`} />
      <ProjectForm action={updateProject.bind(null, id)} project={project} />
    </div>
  );
}
