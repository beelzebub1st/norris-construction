/** True when a real Postgres URL is configured (not a placeholder). */
export function hasDatabase() {
  const url = process.env.DATABASE_URL?.trim() ?? "";
  if (!url) return false;
  if (url.includes("user:pass@localhost")) return false;
  if (url.includes("example.com")) return false;
  return true;
}
