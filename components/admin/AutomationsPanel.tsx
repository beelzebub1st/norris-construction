import type { EmailLog, SiteSettings } from "@prisma/client";
import { Field, FormActions, SubmitButton } from "@/components/admin/admin-chrome";
import { saveNurtureAutomation } from "@/app/admin/(dashboard)/automations/actions";

type AutomationsPanelProps = {
  settings: SiteSettings;
  recentEmails: EmailLog[];
};

export function AutomationsPanel({ settings, recentEmails }: AutomationsPanelProps) {
  return (
    <div className="space-y-8 max-w-3xl">
      <form
        action={saveNurtureAutomation}
        className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-5"
      >
        <h2 className="text-sm font-medium text-zinc-200">Nurture sequence</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Day 2 and day 5 follow-ups run via{" "}
          <code className="text-zinc-300">/api/cron/nurture</code> when enabled.
        </p>
        <Field label="Nurture emails enabled">
          <input
            type="checkbox"
            name="nurtureEnabled"
            defaultChecked={settings.nurtureEnabled}
            className="mt-2 size-4 rounded border-zinc-600"
          />
        </Field>
        <FormActions>
          <SubmitButton label="Save automation" />
        </FormActions>
      </form>

      <div>
        <h2 className="mb-3 text-sm font-medium text-zinc-200">Recent email log</h2>
        <div className="overflow-x-auto rounded-lg border border-zinc-800">
          <table className="min-w-full divide-y divide-zinc-800 text-sm">
            <thead className="bg-zinc-900/80">
              <tr>
                {["When", "Template", "To", "Status", "Lead"].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 bg-zinc-950">
              {recentEmails.map((row) => (
                <tr key={row.id} className="text-zinc-300">
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-zinc-500">
                    {row.createdAt.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{row.template}</td>
                  <td className="px-4 py-3 text-xs">{row.to}</td>
                  <td className="px-4 py-3 text-xs">{row.status}</td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-500">
                    {row.leadId ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {recentEmails.length === 0 ? (
          <p className="mt-3 text-sm text-zinc-500">No email log entries yet.</p>
        ) : null}
      </div>
    </div>
  );
}
