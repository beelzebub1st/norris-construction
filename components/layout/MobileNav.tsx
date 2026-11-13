"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 w-10 items-center justify-center rounded border border-[var(--color-stone)]/35 text-[var(--color-cream)]"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span className="flex flex-col gap-1.5" aria-hidden>
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
        </span>
      </button>

      {open ? (
        <div
          id="mobile-nav-panel"
          className="absolute right-0 z-50 mt-2 w-56 rounded border border-[var(--color-stone)]/25 bg-[var(--color-ink)] py-2 shadow-lg"
        >
          <nav aria-label="Mobile">
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm text-[var(--color-cream)]/90 hover:text-[var(--color-orange)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
