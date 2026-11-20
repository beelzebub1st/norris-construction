import type { Service } from "@prisma/client";
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

type ServiceFormProps = {
  action: (formData: FormData) => Promise<void>;
  service?: Service;
  submitLabel?: string;
};

export function ServiceForm({ action, service, submitLabel = "Save" }: ServiceFormProps) {
  const faqsText =
    service?.faqs != null ? JSON.stringify(service.faqs, null, 2) : "[]";

  return (
    <form action={action} className="max-w-2xl space-y-5">
      <Field label="Title">
        <input
          name="title"
          required
          defaultValue={service?.title ?? ""}
          className={inputClass}
        />
      </Field>
      <Field label="Slug">
        <input name="slug" required defaultValue={service?.slug ?? ""} className={inputClass} />
      </Field>
      <Field label="Sort order">
        <input
          name="sortOrder"
          type="number"
          defaultValue={service?.sortOrder ?? 0}
          className={inputClass}
        />
      </Field>
      <ImageUploadField
        name="heroImage"
        label="Hero image"
        defaultValue={service?.heroImage ?? ""}
        hint="Upload a photo or paste a URL. Shows at the top of the service page."
      />
      <Field label="Summary">
        <textarea
          name="summary"
          required
          rows={2}
          defaultValue={service?.summary ?? ""}
          className={inputClass}
        />
      </Field>
      <Field label="Body">
        <textarea
          name="body"
          required
          rows={8}
          defaultValue={service?.body ?? ""}
          className={inputClass}
        />
      </Field>
      <Field label="FAQs JSON" hint='Array of { "q", "a" } objects'>
        <textarea name="faqs" rows={6} defaultValue={faqsText} className={inputClass} />
      </Field>
      <Field label="Related project IDs" hint="Comma-separated Prisma IDs">
        <input
          name="relatedProjectIds"
          defaultValue={service?.relatedProjectIds.join(", ") ?? ""}
          className={inputClass}
        />
      </Field>
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-4">
        <p className="text-sm font-medium text-zinc-200">SEO</p>
        <Field label="SEO title">
          <SeoTitleInput
            defaultValue={service?.seoTitle ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="SEO description">
          <SeoDescriptionInput
            defaultValue={service?.seoDescription ?? ""}
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
