import type { Lead } from "@prisma/client";

export async function sendLeadEmails(lead: Lead): Promise<void> {
  void lead;
}
