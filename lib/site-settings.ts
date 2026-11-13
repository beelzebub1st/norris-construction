import { DEMO_SETTINGS } from "@/lib/demo-data";
import { hasDatabase } from "@/lib/has-database";
import { getPrisma } from "@/lib/prisma";

export { digitsOnly, telHref, smsHref } from "@/lib/phone-links";

export async function getSiteSettings() {
  "use cache";
  if (!hasDatabase()) {
    return DEMO_SETTINGS;
  }
  const prisma = getPrisma();
  return prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton" },
  });
}
