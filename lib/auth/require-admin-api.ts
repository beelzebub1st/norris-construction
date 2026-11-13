import { getSession } from "@/lib/auth/session";

export async function requireAdminApi(): Promise<Response | null> {
  const session = await getSession();
  if (!session.authenticated) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
