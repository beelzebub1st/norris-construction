import { ProjectType, type Project } from "@prisma/client";
import {
  Field,
  FormActions,
  SubmitButton,
  inputClass,
} from "@/components/admin/admin-chrome";
import { arrayToLines, toDatetimeLocalValue } from "@/lib/admin/form";
import { PROJECT_TYPE_FILTER_OPTIONS } from "@/lib/project-labels";

type ProjectFormProps = {
  action: (formData: FormData) => Promise<void>;
  project?: Project;
  submitLabel?: string;
};

export function ProjectForm({ action, project, submitLabel = "Save" }: ProjectFormProps) {
  const beforeAfterText =
    project?.beforeAfter != null ? JSON.stringify(project.beforeAfter, null, 2) : "";

  return (
    <form action={action} className="max-w-2xl space-y-5">
      <Field label="Title">
        <input
          name="title"
          required
          defaultValue={project?.title ?? ""}
          className={inputClass}
        />
      </Field>
      <Field label="Slug">
        <input name="slug" required defaultValue={project?.slug ?? ""} className={inputClass} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Type">
          <select
            name="type"
            defaultValue={project?.type ?? ProjectType.remodel}
            className={inputClass}
          >
            {PROJECT_TYPE_FILTER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Area slug" hint="e.g. miami-beach, coral-gables">
          <input
            name="areaSlug"
            required
            defaultValue={project?.areaSlug ?? ""}
            className={inputClass}
          />
        </Field>
      </div>
      <Field label="Summary">
        <textarea
          name="summary"
          required
          rows={2}
          defaultValue={project?.summary ?? ""}
          className={inputClass}
        />
      </Field>
      <Field label="Body">
        <textarea
          name="body"
          required
          rows={8}
          defaultValue={project?.body ?? ""}
          className={inputClass}
        />
      </Field>
      <Field label="Gallery URLs" hint="One image URL per line">
        <textarea
          name="gallery"
          rows={4}
          defaultValue={project ? arrayToLines(project.gallery) : ""}
          className={inputClass}
        />
      </Field>
      <Field label="Before / after JSON" hint="Optional array of { before, after, caption? }">
        <textarea
          name="beforeAfter"
          rows={4}
          defaultValue={beforeAfterText}
          className={inputClass}
          placeholder="[]"
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Published at">
          <input
            type="datetime-local"
            name="publishedAt"
            defaultValue={toDatetimeLocalValue(project?.publishedAt)}
            className={inputClass}
          />
        </Field>
        <Field label="Featured">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={project?.featured ?? false}
            className="mt-2 size-4 rounded border-zinc-600"
          />
        </Field>
      </div>
      <Field label="SEO title">
        <input name="seoTitle" defaultValue={project?.seoTitle ?? ""} className={inputClass} />
      </Field>
      <Field label="SEO description">
        <textarea
          name="seoDescription"
          rows={2}
          defaultValue={project?.seoDescription ?? ""}
          className={inputClass}
        />
      </Field>
      <FormActions>
        <SubmitButton label={submitLabel} />
      </FormActions>
    </form>
  );
}
