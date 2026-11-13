import Image from "next/image";
import Link from "next/link";
import { telHref, smsHref } from "@/lib/site-settings";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

type HeaderProps = {
  phone: string;
  sms: string;
};

export function Header({ phone, sms }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-stone)]/20 bg-[var(--color-ink)]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Norris Construction"
            width={140}
            height={48}
            className="h-10 w-auto sm:h-11"
            priority
          />
          <span className="sr-only font-display">Norris Construction</span>
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
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={smsHref(sms)}
            className="text-sm font-medium text-[var(--color-cream)]/90 transition-colors hover:text-[var(--color-orange)]"
          >
            Text
          </a>
          <Link
            href="/contact"
            className="rounded-full bg-[var(--color-orange)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Get estimate
          </Link>
        </div>

        <a
          href={telHref(phone)}
          className="rounded-full bg-[var(--color-orange)] px-4 py-2 text-sm font-semibold text-white md:hidden"
        >
          Call
        </a>
      </div>
    </header>
  );
}
