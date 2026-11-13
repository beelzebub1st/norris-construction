"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminLogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleLogout() {
    setPending(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={pending}
      className="w-full rounded-lg border border-white/10 px-3 py-2.5 text-left text-sm text-zinc-400 transition hover:border-[#E06820]/40 hover:bg-[#E06820]/10 hover:text-white disabled:opacity-50"
    >
      {pending ? "Signing out…" : "Log out"}
    </button>
  );
}
