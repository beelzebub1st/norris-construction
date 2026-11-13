import {
  AdminDeleteForm,
  AdminPageHeader,
  AdminPrimaryLink,
  AdminRowLink,
  AdminTable,
} from "@/components/admin/admin-chrome";
import { getPrisma } from "@/lib/prisma";
import { deleteService } from "./actions";

export default async function AdminServicesPage() {
  const services = await getPrisma().service.findMany({
    orderBy: { sortOrder: "asc" },
    select: { id: true, title: true, slug: true, sortOrder: true },
  });

  return (
    <div>
      <AdminPageHeader
        title="Services"
        action={<AdminPrimaryLink href="/admin/services/new">New service</AdminPrimaryLink>}
      />
      <AdminTable headers={["Title", "Slug", "Order", ""]}>
        {services.map((service) => (
          <tr key={service.id} className="text-zinc-300">
            <td className="px-4 py-3">
              <AdminRowLink href={`/admin/services/${service.id}/edit`}>
                {service.title}
              </AdminRowLink>
            </td>
            <td className="px-4 py-3 text-xs text-zinc-500">{service.slug}</td>
            <td className="px-4 py-3">{service.sortOrder}</td>
            <td className="px-4 py-3 text-right">
              <AdminDeleteForm
                action={deleteService.bind(null, service.id)}
                confirmMessage={`Delete service "${service.title}"?`}
              />
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
