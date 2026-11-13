import { connection } from "next/server";
import {
  AdminEmpty,
  AdminPageHeader,
  AdminStatCard,
  AdminTable,
} from "@/components/admin/admin-chrome";
import { getPrisma } from "@/lib/prisma";

function startOfDaysAgo(days: number) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - days);
  return d;
}

export default async function AdminVisitorsPage() {
  await connection();
  const prisma = getPrisma();
  const since7 = startOfDaysAgo(7);
  const since1 = startOfDaysAgo(1);

  const [events, views1, views7, topPaths] = await Promise.all([
    prisma.visitorEvent.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
    }),
    prisma.visitorEvent.count({ where: { createdAt: { gte: since1 } } }),
    prisma.visitorEvent.count({ where: { createdAt: { gte: since7 } } }),
    prisma.visitorEvent.groupBy({
      by: ["path"],
      where: { createdAt: { gte: since7 } },
      _count: { path: true },
      orderBy: { _count: { path: "desc" } },
      take: 8,
    }),
  ]);

  return (
    <div>
      <AdminPageHeader
        title="Visitors"
        description="Page-view beacon from the public site — useful for spotting interest spikes."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <AdminStatCard label="Views · 24h" value={views1} />
        <AdminStatCard label="Views · 7 days" value={views7} />
        <AdminStatCard label="Top paths tracked" value={topPaths.length} />
      </div>

      {topPaths.length > 0 ? (
        <div className="mb-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {topPaths.map((row) => (
            <div
              key={row.path}
              className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-3"
            >
              <p className="truncate font-mono text-[11px] text-zinc-400">
                {row.path}
              </p>
              <p className="mt-1 font-display text-xl text-[#E06820]">
                {row._count.path}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      <AdminTable headers={["When", "Path", "Referrer", "User agent"]}>
        {events.map((row) => (
          <tr key={row.id} className="align-top text-zinc-300">
            <td className="whitespace-nowrap px-4 py-3 text-xs text-zinc-500">
              {row.createdAt.toLocaleString()}
            </td>
            <td className="max-w-xs px-4 py-3 text-xs font-mono break-all">
              {row.path}
            </td>
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
        <div className="mt-4">
          <AdminEmpty>No page views recorded yet.</AdminEmpty>
        </div>
      ) : null}
    </div>
  );
}
