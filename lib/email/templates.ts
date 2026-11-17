import type { Lead, LeadStatus } from "@prisma/client";
import { LEAD_STATUS_LABELS } from "@/lib/leads/status-labels";

export const EMAIL_TEMPLATE_KEYS = [
  "lead_confirmation",
  "lead_notify",
  "nurture_day2",
  "nurture_day5",
  "status_update",
] as const;

export type EmailTemplateKey = (typeof EMAIL_TEMPLATE_KEYS)[number];

export type TemplateContext = {
  siteEmail: string;
  status?: LeadStatus;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function leadField(label: string, value: string | null | undefined) {
  const display = value?.trim() ? escapeHtml(value) : "—";
  return `<tr><td style="padding:4px 12px 4px 0;font-weight:600">${escapeHtml(label)}</td><td>${display}</td></tr>`;
}

export function renderEmailTemplate(
  key: EmailTemplateKey,
  lead: Lead,
  ctx: TemplateContext,
): { subject: string; html: string } {
  const name = escapeHtml(lead.name);

  switch (key) {
    case "lead_confirmation":
      return {
        subject: "Thanks for reaching out to Norris Construction",
        html: `<p>Hi ${name},</p>
<p>Thank you for contacting Norris Construction. We received your project details and a team member will follow up shortly.</p>
<p><strong>What happens next:</strong></p>
<ul>
  <li>We review your message and project scope</li>
  <li>We call or email to schedule a consultation</li>
  <li>We outline options and next steps for your build or remodel</li>
</ul>
<p>Questions in the meantime? Email us at <a href="mailto:${escapeHtml(ctx.siteEmail)}">${escapeHtml(ctx.siteEmail)}</a>.</p>
<p>— Norris Construction</p>`,
      };
    case "lead_notify":
      return {
        subject: `New lead: ${lead.name}`,
        html: `<p><strong>New estimate / contact submission</strong></p>
<table>
${leadField("Name", lead.name)}
${leadField("Email", lead.email)}
${leadField("Phone", lead.phone)}
${leadField("Project type", lead.projectType ?? undefined)}
${leadField("Area", lead.area ?? undefined)}
${leadField("Budget", lead.budgetRange ?? undefined)}
${leadField("Source", lead.source ?? undefined)}
${leadField("Page", lead.pageUrl ?? undefined)}
</table>
<p><strong>Message</strong></p>
<p>${escapeHtml(lead.message)}</p>
<p>Lead ID: ${escapeHtml(lead.id)}</p>`,
      };
    case "nurture_day2":
      return {
        subject: "Still thinking about your project?",
        html: `<p>Hi ${name},</p>
<p>Just checking in from Norris Construction. If you are still exploring your remodel or build, we are happy to answer questions or set up a quick call.</p>
<p>Reply to this email or contact us at <a href="mailto:${escapeHtml(ctx.siteEmail)}">${escapeHtml(ctx.siteEmail)}</a>.</p>`,
      };
    case "nurture_day5":
      return {
        subject: "We would love to hear from you",
        html: `<p>Hi ${name},</p>
<p>It has been a few days since you reached out. When you are ready, we can walk through timelines, budget ranges, and how we approach South Florida commercial projects.</p>
<p>Email <a href="mailto:${escapeHtml(ctx.siteEmail)}">${escapeHtml(ctx.siteEmail)}</a> whenever it works for you.</p>`,
      };
    case "status_update": {
      const statusLabel = ctx.status
        ? LEAD_STATUS_LABELS[ctx.status]
        : "updated";
      return {
        subject: `Update on your Norris Construction inquiry (${statusLabel})`,
        html: `<p>Hi ${name},</p>
<p>Your project inquiry status is now <strong>${escapeHtml(statusLabel)}</strong>. Our team will keep you posted on next steps.</p>
<p>Questions? Email <a href="mailto:${escapeHtml(ctx.siteEmail)}">${escapeHtml(ctx.siteEmail)}</a>.</p>
<p>— Norris Construction</p>`,
      };
    }
    default: {
      const _exhaustive: never = key;
      return _exhaustive;
    }
  }
}
