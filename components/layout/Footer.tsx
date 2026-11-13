import Link from "next/link";
import { telHref } from "@/lib/site-settings";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

type FooterProps = {
  phone: string;
  email: string;
  address: string;
  licenseText: string;
  insuranceText: string;
};

export function Footer({
  phone,
  email,
  address,
  licenseText,
  insuranceText,
}: FooterProps) {
  return (
    <footer className="border-t border-[var(--color-stone)]/20 bg-[var(--color-ink)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-3 text-sm text-[var(--color-cream)]/80">
          <p className="font-display text-lg text-[var(--color-cream)]">
            Norris Construction
          </p>
          <p>{address}</p>
          <p>
            <a
              href={telHref(phone)}
              className="hover:text-[var(--color-orange)]"
            >
              {phone}
            </a>
          </p>
          <p>
            <a
              href={`mailto:${email}`}
              className="hover:text-[var(--color-orange)]"
            >
              {email}
            </a>
          </p>
          <p className="text-[var(--color-cream)]/60">{licenseText}</p>
          <p className="text-[var(--color-cream)]/60">{insuranceText}</p>
        </div>

        <nav
          className="flex flex-col gap-2 text-sm text-[var(--color-cream)]/80"
          aria-label="Footer"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="w-fit transition-colors hover:text-[var(--color-orange)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="text-sm text-[var(--color-cream)]/60 md:col-span-2 lg:col-span-1 lg:text-right">
          <p>&copy; Norris Construction. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
