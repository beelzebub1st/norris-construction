import { AdminPageHeader } from "@/components/admin/admin-chrome";
import { AutomationsPanel } from "@/components/admin/AutomationsPanel";
import { getPrisma } from "@/lib/prisma";

export default async function AdminAutomationsPage() {
  const prisma = getPrisma();
  const [settings, recentEmails] = await Promise.all([
    prisma.siteSettings.upsert({
      where: { id: "singleton" },
      update: {},
      create: { id: "singleton" },
    }),
    prisma.emailLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
  ]);

  return (
    <div>
      <AdminPageHeader title="Automations" />
      <AutomationsPanel settings={settings} recentEmails={recentEmails} />
    </div>
  );
}
