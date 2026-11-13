import { getPrisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

type TrackBody = { path?: unknown; referrer?: unknown };

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit(`track:${ip}`, 120, 60_000);
  if (!limited.ok) {
    return Response.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  let body: TrackBody;
  try {
    body = (await request.json()) as TrackBody;
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (typeof body.path !== "string" || !body.path.trim()) {
    return Response.json({ ok: false, error: "path required" }, { status: 400 });
  }

  const referrer =
    typeof body.referrer === "string" && body.referrer.trim()
      ? body.referrer.trim()
      : null;

  const userAgent = request.headers.get("user-agent");

  await getPrisma().visitorEvent.create({
    data: {
      path: body.path.trim().slice(0, 2048),
      referrer: referrer?.slice(0, 2048),
      userAgent: userAgent?.slice(0, 512),
    },
  });

  return Response.json({ ok: true });
}
