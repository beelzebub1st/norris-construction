import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-chrome";
import { LeadDetailForm } from "@/components/admin/LeadDetailForm";
import { LEAD_STATUS_LABELS } from "@/lib/leads/status-labels";
import { getPrisma } from "@/lib/prisma";

export default async function AdminLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await getPrisma().lead.findUnique({
    where: { id },
    include: {
      notes: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!lead) {
    notFound();
  }

  const { notes, ...leadFields } = lead;

  return (
    <div>
      <AdminPageHeader
        title={lead.name}
        action={
          <Link href="/admin/leads" className="text-sm text-zinc-400 hover:text-zinc-200">
            ← Back to leads
          </Link>
        }
      />
      <p className="mb-6 text-sm text-zinc-500">
        Status: {LEAD_STATUS_LABELS[lead.status]} · ID {lead.id}
      </p>
      <LeadDetailForm lead={leadFields} notes={notes} />
    </div>
  );
}
