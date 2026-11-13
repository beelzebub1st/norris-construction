import type { ProjectType } from "@prisma/client";
import { sendLeadEmails } from "@/lib/email/send";
import { getPrisma } from "@/lib/prisma";
import { mapBudgetToPrisma } from "@/lib/types";
import type { EstimateInput } from "@/lib/leads/validate";

export type CreateLeadContext = {
  ip?: string;
};

export type CreateLeadResult =
  | { ok: true; spam: true }
  | { ok: true; leadId: string };

export async function createLeadFromEstimate(
  input: EstimateInput,
  ctx: CreateLeadContext = {},
): Promise<CreateLeadResult> {
  if (input.honeypot?.trim()) {
    return { ok: true, spam: true };
  }

  const prisma = getPrisma();
  const lead = await prisma.lead.create({
    data: {
      name: input.name,
      phone: input.phone,
      email: input.email,
      message: input.message,
      projectType: input.projectType as ProjectType | undefined,
      area: input.area,
      budgetRange: mapBudgetToPrisma(input.budgetRange),
      source: input.source,
      utmSource: input.utmSource,
      utmMedium: input.utmMedium,
      utmCampaign: input.utmCampaign,
      pageUrl: input.pageUrl,
    },
  });

  await prisma.submission.create({
    data: {
      leadId: lead.id,
      payload: input,
      ip: ctx.ip,
    },
  });

  try {
    await sendLeadEmails(lead);
  } catch {
    // Email failures must not fail the client response.
  }

  return { ok: true, leadId: lead.id };
}
