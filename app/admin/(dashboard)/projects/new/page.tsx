import { AdminPageHeader } from "@/components/admin/admin-chrome";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { getPrisma } from "@/lib/prisma";
import { createProject } from "../actions";

export default async function NewProjectPage() {
  const areas = await getPrisma().area.findMany({
    select: { name: true, slug: true },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <AdminPageHeader
        title="New project"
        description="Create a commercial case study with photos. Publish when ready to show on the site."
      />
      <ProjectForm action={createProject} areas={areas} submitLabel="Create project" />
    </div>
  );
}
