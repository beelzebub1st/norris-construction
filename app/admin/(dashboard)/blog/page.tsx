import {
  AdminDeleteForm,
  AdminPageHeader,
  AdminPrimaryLink,
  AdminRowLink,
  AdminTable,
} from "@/components/admin/admin-chrome";
import { getPrisma } from "@/lib/prisma";
import { deletePost } from "./actions";

export default async function AdminBlogPage() {
  const posts = await getPrisma().post.findMany({
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      publishedAt: true,
    },
  });

  return (
    <div>
      <AdminPageHeader
        title="Blog"
        action={<AdminPrimaryLink href="/admin/blog/new">New post</AdminPrimaryLink>}
      />
      <AdminTable headers={["Title", "Status", "Published", ""]}>
        {posts.map((post) => (
          <tr key={post.id} className="text-zinc-300">
            <td className="px-4 py-3">
              <AdminRowLink href={`/admin/blog/${post.id}/edit`}>{post.title}</AdminRowLink>
              <p className="text-xs text-zinc-500">{post.slug}</p>
            </td>
            <td className="px-4 py-3 capitalize">{post.status}</td>
            <td className="px-4 py-3 text-xs text-zinc-500">
              {post.publishedAt?.toLocaleDateString() ?? "—"}
            </td>
            <td className="px-4 py-3 text-right">
              <AdminDeleteForm
                action={deletePost.bind(null, post.id)}
                confirmMessage={`Delete post "${post.title}"?`}
              />
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
