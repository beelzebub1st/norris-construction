import { getIronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type AdminSessionData = {
  authenticated?: boolean;
};

const COOKIE_NAME = "norris_admin";

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET?.trim();
  if (secret && secret.length >= 32) return secret;
  // Demo / static deploys without env — marketing site still needs a stable secret.
  if (process.env.NODE_ENV !== "production" || !process.env.DATABASE_URL) {
    return "norris-demo-session-secret-min-32-chars";
  }
  throw new Error("SESSION_SECRET must be at least 32 characters");
}

function sessionOptions(): SessionOptions {
  return {
    password: getSessionSecret(),
    cookieName: COOKIE_NAME,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    },
  };
}

export async function getSession() {
  return getIronSession<AdminSessionData>(await cookies(), sessionOptions());
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session.authenticated) {
    redirect("/admin/login");
  }
  return session;
}
