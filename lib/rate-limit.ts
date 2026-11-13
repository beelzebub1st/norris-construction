const hits = new Map<string, { count: number; reset: number }>();

export function rateLimit(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const row = hits.get(key);
  if (!row || now > row.reset) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return { ok: true };
  }
  if (row.count >= limit) return { ok: false };
  row.count += 1;
  return { ok: true };
}
