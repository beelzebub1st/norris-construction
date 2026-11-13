import type { Lead, LeadNote, LeadStatus } from "@prisma/client";
import {
  Field,
  FormActions,
  SubmitButton,
  inputClass,
} from "@/components/admin/admin-chrome";
import { LEAD_STATUS_LABELS } from "@/lib/leads/status-labels";
import { PROJECT_TYPE_LABELS } from "@/lib/project-labels";
import { updateLeadFromAdmin } from "@/app/admin/(dashboard)/leads/[id]/actions";
import { statusSelectOptions } from "@/lib/leads/transitions";

type LeadDetailFormProps = {
  lead: Lead;
  notes: LeadNote[];
};

function formatOptional(value: string | null | undefined) {
  return value?.trim() ? value : "—";
}

export function LeadDetailForm({ lead, notes }: LeadDetailFormProps) {
  const statusOptions = statusSelectOptions(lead.status);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4 rounded-lg border border-zinc-800 bg-zinc-900/40 p-5 text-sm text-zinc-300">
        <dl className="space-y-3">
          <div>
            <dt className="text-xs uppercase text-zinc-500">Name</dt>
            <dd className="text-white">{lead.name}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-zinc-500">Email</dt>
            <dd>
              <a href={`mailto:${lead.email}`} className="text-amber-400 hover:text-amber-300">
                {lead.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-zinc-500">Phone</dt>
            <dd>{lead.phone}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-zinc-500">Project type</dt>
            <dd>
              {lead.projectType ? PROJECT_TYPE_LABELS[lead.projectType] : "—"}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-zinc-500">Area / budget</dt>
            <dd>
              {formatOptional(lead.area)} · {formatOptional(lead.budgetRange ?? undefined)}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-zinc-500">Source</dt>
            <dd>{formatOptional(lead.source)}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-zinc-500">Message</dt>
            <dd className="whitespace-pre-wrap text-zinc-200">{lead.message}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-zinc-500">Created</dt>
            <dd>{lead.createdAt.toLocaleString()}</dd>
          </div>
        </dl>
      </div>

      <div className="space-y-6">
        <form action={updateLeadFromAdmin.bind(null, lead.id)} className="space-y-4">
          <Field label="Status">
            <select name="status" defaultValue={lead.status} className={inputClass}>
              {statusOptions.map((value: LeadStatus) => (
                <option key={value} value={value}>
                  {LEAD_STATUS_LABELS[value]}
                  {value === lead.status ? " (current)" : ""}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Add note" hint="Saved to the timeline below when you update.">
            <textarea name="note" rows={4} className={inputClass} placeholder="Internal note…" />
          </Field>
          <FormActions>
            <SubmitButton label="Save lead" />
          </FormActions>
        </form>

        <div>
          <h2 className="mb-3 text-sm font-medium text-zinc-200">Notes timeline</h2>
          {notes.length === 0 ? (
            <p className="text-sm text-zinc-500">No notes yet.</p>
          ) : (
            <ul className="space-y-3">
              {notes.map((note) => (
                <li
                  key={note.id}
                  className="rounded-md border border-zinc-800 bg-zinc-950/80 p-3 text-sm"
                >
                  <p className="text-xs text-zinc-500">{note.createdAt.toLocaleString()}</p>
                  <p className="mt-1 whitespace-pre-wrap text-zinc-300">{note.body}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
