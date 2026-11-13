import Link from "next/link";
import { connection } from "next/server";
import { EmailStatus } from "@prisma/client";
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

const STATUS_STYLE: Record<EmailStatus, string> = {
  sent: "text-emerald-400",
  failed: "text-red-400",
  pending: "text-amber-300",
};

export default async function AdminEmailsPage() {
  await connection();
  const prisma = getPrisma();
  const since7 = startOfDaysAgo(7);

  const [emails, sent7, failed7, pending7] = await Promise.all([
    prisma.emailLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 150,
      include: {
        lead: { select: { id: true, name: true } },
      },
    }),
    prisma.emailLog.count({
      where: { createdAt: { gte: since7 }, status: EmailStatus.sent },
    }),
    prisma.emailLog.count({
      where: { createdAt: { gte: since7 }, status: EmailStatus.failed },
    }),
    prisma.emailLog.count({
      where: { createdAt: { gte: since7 }, status: EmailStatus.pending },
    }),
  ]);

  return (
    <div>
      <AdminPageHeader
        title="Emails"
        description="Outbound transactional and nurture mail from the site automations."
        action={
          <Link
            href="/admin/automations"
            className="text-sm text-[#E06820] hover:underline"
          >
            Manage automations
          </Link>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <AdminStatCard label="Sent · 7 days" value={sent7} />
        <AdminStatCard
          label="Failed · 7 days"
          value={failed7}
          accent={failed7 > 0}
        />
        <AdminStatCard label="Pending · 7 days" value={pending7} />
      </div>

      {emails.length === 0 ? (
        <AdminEmpty>
          No emails logged yet. Enable nurture under Automations and wait for cron,
          or trigger lead follow-ups from a lead detail page.
        </AdminEmpty>
      ) : (
        <AdminTable headers={["When", "Template", "To", "Status", "Lead"]}>
          {emails.map((row) => (
            <tr key={row.id} className="text-zinc-300">
              <td className="whitespace-nowrap px-4 py-3 text-xs text-zinc-500">
                {row.createdAt.toLocaleString()}
              </td>
              <td className="px-4 py-3 font-mono text-xs">{row.template}</td>
              <td className="px-4 py-3 text-xs">{row.to}</td>
              <td className={`px-4 py-3 text-xs capitalize ${STATUS_STYLE[row.status]}`}>
                {row.status}
              </td>
              <td className="px-4 py-3 text-xs">
                {row.lead ? (
                  <Link
                    href={`/admin/leads/${row.lead.id}`}
                    className="text-[#E06820] hover:underline"
                  >
                    {row.lead.name}
                  </Link>
                ) : (
                  <span className="text-zinc-500">—</span>
                )}
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </div>
  );
}
