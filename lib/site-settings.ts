import { getPrisma } from "@/lib/prisma";

export function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function telHref(phone: string) {
  const d = digitsOnly(phone);
  return `tel:+${d.startsWith("1") ? d : `1${d}`}`;
}

export function smsHref(sms: string) {
  const d = digitsOnly(sms);
  return `sms:+${d.startsWith("1") ? d : `1${d}`}`;
}

export async function getSiteSettings() {
  "use cache";
  const prisma = getPrisma();
  return prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton" },
  });
}
