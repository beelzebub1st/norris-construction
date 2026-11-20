import "dotenv/config";
import type { Lead } from "@prisma/client";
import { Resend } from "resend";
import { renderEmailTemplate } from "../lib/email/templates";

const apiKey = process.env.RESEND_API_KEY?.trim();
const from =
  process.env.RESEND_FROM?.trim() ||
  "Norris Construction <onboarding@resend.dev>";
const to =
  process.env.LEAD_NOTIFY_EMAIL?.trim() || "norrisconstructionss@gmail.com";

if (!apiKey) {
  console.error("RESEND_API_KEY missing");
  process.exit(1);
}

const lead = {
  id: `test_${Date.now()}`,
  name: "Alen Test Bid",
  email: "alen.test@example.com",
  phone: "(561) 555-0142",
  message:
    "This is a test bid request to confirm Gmail delivery and the new branded email design. Please ignore if received.",
  projectType: "Office Build-Out",
  area: "West Palm Beach",
  budgetRange: "$150k–$250k",
  source: "manual-test",
  pageUrl: "https://norrisconstruction.co/contact",
  createdAt: new Date(),
  updatedAt: new Date(),
} as Lead;

const { subject, html } = renderEmailTemplate("lead_notify", lead, {
  siteEmail: "Info@norrisconstruction.co",
});

async function main() {
  const resend = new Resend(apiKey);
  const result = await resend.emails.send({ from, to, subject, html });

  if (result.error) {
    console.error("Send failed:", result.error);
    process.exit(1);
  }

  console.log("Sent OK:", result.data);
  console.log("To:", to);
  console.log("From:", from);
  console.log("Subject:", subject);
}

main();
