import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const home = await fetch("http://127.0.0.1:3001/");
const homeHtml = await home.text();
console.log(
  `home_status=${home.status} has_commercial=${/Commercial Construction/.test(homeHtml)}`,
);

const lead = await prisma.lead.findFirst({
  where: { source: "neon_e2e" },
  orderBy: { createdAt: "desc" },
});
console.log(`lead_found=${!!lead} id=${lead?.id ?? ""} name=${lead?.name ?? ""}`);

const cleaned = await prisma.lead.deleteMany({ where: { source: "neon_e2e" } });
console.log(`cleaned=${cleaned.count}`);

await prisma.$disconnect();
if (!lead) process.exit(1);
