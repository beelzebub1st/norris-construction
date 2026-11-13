import { PostStatus, type Post } from "@prisma/client";
import {
  Field,
  FormActions,
  SubmitButton,
  inputClass,
} from "@/components/admin/admin-chrome";
import { toDatetimeLocalValue } from "@/lib/admin/form";

type PostFormProps = {
  action: (formData: FormData) => Promise<void>;
  post?: Post;
  submitLabel?: string;
};

export function PostForm({ action, post, submitLabel = "Save" }: PostFormProps) {
  return (
    <form action={action} className="max-w-2xl space-y-5">
      <Field label="Title">
        <input name="title" required defaultValue={post?.title ?? ""} className={inputClass} />
      </Field>
      <Field label="Slug">
        <input name="slug" required defaultValue={post?.slug ?? ""} className={inputClass} />
      </Field>
      <Field label="Cover image URL">
        <input name="cover" defaultValue={post?.cover ?? ""} className={inputClass} />
      </Field>
      <Field label="Status">
        <select
          name="status"
          defaultValue={post?.status ?? PostStatus.draft}
          className={inputClass}
        >
          <option value={PostStatus.draft}>Draft</option>
          <option value={PostStatus.published}>Published</option>
        </select>
      </Field>
      <Field label="Published at">
        <input
          type="datetime-local"
          name="publishedAt"
          defaultValue={toDatetimeLocalValue(post?.publishedAt)}
          className={inputClass}
        />
      </Field>
      <Field label="Body">
        <textarea
          name="body"
          required
          rows={10}
          defaultValue={post?.body ?? ""}
          className={inputClass}
        />
      </Field>
      <Field label="SEO title">
        <input name="seoTitle" defaultValue={post?.seoTitle ?? ""} className={inputClass} />
      </Field>
      <Field label="SEO description">
        <textarea
          name="seoDescription"
          rows={2}
          defaultValue={post?.seoDescription ?? ""}
          className={inputClass}
        />
      </Field>
      <FormActions>
        <SubmitButton label={submitLabel} />
      </FormActions>
    </form>
  );
}
