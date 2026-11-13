"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { formCheckbox, formString, parseJsonField } from "@/lib/admin/form";
import { requireAdmin } from "@/lib/auth/session";
import { getPrisma } from "@/lib/prisma";

export async function saveExperiment(formData: FormData) {
  await requireAdmin();
  const key = formString(formData, "key");
  if (!key) return;

  const active = formCheckbox(formData, "active");
  const variants = parseJsonField<Record<string, string>>(
    formString(formData, "variants"),
    {},
  );

  await getPrisma().experiment.upsert({
    where: { key },
    create: { key, active, variants },
    update: { active, variants },
  });

  revalidatePath("/");
  redirect("/admin/experiments");
}
