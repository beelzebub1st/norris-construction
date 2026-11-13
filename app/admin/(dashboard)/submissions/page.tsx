import { AdminPageHeader, AdminTable } from "@/components/admin/admin-chrome";
import { getPrisma } from "@/lib/prisma";

export default async function AdminSubmissionsPage() {
  const submissions = await getPrisma().submission.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div>
      <AdminPageHeader title="Submissions" />
      <p className="mb-4 max-w-2xl text-sm text-zinc-400">
        Read-only log of raw form payloads (last 200). Use Leads for pipeline work.
      </p>
      <AdminTable headers={["When", "Lead ID", "IP", "Payload"]}>
        {submissions.map((row) => (
          <tr key={row.id} className="align-top text-zinc-300">
            <td className="whitespace-nowrap px-4 py-3 text-xs text-zinc-500">
              {row.createdAt.toLocaleString()}
            </td>
            <td className="px-4 py-3 text-xs font-mono">{row.leadId ?? "—"}</td>
            <td className="px-4 py-3 text-xs">{row.ip ?? "—"}</td>
            <td className="max-w-xl px-4 py-3">
              <pre className="overflow-x-auto rounded border border-zinc-800 bg-zinc-950 p-2 text-xs text-zinc-400">
                {JSON.stringify(row.payload, null, 2)}
              </pre>
            </td>
          </tr>
        ))}
      </AdminTable>
      {submissions.length === 0 ? (
        <p className="mt-4 text-sm text-zinc-500">No submissions yet.</p>
      ) : null}
    </div>
  );
}
