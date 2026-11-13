import type { Area } from "@prisma/client";
import {
  Field,
  FormActions,
  SubmitButton,
  inputClass,
} from "@/components/admin/admin-chrome";

type AreaFormProps = {
  action: (formData: FormData) => Promise<void>;
  area?: Area;
  submitLabel?: string;
};

export function AreaForm({ action, area, submitLabel = "Save" }: AreaFormProps) {
  return (
    <form action={action} className="max-w-2xl space-y-5">
      <Field label="Name">
        <input name="name" required defaultValue={area?.name ?? ""} className={inputClass} />
      </Field>
      <Field label="Slug">
        <input name="slug" required defaultValue={area?.slug ?? ""} className={inputClass} />
      </Field>
      <Field label="Headline">
        <input
          name="headline"
          required
          defaultValue={area?.headline ?? ""}
          className={inputClass}
        />
      </Field>
      <Field label="Body">
        <textarea
          name="body"
          required
          rows={8}
          defaultValue={area?.body ?? ""}
          className={inputClass}
        />
      </Field>
      <Field label="Nearby service slugs" hint="Comma or newline separated">
        <textarea
          name="nearbyServiceSlugs"
          rows={3}
          defaultValue={area?.nearbyServiceSlugs.join(", ") ?? ""}
          className={inputClass}
        />
      </Field>
      <Field label="SEO title">
        <input name="seoTitle" defaultValue={area?.seoTitle ?? ""} className={inputClass} />
      </Field>
      <Field label="SEO description">
        <textarea
          name="seoDescription"
          rows={2}
          defaultValue={area?.seoDescription ?? ""}
          className={inputClass}
        />
      </Field>
      <FormActions>
        <SubmitButton label={submitLabel} />
      </FormActions>
    </form>
  );
}
