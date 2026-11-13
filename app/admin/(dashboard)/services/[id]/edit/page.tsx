import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-chrome";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { getPrisma } from "@/lib/prisma";
import { updateService } from "../../actions";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await getPrisma().service.findUnique({ where: { id } });
  if (!service) notFound();

  return (
    <div>
      <AdminPageHeader title={`Edit: ${service.title}`} />
      <ServiceForm action={updateService.bind(null, id)} service={service} />
    </div>
  );
}
