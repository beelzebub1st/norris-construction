import { AdminPageHeader } from "@/components/admin/admin-chrome";
import { AreaForm } from "@/components/admin/AreaForm";
import { createArea } from "../actions";

export default function NewAreaPage() {
  return (
    <div>
      <AdminPageHeader title="New area" />
      <AreaForm action={createArea} submitLabel="Create area" />
    </div>
  );
}
