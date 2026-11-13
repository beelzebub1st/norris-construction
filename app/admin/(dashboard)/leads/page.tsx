import Link from "next/link";
import type { LeadStatus } from "@prisma/client";
import {
  AdminPageHeader,
  AdminRowLink,
  AdminTable,
} from "@/components/admin/admin-chrome";
import { LEAD_STATUS_FILTER_OPTIONS, LEAD_STATUS_LABELS } from "@/lib/leads/status-labels";
import { PROJECT_TYPE_LABELS } from "@/lib/project-labels";
import { getPrisma } from "@/lib/prisma";

const STATUSES = new Set<LeadStatus>([
  "new",
  "contacted",
  "qualified",
  "quoted",
  "won",
  "lost",
]);

function parseStatusFilter(raw: string | undefined): LeadStatus | undefined {
  if (!raw || !STATUSES.has(raw as LeadStatus)) return undefined;
  return raw as LeadStatus;
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: statusParam } = await searchParams;
  const statusFilter = parseStatusFilter(statusParam);

  const leads = await getPrisma().lead.findMany({
    where: statusFilter ? { status: statusFilter } : undefined,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      projectType: true,
      status: true,
      createdAt: true,
    },
  });

  return (
    <div>
      <AdminPageHeader title="Leads" />
      <div className="mb-6 flex flex-wrap gap-2">
        {LEAD_STATUS_FILTER_OPTIONS.map((option) => {
          const active =
            option.value === "all"
              ? !statusFilter
              : statusFilter === option.value;
          const href =
            option.value === "all" ? "/admin/leads" : `/admin/leads?status=${option.value}`;
          return (
            <Link
              key={option.value}
              href={href}
              className={`rounded-full px-3 py-1 text-sm transition ${
                active
                  ? "bg-amber-600 text-zinc-950"
                  : "border border-zinc-700 text-zinc-300 hover:border-zinc-500"
              }`}
            >
              {option.label}
            </Link>
          );
        })}
      </div>
      <AdminTable headers={["Name", "Type", "Status", "Created"]}>
        {leads.map((lead) => (
          <tr key={lead.id} className="text-zinc-300">
            <td className="px-4 py-3">
              <AdminRowLink href={`/admin/leads/${lead.id}`}>{lead.name}</AdminRowLink>
            </td>
            <td className="px-4 py-3">
              {lead.projectType ? PROJECT_TYPE_LABELS[lead.projectType] : "—"}
            </td>
            <td className="px-4 py-3">{LEAD_STATUS_LABELS[lead.status]}</td>
            <td className="px-4 py-3 text-xs text-zinc-500">
              {lead.createdAt.toLocaleString()}
            </td>
          </tr>
        ))}
      </AdminTable>
      {leads.length === 0 ? (
        <p className="mt-4 text-sm text-zinc-500">No leads match this filter.</p>
      ) : null}
    </div>
  );
}
