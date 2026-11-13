import { AdminPageHeader } from "@/components/admin/admin-chrome";
import { PostForm } from "@/components/admin/PostForm";
import { createPost } from "../actions";

export default function NewBlogPostPage() {
  return (
    <div>
      <AdminPageHeader title="New post" />
      <PostForm action={createPost} submitLabel="Create post" />
    </div>
  );
}
