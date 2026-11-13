import type { Service } from "@prisma/client";
import {
  Field,
  FormActions,
  SubmitButton,
  inputClass,
} from "@/components/admin/admin-chrome";

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
      <Field label="Hero image URL">
        <input name="heroImage" defaultValue={service?.heroImage ?? ""} className={inputClass} />
      </Field>
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
      <Field label="SEO title">
        <input name="seoTitle" defaultValue={service?.seoTitle ?? ""} className={inputClass} />
      </Field>
      <Field label="SEO description">
        <textarea
          name="seoDescription"
          rows={2}
          defaultValue={service?.seoDescription ?? ""}
          className={inputClass}
        />
      </Field>
      <FormActions>
        <SubmitButton label={submitLabel} />
      </FormActions>
    </form>
  );
}
