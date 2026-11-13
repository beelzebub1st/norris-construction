"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import { ADMIN_NAV_GROUPS } from "@/components/admin/admin-nav";

function navActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = (
    <>
      <div className="mb-6 border-b border-white/10 pb-5">
        <Link href="/admin" className="group block" onClick={() => setOpen(false)}>
          <p className="font-display text-lg tracking-[0.04em] text-white">
            Norris
            <span className="text-[#E06820]"> Admin</span>
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            Content · pipeline · growth
          </p>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-6">
        {ADMIN_NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              {group.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const active = navActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`relative rounded-lg px-3 py-2 text-sm transition ${
                      active
                        ? "bg-[#E06820]/15 text-white shadow-[inset_3px_0_0_0_#E06820]"
                        : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
                    }`}
                  >
                    <span className="block font-medium">{item.label}</span>
                    {item.description ? (
                      <span className="mt-0.5 block text-[11px] text-zinc-500">
                        {item.description}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-6 space-y-3 border-t border-white/10 pt-4">
        <Link
          href="/"
          target="_blank"
          rel="noreferrer"
          className="block rounded-lg px-3 py-2 text-xs text-zinc-400 transition hover:bg-white/5 hover:text-white"
        >
          View live site ↗
        </Link>
        <AdminLogoutButton />
      </div>
    </>
  );

  return (
    <div className="admin-shell min-h-screen bg-[#0a0a0b] text-zinc-100">
      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 0% 0%, rgba(224,104,32,0.12), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(255,255,255,0.04), transparent 50%)",
        }}
        aria-hidden
      />

      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-[#0a0a0b]/85 px-4 py-3 backdrop-blur-md lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-lg border border-white/10 px-3 py-2 text-xs font-medium uppercase tracking-wide text-zinc-300"
          aria-label="Open menu"
        >
          Menu
        </button>
        <p className="font-display text-base text-white">
          Norris <span className="text-[#E06820]">Admin</span>
        </p>
        <Link href="/" className="text-xs text-zinc-500">
          Site
        </Link>
      </header>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <aside className="admin-scroll absolute inset-y-0 left-0 flex w-[min(18rem,88vw)] flex-col overflow-y-auto bg-[#121214] p-4 shadow-2xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mb-2 self-end text-xs text-zinc-500"
            >
              Close
            </button>
            {nav}
          </aside>
        </div>
      ) : null}

      <div className="relative flex min-h-screen w-full">
        <aside className="admin-scroll sticky top-0 hidden h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-white/10 bg-[#101012]/90 p-4 backdrop-blur-sm lg:flex">
          {nav}
        </aside>
        <main className="admin-scroll min-w-0 flex-1 overflow-x-auto px-4 py-6 sm:px-8 lg:px-12 lg:py-8 xl:px-14">
          {children}
        </main>
      </div>
    </div>
  );
}
