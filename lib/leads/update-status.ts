import type { Lead, LeadStatus } from "@prisma/client";
import { canTransition } from "@/lib/leads/transitions";
import { getPrisma } from "@/lib/prisma";

export type UpdateLeadStatusError = "not_found" | "invalid_transition";

export type UpdateLeadStatusResult =
  | { ok: true; lead: Lead; previousStatus: LeadStatus }
  | { ok: false; error: UpdateLeadStatusError };

export async function updateLeadStatus(
  leadId: string,
  to: LeadStatus,
): Promise<UpdateLeadStatusResult> {
  const prisma = getPrisma();
  const existing = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!existing) {
    return { ok: false, error: "not_found" };
  }
  if (existing.status === to) {
    return { ok: true, lead: existing, previousStatus: existing.status };
  }
  if (!canTransition(existing.status, to)) {
    return { ok: false, error: "invalid_transition" };
  }
  const lead = await prisma.lead.update({
    where: { id: leadId },
    data: { status: to },
  });
  return { ok: true, lead, previousStatus: existing.status };
}

export async function addLeadNote(leadId: string, body: string) {
  const trimmed = body.trim();
  if (!trimmed) {
    return { ok: false as const, error: "empty" as const };
  }
  const prisma = getPrisma();
  const lead = await prisma.lead.findUnique({ where: { id: leadId }, select: { id: true } });
  if (!lead) {
    return { ok: false as const, error: "not_found" as const };
  }
  const note = await prisma.leadNote.create({
    data: { leadId, body: trimmed },
  });
  return { ok: true as const, note };
}
