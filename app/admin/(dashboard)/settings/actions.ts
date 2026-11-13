"use server";

import { redirect } from "next/navigation";
import {
  formCheckbox,
  formOptionalString,
  formString,
  parseJsonField,
} from "@/lib/admin/form";
import { revalidatePublicContent } from "@/lib/admin/revalidate";
import { requireAdmin } from "@/lib/auth/session";
import { getPrisma } from "@/lib/prisma";

export async function saveSiteSettings(formData: FormData) {
  await requireAdmin();
  const data = {
    phone: formString(formData, "phone"),
    sms: formString(formData, "sms"),
    email: formString(formData, "email"),
    address: formString(formData, "address"),
    licenseText: formString(formData, "licenseText"),
    insuranceText: formString(formData, "insuranceText"),
    yearsInBusiness: formString(formData, "yearsInBusiness"),
    socials: parseJsonField(formString(formData, "socials"), {}),
    chatEmbedHtml: formOptionalString(formData, "chatEmbedHtml"),
    chatEnabled: formCheckbox(formData, "chatEnabled"),
    nurtureEnabled: formCheckbox(formData, "nurtureEnabled"),
  };

  await getPrisma().siteSettings.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", ...data },
    update: data,
  });
  await revalidatePublicContent();
  redirect("/admin/settings");
}
