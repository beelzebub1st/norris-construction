import { PostStatus, type Post } from "@prisma/client";
import {
  Field,
  FormActions,
  SubmitButton,
  inputClass,
} from "@/components/admin/admin-chrome";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import {
  SeoDescriptionInput,
  SeoTitleInput,
} from "@/components/admin/SeoFieldHints";
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
      <ImageUploadField
        name="cover"
        label="Cover image"
        defaultValue={post?.cover ?? ""}
        hint="Upload a cover photo or paste a URL."
      />
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
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-4">
        <p className="text-sm font-medium text-zinc-200">SEO</p>
        <Field label="SEO title">
          <SeoTitleInput
            defaultValue={post?.seoTitle ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="SEO description">
          <SeoDescriptionInput
            defaultValue={post?.seoDescription ?? ""}
            className={inputClass}
          />
        </Field>
      </div>
      <FormActions>
        <SubmitButton label={submitLabel} />
      </FormActions>
    </form>
  );
}
