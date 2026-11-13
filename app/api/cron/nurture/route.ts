import { LeadStatus } from "@prisma/client";
import { nurtureDue } from "@/lib/email/nurture";
import { sendNurture } from "@/lib/email/send";
import { getPrisma } from "@/lib/prisma";

function authorizeCron(request: Request): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return false;
  const auth = request.headers.get("authorization");
  return auth === `Bearer ${secret}`;
}

async function runNurtureCron() {
  const prisma = getPrisma();
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "singleton" },
  });

  if (!settings?.nurtureEnabled) {
    return { ok: true as const, skipped: true as const, sent: 0 };
  }

  const leads = await prisma.lead.findMany({
    where: { status: { notIn: [LeadStatus.lost, LeadStatus.won] } },
    include: {
      emails: {
        where: {
          template: { in: ["nurture_day2", "nurture_day5"] },
        },
        select: { template: true },
      },
    },
  });

  const now = new Date();
  let sent = 0;

  for (const lead of leads) {
    const sentTemplates = lead.emails.map((row) => row.template);
    const template = nurtureDue(lead.createdAt, now, sentTemplates);
    if (!template) continue;
    await sendNurture(lead, template);
    sent += 1;
  }

  return { ok: true as const, skipped: false as const, sent };
}

export async function GET(request: Request) {
  if (!authorizeCron(request)) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const result = await runNurtureCron();
  return Response.json(result);
}

export async function POST(request: Request) {
  if (!authorizeCron(request)) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const result = await runNurtureCron();
  return Response.json(result);
}
