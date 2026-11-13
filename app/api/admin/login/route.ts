import { verifyAdminPassword } from "@/lib/auth/password";
import { getSession } from "@/lib/auth/session";
import { rateLimit } from "@/lib/rate-limit";

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit(`admin-login:${ip}`);
  if (!limited.ok) {
    return Response.json(
      { ok: false, error: "Too many login attempts. Try again in a minute." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const password =
    typeof body === "object" &&
    body !== null &&
    "password" in body &&
    typeof (body as { password: unknown }).password === "string"
      ? (body as { password: string }).password
      : "";

  if (!password) {
    return Response.json({ ok: false, error: "Password required" }, { status: 400 });
  }

  if (!(await verifyAdminPassword(password))) {
    return Response.json({ ok: false, error: "Invalid password" }, { status: 401 });
  }

  const session = await getSession();
  session.authenticated = true;
  await session.save();

  return Response.json({ ok: true });
}
