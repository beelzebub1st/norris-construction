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

const BRAND = {
  orange: "#e06820",
  orangeHot: "#ff7a2f",
  ink: "#070707",
  inkSoft: "#121212",
  cream: "#f3efe8",
  stone: "#c4b8a8",
  mist: "#8a8278",
  white: "#ffffff",
  siteUrl: "https://norrisconstruction.co",
  logoUrl: "https://norrisconstruction.co/images/logo.png",
  phone: "(312) 483-6046",
  address: "2412 Stonybrook Drive, Wellington, FL",
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
  return `<tr>
  <td style="padding:12px 16px;border-bottom:1px solid rgba(196,184,168,0.18);font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.stone};width:38%;vertical-align:top">${escapeHtml(label)}</td>
  <td style="padding:12px 16px;border-bottom:1px solid rgba(196,184,168,0.18);font-size:15px;line-height:1.45;color:${BRAND.cream};vertical-align:top">${display}</td>
</tr>`;
}

function emailShell(opts: {
  preheader: string;
  eyebrow: string;
  title: string;
  bodyHtml: string;
  siteEmail: string;
  cta?: { label: string; href: string };
}) {
  const ctaBlock = opts.cta
    ? `<tr>
        <td style="padding:8px 36px 8px">
          <a href="${escapeHtml(opts.cta.href)}" style="display:inline-block;background:linear-gradient(135deg,${BRAND.orangeHot},${BRAND.orange});color:${BRAND.white};text-decoration:none;font-size:14px;font-weight:700;letter-spacing:0.04em;padding:14px 28px;border-radius:999px;box-shadow:0 10px 28px rgba(224,104,32,0.35)">${escapeHtml(opts.cta.label)}</a>
        </td>
      </tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(opts.title)}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.ink};color:${BRAND.cream};font-family:Georgia,'Times New Roman',serif">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${escapeHtml(opts.preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.ink};background-image:radial-gradient(ellipse at 10% 0%,rgba(224,104,32,0.18),transparent 55%)">
    <tr>
      <td align="center" style="padding:32px 16px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;border:1px solid rgba(196,184,168,0.22);border-radius:24px;overflow:hidden;background:${BRAND.inkSoft};box-shadow:0 24px 60px rgba(0,0,0,0.45)">
          <tr>
            <td style="padding:28px 36px 18px;border-bottom:1px solid rgba(196,184,168,0.16);background:linear-gradient(180deg,rgba(224,104,32,0.16),transparent)">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <img src="${BRAND.logoUrl}" alt="Norris Construction" width="168" style="display:block;max-width:168px;height:auto;border:0" />
                  </td>
                  <td align="right" style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:${BRAND.stone}">
                    Commercial GC
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 36px 8px;font-family:Arial,Helvetica,sans-serif">
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:${BRAND.orange}">${escapeHtml(opts.eyebrow)}</p>
              <h1 style="margin:12px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.2;font-weight:400;letter-spacing:0.02em;text-transform:uppercase;color:${BRAND.cream}">${escapeHtml(opts.title)}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 36px 8px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:rgba(243,239,232,0.82)">
              ${opts.bodyHtml}
            </td>
          </tr>
          ${ctaBlock}
          <tr>
            <td style="padding:28px 36px 32px">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(196,184,168,0.18)">
                <tr>
                  <td style="padding-top:22px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:${BRAND.mist}">
                    <strong style="color:${BRAND.cream}">Norris Construction Corp</strong><br />
                    Commercial renovations · TI · build-outs<br />
                    Palm Beach · Broward · Martin Counties<br />
                    <a href="tel:+13124836046" style="color:${BRAND.orange};text-decoration:none">${BRAND.phone}</a>
                    &nbsp;·&nbsp;
                    <a href="mailto:${escapeHtml(opts.siteEmail)}" style="color:${BRAND.orange};text-decoration:none">${escapeHtml(opts.siteEmail)}</a><br />
                    <span style="color:${BRAND.stone}">${BRAND.address}</span><br />
                    <a href="${BRAND.siteUrl}" style="color:${BRAND.stone};text-decoration:underline">${BRAND.siteUrl.replace("https://", "")}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <p style="margin:18px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:${BRAND.mist}">© Norris Construction Corp. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function renderEmailTemplate(
  key: EmailTemplateKey,
  lead: Lead,
  ctx: TemplateContext,
): { subject: string; html: string } {
  const name = escapeHtml(lead.name);
  const siteEmail = escapeHtml(ctx.siteEmail);

  switch (key) {
    case "lead_confirmation":
      return {
        subject: "We received your bid request — Norris Construction",
        html: emailShell({
          preheader: "Thanks for reaching out. Our commercial team will follow up shortly.",
          eyebrow: "Bid request received",
          title: `Thanks, ${lead.name}`,
          siteEmail: ctx.siteEmail,
          cta: {
            label: "Visit our site",
            href: BRAND.siteUrl,
          },
          bodyHtml: `
            <p style="margin:0 0 16px">Thank you for contacting <strong style="color:${BRAND.cream}">Norris Construction</strong>. We received your commercial project details and a team member will follow up shortly.</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 18px;border:1px solid rgba(196,184,168,0.2);border-radius:16px;overflow:hidden;background:rgba(7,7,7,0.55)">
              <tr><td style="padding:14px 16px;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${BRAND.orange};border-bottom:1px solid rgba(196,184,168,0.16)">What happens next</td></tr>
              <tr><td style="padding:14px 16px;color:rgba(243,239,232,0.78);font-size:14px;line-height:1.7">
                1. We review your scope and site details<br />
                2. We call or email to schedule a walkthrough<br />
                3. We outline options, timeline, and bid next steps
              </td></tr>
            </table>
            <p style="margin:0">Questions in the meantime? Email us at <a href="mailto:${siteEmail}" style="color:${BRAND.orange};text-decoration:none">${siteEmail}</a> or call <a href="tel:+13124836046" style="color:${BRAND.orange};text-decoration:none">${BRAND.phone}</a>.</p>
          `,
        }),
      };
    case "lead_notify":
      return {
        subject: `New bid request: ${lead.name}`,
        html: emailShell({
          preheader: `New commercial bid from ${lead.name}${lead.projectType ? ` — ${lead.projectType}` : ""}`,
          eyebrow: "Internal alert",
          title: "New bid request",
          siteEmail: ctx.siteEmail,
          cta: {
            label: "Open admin",
            href: `${BRAND.siteUrl}/admin/leads`,
          },
          bodyHtml: `
            <p style="margin:0 0 18px">A new estimate / contact submission just came in from the website.</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 18px;border:1px solid rgba(196,184,168,0.2);border-radius:16px;overflow:hidden;background:rgba(7,7,7,0.55)">
              ${leadField("Name", lead.name)}
              ${leadField("Email", lead.email)}
              ${leadField("Phone", lead.phone)}
              ${leadField("Project type", lead.projectType ?? undefined)}
              ${leadField("Area", lead.area ?? undefined)}
              ${leadField("Budget", lead.budgetRange ?? undefined)}
              ${leadField("Source", lead.source ?? undefined)}
              ${leadField("Page", lead.pageUrl ?? undefined)}
            </table>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 12px;border:1px solid rgba(196,184,168,0.2);border-radius:16px;overflow:hidden;background:rgba(7,7,7,0.55)">
              <tr><td style="padding:14px 16px;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${BRAND.orange};border-bottom:1px solid rgba(196,184,168,0.16)">Message</td></tr>
              <tr><td style="padding:14px 16px;color:${BRAND.cream};font-size:15px;line-height:1.6">${escapeHtml(lead.message)}</td></tr>
            </table>
            <p style="margin:0;font-size:12px;color:${BRAND.mist}">Lead ID: ${escapeHtml(lead.id)}</p>
          `,
        }),
      };
    case "nurture_day2":
      return {
        subject: "Still planning your commercial project?",
        html: emailShell({
          preheader: "Happy to answer questions or set up a quick call.",
          eyebrow: "Quick check-in",
          title: "Still thinking it through?",
          siteEmail: ctx.siteEmail,
          cta: {
            label: "Request a Bid",
            href: `${BRAND.siteUrl}/contact`,
          },
          bodyHtml: `
            <p style="margin:0 0 16px">Hi ${name},</p>
            <p style="margin:0 0 16px">Just checking in from Norris Construction. If you are still exploring a renovation, tenant improvement, or build-out, we are happy to answer questions or set up a short call.</p>
            <p style="margin:0">Reply to this email or reach us at <a href="mailto:${siteEmail}" style="color:${BRAND.orange};text-decoration:none">${siteEmail}</a>.</p>
          `,
        }),
      };
    case "nurture_day5":
      return {
        subject: "Ready when you are — Norris Construction",
        html: emailShell({
          preheader: "We can walk through timelines, budgets, and next steps.",
          eyebrow: "When you are ready",
          title: "We would love to hear from you",
          siteEmail: ctx.siteEmail,
          cta: {
            label: "Request a Bid",
            href: `${BRAND.siteUrl}/contact`,
          },
          bodyHtml: `
            <p style="margin:0 0 16px">Hi ${name},</p>
            <p style="margin:0 0 16px">It has been a few days since you reached out. When you are ready, we can walk through timelines, budget ranges, and how we approach South Florida commercial projects.</p>
            <p style="margin:0">Email <a href="mailto:${siteEmail}" style="color:${BRAND.orange};text-decoration:none">${siteEmail}</a> or call <a href="tel:+13124836046" style="color:${BRAND.orange};text-decoration:none">${BRAND.phone}</a> whenever it works for you.</p>
          `,
        }),
      };
    case "status_update": {
      const statusLabel = ctx.status
        ? LEAD_STATUS_LABELS[ctx.status]
        : "updated";
      return {
        subject: `Update on your Norris Construction inquiry (${statusLabel})`,
        html: emailShell({
          preheader: `Your inquiry is now ${statusLabel}.`,
          eyebrow: "Project update",
          title: "Status update",
          siteEmail: ctx.siteEmail,
          bodyHtml: `
            <p style="margin:0 0 16px">Hi ${name},</p>
            <p style="margin:0 0 18px">Your project inquiry status is now:</p>
            <p style="margin:0 0 18px"><span style="display:inline-block;background:rgba(224,104,32,0.18);border:1px solid rgba(224,104,32,0.45);color:${BRAND.orangeHot};font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:10px 16px;border-radius:999px">${escapeHtml(statusLabel)}</span></p>
            <p style="margin:0">Our team will keep you posted on next steps. Questions? Email <a href="mailto:${siteEmail}" style="color:${BRAND.orange};text-decoration:none">${siteEmail}</a>.</p>
          `,
        }),
      };
    }
    default: {
      const _exhaustive: never = key;
      return _exhaustive;
    }
  }
}
