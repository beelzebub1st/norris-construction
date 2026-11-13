import {
  AdminDeleteForm,
  AdminPageHeader,
  AdminPrimaryLink,
  AdminRowLink,
  AdminTable,
} from "@/components/admin/admin-chrome";
import { getPrisma } from "@/lib/prisma";
import { deleteArea } from "./actions";

export default async function AdminAreasPage() {
  const areas = await getPrisma().area.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, slug: true },
  });

  return (
    <div>
      <AdminPageHeader
        title="Areas"
        action={<AdminPrimaryLink href="/admin/areas/new">New area</AdminPrimaryLink>}
      />
      <AdminTable headers={["Name", "Slug", ""]}>
        {areas.map((area) => (
          <tr key={area.id} className="text-zinc-300">
            <td className="px-4 py-3">
              <AdminRowLink href={`/admin/areas/${area.id}/edit`}>{area.name}</AdminRowLink>
            </td>
            <td className="px-4 py-3 text-xs text-zinc-500">{area.slug}</td>
            <td className="px-4 py-3 text-right">
              <AdminDeleteForm
                action={deleteArea.bind(null, area.id)}
                confirmMessage={`Delete area "${area.name}"?`}
              />
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
