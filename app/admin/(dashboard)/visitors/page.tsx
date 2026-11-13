import { AdminPageHeader, AdminTable } from "@/components/admin/admin-chrome";
import { getPrisma } from "@/lib/prisma";

export default async function AdminVisitorsPage() {
  const events = await getPrisma().visitorEvent.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div>
      <AdminPageHeader title="Visitors" />
      <p className="mb-4 max-w-2xl text-sm text-zinc-400">
        Recent page views from the public site beacon (last 200).
      </p>
      <AdminTable headers={["When", "Path", "Referrer", "User agent"]}>
        {events.map((row) => (
          <tr key={row.id} className="align-top text-zinc-300">
            <td className="whitespace-nowrap px-4 py-3 text-xs text-zinc-500">
              {row.createdAt.toLocaleString()}
            </td>
            <td className="max-w-xs px-4 py-3 text-xs font-mono break-all">{row.path}</td>
            <td className="max-w-xs px-4 py-3 text-xs break-all text-zinc-500">
              {row.referrer ?? "—"}
            </td>
            <td className="max-w-md px-4 py-3 text-xs text-zinc-500">
              {row.userAgent ?? "—"}
            </td>
          </tr>
        ))}
      </AdminTable>
      {events.length === 0 ? (
        <p className="mt-4 text-sm text-zinc-500">No page views recorded yet.</p>
      ) : null}
    </div>
  );
}
