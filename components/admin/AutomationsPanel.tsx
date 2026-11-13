import type { EmailLog, SiteSettings } from "@prisma/client";
import Link from "next/link";
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
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-sm font-medium text-zinc-200">Recent email log</h2>
          <Link href="/admin/emails" className="text-xs text-[#E06820] hover:underline">
            Full email inbox
          </Link>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-full divide-y divide-white/10 text-sm">
            <thead className="bg-white/[0.03]">
              <tr>
                {["When", "Template", "To", "Status", "Lead"].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-[#0c0c0e]/60">
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
