"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Login failed");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070707] px-4">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(224,104,32,0.18), transparent 55%), radial-gradient(ellipse 50% 40% at 80% 100%, rgba(255,255,255,0.04), transparent 50%)",
        }}
        aria-hidden
      />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#101012]/90 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E06820]">
          Norris Construction
        </p>
        <h1 className="mt-2 font-display text-3xl text-white">Admin access</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Manage leads, content, SEO, and automations.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
            Password
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-[#0c0c0e] px-3 py-2.5 text-sm text-white outline-none transition focus:border-[#E06820]/50 focus:ring-1 focus:ring-[#E06820]/35"
            />
          </label>
          {error ? (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-[#E06820] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(224,104,32,0.3)] transition hover:brightness-110 disabled:opacity-60"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
