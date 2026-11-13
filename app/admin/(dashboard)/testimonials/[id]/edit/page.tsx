import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-chrome";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { getPrisma } from "@/lib/prisma";
import { updateTestimonial } from "../../actions";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [testimonial, projects] = await Promise.all([
    getPrisma().testimonial.findUnique({ where: { id } }),
    getPrisma().project.findMany({
      orderBy: { title: "asc" },
      select: { id: true, title: true },
    }),
  ]);
  if (!testimonial) notFound();

  return (
    <div>
      <AdminPageHeader title={`Edit: ${testimonial.name}`} />
      <TestimonialForm
        action={updateTestimonial.bind(null, id)}
        testimonial={testimonial}
        projects={projects}
      />
    </div>
  );
}
