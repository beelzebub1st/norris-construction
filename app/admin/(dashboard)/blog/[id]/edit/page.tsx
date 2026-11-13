import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-chrome";
import { PostForm } from "@/components/admin/PostForm";
import { getPrisma } from "@/lib/prisma";
import { updatePost } from "../../actions";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPrisma().post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <AdminPageHeader title={`Edit: ${post.title}`} />
      <PostForm action={updatePost.bind(null, id)} post={post} />
    </div>
  );
}
