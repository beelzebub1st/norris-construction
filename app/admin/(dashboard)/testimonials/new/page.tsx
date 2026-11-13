import { AdminPageHeader } from "@/components/admin/admin-chrome";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { getPrisma } from "@/lib/prisma";
import { createTestimonial } from "../actions";

export default async function NewTestimonialPage() {
  const projects = await getPrisma().project.findMany({
    orderBy: { title: "asc" },
    select: { id: true, title: true },
  });

  return (
    <div>
      <AdminPageHeader title="New testimonial" />
      <TestimonialForm action={createTestimonial} projects={projects} submitLabel="Create" />
    </div>
  );
}
