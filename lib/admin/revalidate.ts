import { PostStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/prisma";

export async function revalidatePublicContent() {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/services");
  revalidatePath("/areas");
  revalidatePath("/blog");
  revalidatePath("/contact");

  const prisma = getPrisma();
  const [projects, services, areas, posts] = await Promise.all([
    prisma.project.findMany({ select: { slug: true } }),
    prisma.service.findMany({ select: { slug: true } }),
    prisma.area.findMany({ select: { slug: true } }),
    prisma.post.findMany({
      where: { status: PostStatus.published },
      select: { slug: true },
    }),
  ]);

  for (const row of projects) {
    revalidatePath(`/projects/${row.slug}`);
  }
  for (const row of services) {
    revalidatePath(`/services/${row.slug}`);
  }
  for (const row of areas) {
    revalidatePath(`/areas/${row.slug}`);
  }
  for (const row of posts) {
    revalidatePath(`/blog/${row.slug}`);
  }
}
