import { PrismaClient } from "@prisma/client";
const p = new PrismaClient();
const lead = await p.lead.findFirst({
  where: { source: "gmail_notify_test" },
  orderBy: { createdAt: "desc" },
});
const logs = lead
  ? await p.emailLog.findMany({
      where: { leadId: lead.id },
      orderBy: { createdAt: "desc" },
    })
  : [];
console.log(JSON.stringify({ leadId: lead?.id, logs }, null, 2));
await p.$disconnect();
