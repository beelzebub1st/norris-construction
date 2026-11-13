"use server";

import { redirect } from "next/navigation";
import {
  formCheckbox,
  formOptionalString,
  formString,
  parseIntField,
} from "@/lib/admin/form";
import { revalidatePublicContent } from "@/lib/admin/revalidate";
import { requireAdmin } from "@/lib/auth/session";
import { getPrisma } from "@/lib/prisma";

function testimonialFromForm(formData: FormData) {
  return {
    name: formString(formData, "name"),
    quote: formString(formData, "quote"),
    rating: parseIntField(formString(formData, "rating"), 5),
    projectId: formOptionalString(formData, "projectId"),
    published: formCheckbox(formData, "published"),
  };
}

export async function createTestimonial(formData: FormData) {
  await requireAdmin();
  const data = testimonialFromForm(formData);
  const testimonial = await getPrisma().testimonial.create({ data });
  revalidatePublicContent();
  redirect(`/admin/testimonials/${testimonial.id}/edit`);
}

export async function updateTestimonial(id: string, formData: FormData) {
  await requireAdmin();
  const data = testimonialFromForm(formData);
  await getPrisma().testimonial.update({ where: { id }, data });
  revalidatePublicContent();
  redirect(`/admin/testimonials/${id}/edit`);
}

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  await getPrisma().testimonial.delete({ where: { id } });
  revalidatePublicContent();
  redirect("/admin/testimonials");
}
