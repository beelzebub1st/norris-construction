"use client";

import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "@/components/layout/MobileNav";
import { useConversion } from "@/components/conversion/ConversionProvider";
import { telHref } from "@/lib/phone-links";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
] as const;

type HeaderProps = {
  phone: string;
  sms: string;
};

export function Header({ phone }: HeaderProps) {
  const { openContact, openQuiz } = useConversion();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-stone)]/15 bg-[var(--color-ink)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[var(--header-h)] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Norris Construction"
            width={150}
            height={52}
            className="h-10 w-auto sm:h-11"
            priority
          />
        </Link>

        <nav
          className="hidden items-center gap-6 text-sm text-[var(--color-cream)]/90 md:flex"
          aria-label="Main"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-[var(--color-orange)]"
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={openContact}
            className="transition-colors hover:text-[var(--color-orange)]"
          >
            Contact
          </button>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={telHref(phone)}
            className="text-sm font-semibold text-[var(--color-cream)] transition-colors hover:text-[var(--color-orange)]"
          >
            Call
          </a>
          <button type="button" onClick={openQuiz} className="btn-primary !py-2.5 !px-5">
            Quote quiz
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <MobileNav />
          <a
            href={telHref(phone)}
            className="rounded-full bg-[var(--color-orange)] px-4 py-2 text-sm font-semibold text-white"
          >
            Call
          </a>
        </div>
      </div>
    </header>
  );
}
