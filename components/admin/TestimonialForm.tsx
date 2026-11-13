import type { Project, Testimonial } from "@prisma/client";
import {
  Field,
  FormActions,
  SubmitButton,
  inputClass,
} from "@/components/admin/admin-chrome";

type TestimonialFormProps = {
  action: (formData: FormData) => Promise<void>;
  testimonial?: Testimonial;
  projects: Pick<Project, "id" | "title">[];
  submitLabel?: string;
};

export function TestimonialForm({
  action,
  testimonial,
  projects,
  submitLabel = "Save",
}: TestimonialFormProps) {
  return (
    <form action={action} className="max-w-2xl space-y-5">
      <Field label="Name">
        <input name="name" required defaultValue={testimonial?.name ?? ""} className={inputClass} />
      </Field>
      <Field label="Quote">
        <textarea
          name="quote"
          required
          rows={4}
          defaultValue={testimonial?.quote ?? ""}
          className={inputClass}
        />
      </Field>
      <Field label="Rating (1–5)">
        <input
          name="rating"
          type="number"
          min={1}
          max={5}
          defaultValue={testimonial?.rating ?? 5}
          className={inputClass}
        />
      </Field>
      <Field label="Linked project">
        <select
          name="projectId"
          defaultValue={testimonial?.projectId ?? ""}
          className={inputClass}
        >
          <option value="">— None —</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Published on site">
        <input
          type="checkbox"
          name="published"
          defaultChecked={testimonial?.published ?? false}
          className="mt-2 size-4 rounded border-zinc-600"
        />
      </Field>
      <FormActions>
        <SubmitButton label={submitLabel} />
      </FormActions>
    </form>
  );
}
