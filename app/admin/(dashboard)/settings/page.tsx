import { AdminPageHeader } from "@/components/admin/admin-chrome";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { getPrisma } from "@/lib/prisma";
import { saveSiteSettings } from "./actions";

export default async function AdminSettingsPage() {
  const settings = await getPrisma().siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton" },
  });

  return (
    <div>
      <AdminPageHeader title="Site settings" />
      <SettingsForm action={saveSiteSettings} settings={settings} />
    </div>
  );
}
