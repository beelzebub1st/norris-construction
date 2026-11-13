import { AdminPageHeader } from "@/components/admin/admin-chrome";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { createProject } from "../actions";

export default function NewProjectPage() {
  return (
    <div>
      <AdminPageHeader title="New project" />
      <ProjectForm action={createProject} submitLabel="Create project" />
    </div>
  );
}
