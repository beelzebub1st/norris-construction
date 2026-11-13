import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-chrome";
import { AreaForm } from "@/components/admin/AreaForm";
import { getPrisma } from "@/lib/prisma";
import { updateArea } from "../../actions";

export default async function EditAreaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const area = await getPrisma().area.findUnique({ where: { id } });
  if (!area) notFound();

  return (
    <div>
      <AdminPageHeader title={`Edit: ${area.name}`} />
      <AreaForm action={updateArea.bind(null, id)} area={area} />
    </div>
  );
}
