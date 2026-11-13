"use server";

import { PostStatus } from "@prisma/client";
import { redirect } from "next/navigation";
import {
  formOptionalString,
  formString,
  parseDatetimeLocal,
} from "@/lib/admin/form";
import { revalidatePublicContent } from "@/lib/admin/revalidate";
import { requireAdmin } from "@/lib/auth/session";
import { getPrisma } from "@/lib/prisma";

function postFromForm(formData: FormData) {
  const status = formString(formData, "status") as PostStatus;
  return {
    title: formString(formData, "title"),
    slug: formString(formData, "slug"),
    cover: formOptionalString(formData, "cover"),
    body: formString(formData, "body"),
    status: status === PostStatus.published ? PostStatus.published : PostStatus.draft,
    seoTitle: formOptionalString(formData, "seoTitle"),
    seoDescription: formOptionalString(formData, "seoDescription"),
    publishedAt: parseDatetimeLocal(formString(formData, "publishedAt")),
  };
}

export async function createPost(formData: FormData) {
  await requireAdmin();
  const data = postFromForm(formData);
  const post = await getPrisma().post.create({ data });
  revalidatePublicContent();
  redirect(`/admin/blog/${post.id}/edit`);
}

export async function updatePost(id: string, formData: FormData) {
  await requireAdmin();
  const data = postFromForm(formData);
  await getPrisma().post.update({ where: { id }, data });
  revalidatePublicContent();
  redirect(`/admin/blog/${id}/edit`);
}

export async function deletePost(id: string) {
  await requireAdmin();
  await getPrisma().post.delete({ where: { id } });
  revalidatePublicContent();
  redirect("/admin/blog");
}
