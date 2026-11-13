"use server";

import { Prisma, ProjectType } from "@prisma/client";
import { redirect } from "next/navigation";
import {
  formCheckbox,
  formOptionalString,
  formString,
  linesToArray,
  parseDatetimeLocal,
  parseJsonField,
} from "@/lib/admin/form";
import { revalidatePublicContent } from "@/lib/admin/revalidate";
import { requireAdmin } from "@/lib/auth/session";
import { getPrisma } from "@/lib/prisma";

function parseBeforeAfterField(raw: string): Prisma.InputJsonValue | typeof Prisma.DbNull {
  if (!raw.trim()) return Prisma.DbNull;
  return parseJsonField(raw, []) as Prisma.InputJsonValue;
}

function projectFromForm(formData: FormData) {
  const type = formString(formData, "type") as ProjectType;
  return {
    title: formString(formData, "title"),
    slug: formString(formData, "slug"),
    type,
    areaSlug: formString(formData, "areaSlug"),
    summary: formString(formData, "summary"),
    body: formString(formData, "body"),
    gallery: linesToArray(formString(formData, "gallery")),
    beforeAfter: parseBeforeAfterField(formString(formData, "beforeAfter")),
    featured: formCheckbox(formData, "featured"),
    seoTitle: formOptionalString(formData, "seoTitle"),
    seoDescription: formOptionalString(formData, "seoDescription"),
    publishedAt: parseDatetimeLocal(formString(formData, "publishedAt")),
  };
}

export async function createProject(formData: FormData) {
  await requireAdmin();
  const data = projectFromForm(formData);
  const project = await getPrisma().project.create({ data });
  await revalidatePublicContent();
  redirect(`/admin/projects/${project.id}/edit`);
}

export async function updateProject(id: string, formData: FormData) {
  await requireAdmin();
  const data = projectFromForm(formData);
  await getPrisma().project.update({ where: { id }, data });
  await revalidatePublicContent();
  redirect(`/admin/projects/${id}/edit`);
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await getPrisma().project.delete({ where: { id } });
  await revalidatePublicContent();
  redirect("/admin/projects");
}
