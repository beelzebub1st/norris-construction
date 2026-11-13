import {
  AdminDeleteForm,
  AdminPageHeader,
  AdminPrimaryLink,
  AdminRowLink,
  AdminTable,
} from "@/components/admin/admin-chrome";
import { getPrisma } from "@/lib/prisma";
import { deleteTestimonial } from "./actions";

export default async function AdminTestimonialsPage() {
  const testimonials = await getPrisma().testimonial.findMany({
    orderBy: { updatedAt: "desc" },
    include: { project: { select: { title: true } } },
  });

  return (
    <div>
      <AdminPageHeader
        title="Testimonials"
        action={
          <AdminPrimaryLink href="/admin/testimonials/new">New testimonial</AdminPrimaryLink>
        }
      />
      <AdminTable headers={["Name", "Project", "Rating", "Published", ""]}>
        {testimonials.map((row) => (
          <tr key={row.id} className="text-zinc-300">
            <td className="px-4 py-3">
              <AdminRowLink href={`/admin/testimonials/${row.id}/edit`}>{row.name}</AdminRowLink>
            </td>
            <td className="px-4 py-3 text-xs text-zinc-500">{row.project?.title ?? "—"}</td>
            <td className="px-4 py-3">{row.rating}</td>
            <td className="px-4 py-3">{row.published ? "Yes" : "—"}</td>
            <td className="px-4 py-3 text-right">
              <AdminDeleteForm
                action={deleteTestimonial.bind(null, row.id)}
                confirmMessage={`Delete testimonial from "${row.name}"?`}
              />
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
