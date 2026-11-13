"use server";

import { redirect } from "next/navigation";
import {
  commaSeparatedToArray,
  formOptionalString,
  formString,
  parseIntField,
  parseJsonField,
} from "@/lib/admin/form";
import { revalidatePublicContent } from "@/lib/admin/revalidate";
import { requireAdmin } from "@/lib/auth/session";
import { getPrisma } from "@/lib/prisma";

function serviceFromForm(formData: FormData) {
  return {
    title: formString(formData, "title"),
    slug: formString(formData, "slug"),
    heroImage: formOptionalString(formData, "heroImage"),
    summary: formString(formData, "summary"),
    body: formString(formData, "body"),
    faqs: parseJsonField(formString(formData, "faqs"), []),
    relatedProjectIds: commaSeparatedToArray(formString(formData, "relatedProjectIds")),
    seoTitle: formOptionalString(formData, "seoTitle"),
    seoDescription: formOptionalString(formData, "seoDescription"),
    sortOrder: parseIntField(formString(formData, "sortOrder"), 0),
  };
}

export async function createService(formData: FormData) {
  await requireAdmin();
  const data = serviceFromForm(formData);
  const service = await getPrisma().service.create({ data });
  await revalidatePublicContent();
  redirect(`/admin/services/${service.id}/edit`);
}

export async function updateService(id: string, formData: FormData) {
  await requireAdmin();
  const data = serviceFromForm(formData);
  await getPrisma().service.update({ where: { id }, data });
  await revalidatePublicContent();
  redirect(`/admin/services/${id}/edit`);
}

export async function deleteService(id: string) {
  await requireAdmin();
  await getPrisma().service.delete({ where: { id } });
  await revalidatePublicContent();
  redirect("/admin/services");
}
