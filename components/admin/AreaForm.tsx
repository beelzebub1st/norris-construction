import type { Area } from "@prisma/client";
import {
  Field,
  FormActions,
  SubmitButton,
  inputClass,
} from "@/components/admin/admin-chrome";
import {
  SeoDescriptionInput,
  SeoTitleInput,
} from "@/components/admin/SeoFieldHints";

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
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-4">
        <p className="text-sm font-medium text-zinc-200">SEO</p>
        <Field label="SEO title">
          <SeoTitleInput
            defaultValue={area?.seoTitle ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="SEO description">
          <SeoDescriptionInput
            defaultValue={area?.seoDescription ?? ""}
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
