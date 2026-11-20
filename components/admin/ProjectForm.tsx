import { ProjectType, type Area, type Project } from "@prisma/client";
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
import { arrayToLines, toDatetimeLocalValue } from "@/lib/admin/form";
import { PROJECT_TYPE_FILTER_OPTIONS } from "@/lib/project-labels";

type ProjectFormProps = {
  action: (formData: FormData) => Promise<void>;
  project?: Project;
  areas: Pick<Area, "name" | "slug">[];
  submitLabel?: string;
};

export function ProjectForm({
  action,
  project,
  areas,
  submitLabel = "Save",
}: ProjectFormProps) {
  const beforeAfterText =
    project?.beforeAfter != null ? JSON.stringify(project.beforeAfter, null, 2) : "";
  const isNew = !project;

  return (
    <form action={action} className="max-w-2xl space-y-6">
      <div className="rounded-2xl border border-[#E06820]/25 bg-gradient-to-br from-[#E06820]/10 to-transparent p-4 text-sm text-zinc-300">
        Add the story, set an area, upload photos, and publish. Published projects
        show on the live site right away.
      </div>

      <Field label="Title">
        <input
          name="title"
          required
          defaultValue={project?.title ?? ""}
          className={inputClass}
          placeholder="West Palm office build-out"
        />
      </Field>
      <Field label="Slug" hint="URL path, e.g. west-palm-office-buildout">
        <input
          name="slug"
          required
          defaultValue={project?.slug ?? ""}
          className={inputClass}
          placeholder="west-palm-office-buildout"
        />
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
        <Field label="Area">
          <select
            name="areaSlug"
            required
            defaultValue={project?.areaSlug ?? areas[0]?.slug ?? ""}
            className={inputClass}
          >
            {areas.length === 0 ? (
              <option value="">Add an area first</option>
            ) : null}
            {areas.map((area) => (
              <option key={area.slug} value={area.slug}>
                {area.name}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Summary">
        <textarea
          name="summary"
          required
          rows={2}
          defaultValue={project?.summary ?? ""}
          className={inputClass}
          placeholder="One-line commercial project summary"
        />
      </Field>
      <Field label="Body">
        <textarea
          name="body"
          required
          rows={8}
          defaultValue={project?.body ?? ""}
          className={inputClass}
          placeholder="Full project description. New paragraphs on new lines."
        />
      </Field>

      <ImageUploadField
        name="gallery"
        label="Project gallery"
        multiple
        defaultValue={project ? arrayToLines(project.gallery) : ""}
        hint="Upload from your device or paste URLs. First image is used as the cover."
      />

      <Field label="Before / after JSON" hint="Optional — advanced. Prefer gallery photos above.">
        <textarea
          name="beforeAfter"
          rows={3}
          defaultValue={beforeAfterText}
          className={inputClass}
          placeholder="[]"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Published at" hint="Leave blank and check Publish now for new projects.">
          <input
            type="datetime-local"
            name="publishedAt"
            defaultValue={toDatetimeLocalValue(project?.publishedAt)}
            className={inputClass}
          />
        </Field>
        <div className="space-y-4 pt-1">
          <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={project?.featured ?? false}
              className="size-4 rounded border-zinc-600 accent-[#E06820]"
            />
            <span>
              <span className="block text-sm font-medium text-zinc-100">Featured</span>
              <span className="text-xs text-zinc-500">Show on homepage highlights</span>
            </span>
          </label>
          {isNew || !project?.publishedAt ? (
            <label className="flex items-center gap-3 rounded-xl border border-[#E06820]/35 bg-[#E06820]/10 px-4 py-3">
              <input
                type="checkbox"
                name="publishNow"
                defaultChecked={isNew}
                className="size-4 rounded border-zinc-600 accent-[#E06820]"
              />
              <span>
                <span className="block text-sm font-medium text-zinc-100">Publish now</span>
                <span className="text-xs text-zinc-500">Make visible on the live site</span>
              </span>
            </label>
          ) : null}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-4">
        <p className="text-sm font-medium text-zinc-200">SEO</p>
        <Field label="SEO title">
          <SeoTitleInput defaultValue={project?.seoTitle ?? ""} className={inputClass} />
        </Field>
        <Field label="SEO description">
          <SeoDescriptionInput
            defaultValue={project?.seoDescription ?? ""}
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
