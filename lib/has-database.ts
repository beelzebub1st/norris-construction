/** True when a real Postgres URL is configured (not a placeholder). */
export function hasDatabase() {
  const url = process.env.DATABASE_URL?.trim() ?? "";
  if (!url) return false;
  if (url.includes("user:pass@localhost")) return false;
  if (url.includes("example.com")) return false;
  // Local Docker URLs must not be used on Vercel (CLI may upload a local .env).
  if (
    process.env.VERCEL === "1" &&
    /localhost|127\.0\.0\.1/.test(url)
  ) {
    return false;
  }
  return true;
}
