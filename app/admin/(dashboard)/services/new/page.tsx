import { AdminPageHeader } from "@/components/admin/admin-chrome";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { createService } from "../actions";

export default function NewServicePage() {
  return (
    <div>
      <AdminPageHeader title="New service" />
      <ServiceForm action={createService} submitLabel="Create service" />
    </div>
  );
}
