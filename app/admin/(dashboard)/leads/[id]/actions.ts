"use server";

import { type LeadStatus } from "@prisma/client";
import { redirect } from "next/navigation";
import { sendStatusEmail } from "@/lib/email/send";
import { formString } from "@/lib/admin/form";
import { addLeadNote, updateLeadStatus } from "@/lib/leads/update-status";
import { requireAdmin } from "@/lib/auth/session";

export async function updateLeadFromAdmin(leadId: string, formData: FormData) {
  await requireAdmin();

  const statusRaw = formString(formData, "status");
  const noteBody = formString(formData, "note").trim();

  if (statusRaw) {
    const result = await updateLeadStatus(leadId, statusRaw as LeadStatus);
    if (!result.ok) {
      throw new Error(result.error);
    }
    if (result.previousStatus !== result.lead.status) {
      try {
        await sendStatusEmail(result.lead, result.lead.status);
      } catch {
        // non-blocking
      }
    }
  }

  if (noteBody) {
    const noteResult = await addLeadNote(leadId, noteBody);
    if (!noteResult.ok && noteResult.error !== "empty") {
      throw new Error(noteResult.error);
    }
  }

  redirect(`/admin/leads/${leadId}`);
}
