import { createLeadFromEstimate } from "@/lib/leads/create-lead";
import { parseEstimateInput } from "@/lib/leads/validate";
import { rateLimit } from "@/lib/rate-limit";

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

type ContactBody = Record<string, unknown> & { website?: string };

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit(`contact:${ip}`);
  if (!limited.ok) {
    return Response.json(
      { ok: false, error: "Too many requests. Try again in a minute." },
      { status: 429 },
    );
  }

  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { website, ...rest } = body;
  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(rest)) {
    if (value === "") continue;
    sanitized[key] = value;
  }
  const parsed = parseEstimateInput({
    ...sanitized,
    honeypot: typeof website === "string" ? website : undefined,
  });

  if (!parsed.success) {
    return Response.json(
      { ok: false, error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const result = await createLeadFromEstimate(parsed.data, { ip });

  if (!("leadId" in result)) {
    return Response.json({ ok: true });
  }

  return Response.json({ ok: true, leadId: result.leadId });
}
