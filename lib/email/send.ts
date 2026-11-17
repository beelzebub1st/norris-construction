import type { Lead, LeadStatus } from "@prisma/client";
import { getPrisma } from "@/lib/prisma";
import {
  createResendClient,
  getLeadNotifyEmail,
  getResendApiKey,
  getResendFromAddress,
  MISSING_RESEND_API_KEY,
} from "@/lib/email/resend";
import {
  type EmailTemplateKey,
  renderEmailTemplate,
} from "@/lib/email/templates";

const DEFAULT_SITE_EMAIL = "Info@norrisconstruction.co";

async function getSiteEmail() {
  const prisma = getPrisma();
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "singleton" },
  });
  return settings?.email?.trim() || DEFAULT_SITE_EMAIL;
}

async function logEmailAttempt(input: {
  leadId: string;
  template: EmailTemplateKey;
  to: string;
  status: "sent" | "failed";
  error?: string | null;
}) {
  const prisma = getPrisma();
  await prisma.emailLog.create({
    data: {
      leadId: input.leadId,
      template: input.template,
      to: input.to,
      status: input.status,
      error: input.error ?? null,
    },
  });
}

async function sendTemplatedEmail(
  lead: Lead,
  template: EmailTemplateKey,
  to: string,
  siteEmail: string,
  extra?: { status?: LeadStatus },
): Promise<void> {
  const apiKey = getResendApiKey();
  const { subject, html } = renderEmailTemplate(template, lead, {
    siteEmail,
    status: extra?.status,
  });

  if (!apiKey) {
    await logEmailAttempt({
      leadId: lead.id,
      template,
      to,
      status: "failed",
      error: MISSING_RESEND_API_KEY,
    });
    return;
  }

  try {
    const resend = createResendClient(apiKey);
    const result = await resend.emails.send({
      from: getResendFromAddress(),
      to,
      subject,
      html,
    });

    if (result.error) {
      await logEmailAttempt({
        leadId: lead.id,
        template,
        to,
        status: "failed",
        error: result.error.message,
      });
      return;
    }

    await logEmailAttempt({
      leadId: lead.id,
      template,
      to,
      status: "sent",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Resend send failed";
    await logEmailAttempt({
      leadId: lead.id,
      template,
      to,
      status: "failed",
      error: message,
    });
  }
}

export async function sendLeadEmails(lead: Lead): Promise<void> {
  const siteEmail = await getSiteEmail();
  const notifyTo = getLeadNotifyEmail();
  await sendTemplatedEmail(lead, "lead_confirmation", lead.email, siteEmail);
  if (notifyTo) {
    await sendTemplatedEmail(lead, "lead_notify", notifyTo, siteEmail);
  }
}

export async function sendNurture(
  lead: Lead,
  templateKey: EmailTemplateKey,
): Promise<void> {
  if (templateKey !== "nurture_day2" && templateKey !== "nurture_day5") {
    return;
  }
  const siteEmail = await getSiteEmail();
  await sendTemplatedEmail(lead, templateKey, lead.email, siteEmail);
}

export async function sendStatusEmail(lead: Lead, status: LeadStatus): Promise<void> {
  const siteEmail = await getSiteEmail();
  await sendTemplatedEmail(lead, "status_update", lead.email, siteEmail, { status });
}
