"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const NID_COOKIE = "nid";

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function ensureVisitorId(): void {
  if (readCookie(NID_COOKIE)) return;
  const id = crypto.randomUUID();
  document.cookie = `${NID_COOKIE}=${encodeURIComponent(id)};path=/;max-age=31536000;samesite=lax`;
}

function sendTrack(path: string, referrer: string | null) {
  void fetch("/api/track", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ path, referrer }),
    keepalive: true,
  });
}

export function VisitorTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    ensureVisitorId();
    const query = searchParams.toString();
    const path = query ? `${pathname}?${query}` : pathname;
    if (lastPath.current === path) return;
    lastPath.current = path;
    const ref = document.referrer || null;
    sendTrack(path, ref);
  }, [pathname, searchParams]);

  return null;
}
