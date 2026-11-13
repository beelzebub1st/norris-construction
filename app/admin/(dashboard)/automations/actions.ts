"use server";

import { redirect } from "next/navigation";
import { formCheckbox } from "@/lib/admin/form";
import { requireAdmin } from "@/lib/auth/session";
import { getPrisma } from "@/lib/prisma";

export async function saveNurtureAutomation(formData: FormData) {
  await requireAdmin();
  const nurtureEnabled = formCheckbox(formData, "nurtureEnabled");

  await getPrisma().siteSettings.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", nurtureEnabled },
    update: { nurtureEnabled },
  });

  redirect("/admin/automations");
}
