import { revalidatePath } from "next/cache";

export function revalidatePublicContent() {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/services");
  revalidatePath("/areas");
  revalidatePath("/blog");
}
