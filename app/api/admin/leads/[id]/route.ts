import type { LeadStatus } from "@prisma/client";
import { requireAdminApi } from "@/lib/auth/require-admin-api";
import { sendStatusEmail } from "@/lib/email/send";
import { addLeadNote, updateLeadStatus } from "@/lib/leads/update-status";

const LEAD_STATUSES = new Set<LeadStatus>([
  "new",
  "contacted",
  "qualified",
  "quoted",
  "won",
  "lost",
]);

type PatchBody = {
  status?: unknown;
  note?: unknown;
};

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id } = await context.params;

  let body: PatchBody;
  try {
    body = (await request.json()) as PatchBody;
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  let lead = null;
  let statusChanged = false;

  if (body.status !== undefined) {
    if (typeof body.status !== "string" || !LEAD_STATUSES.has(body.status as LeadStatus)) {
      return Response.json({ ok: false, error: "Invalid status" }, { status: 400 });
    }
    const result = await updateLeadStatus(id, body.status as LeadStatus);
    if (!result.ok) {
      const status = result.error === "not_found" ? 404 : 400;
      return Response.json({ ok: false, error: result.error }, { status });
    }
    lead = result.lead;
    statusChanged = result.previousStatus !== result.lead.status;
    if (statusChanged) {
      try {
        await sendStatusEmail(result.lead, result.lead.status);
      } catch {
        // Email failures must not block admin updates
      }
    }
  }

  if (body.note !== undefined) {
    if (typeof body.note !== "string") {
      return Response.json({ ok: false, error: "Invalid note" }, { status: 400 });
    }
    const noteResult = await addLeadNote(id, body.note);
    if (!noteResult.ok) {
      const status = noteResult.error === "not_found" ? 404 : 400;
      return Response.json({ ok: false, error: noteResult.error }, { status });
    }
  }

  if (!lead) {
    const { getPrisma } = await import("@/lib/prisma");
    lead = await getPrisma().lead.findUnique({ where: { id } });
    if (!lead) {
      return Response.json({ ok: false, error: "not_found" }, { status: 404 });
    }
  }

  return Response.json({ ok: true, lead });
}
