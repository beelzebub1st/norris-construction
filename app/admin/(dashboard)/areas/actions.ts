"use server";

import { redirect } from "next/navigation";
import {
  commaSeparatedToArray,
  formOptionalString,
  formString,
} from "@/lib/admin/form";
import { revalidatePublicContent } from "@/lib/admin/revalidate";
import { requireAdmin } from "@/lib/auth/session";
import { getPrisma } from "@/lib/prisma";

function areaFromForm(formData: FormData) {
  return {
    name: formString(formData, "name"),
    slug: formString(formData, "slug"),
    headline: formString(formData, "headline"),
    body: formString(formData, "body"),
    nearbyServiceSlugs: commaSeparatedToArray(formString(formData, "nearbyServiceSlugs")),
    seoTitle: formOptionalString(formData, "seoTitle"),
    seoDescription: formOptionalString(formData, "seoDescription"),
  };
}

export async function createArea(formData: FormData) {
  await requireAdmin();
  const data = areaFromForm(formData);
  const area = await getPrisma().area.create({ data });
  await revalidatePublicContent();
  redirect(`/admin/areas/${area.id}/edit`);
}

export async function updateArea(id: string, formData: FormData) {
  await requireAdmin();
  const data = areaFromForm(formData);
  await getPrisma().area.update({ where: { id }, data });
  await revalidatePublicContent();
  redirect(`/admin/areas/${id}/edit`);
}

export async function deleteArea(id: string) {
  await requireAdmin();
  await getPrisma().area.delete({ where: { id } });
  await revalidatePublicContent();
  redirect("/admin/areas");
}
