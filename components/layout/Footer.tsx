"use client";

import Image from "next/image";
import Link from "next/link";
import { useConversion } from "@/components/conversion/ConversionProvider";
import { telHref } from "@/lib/phone-links";

const exploreLinks = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

const areaLinks = [
  { href: "/areas/miami-beach", label: "Miami Beach" },
  { href: "/areas/coral-gables", label: "Coral Gables" },
  { href: "/areas/brickell", label: "Brickell" },
  { href: "/areas/fort-lauderdale", label: "Fort Lauderdale" },
] as const;

const serviceLinks = [
  { href: "/services/custom-homes", label: "Custom Homes" },
  { href: "/services/renovations", label: "Renovations" },
  { href: "/services/kitchens", label: "Kitchens" },
  { href: "/services/bathrooms", label: "Bathrooms" },
  { href: "/services/outdoor-living", label: "Outdoor Living" },
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
  const { openQuiz, openContact } = useConversion();

  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-stone)]/20 bg-[var(--color-ink)]">
      <div
        className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-[var(--color-orange)]/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-16">
        <div className="flex flex-col gap-8 border-b border-[var(--color-stone)]/15 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <Image
              src="/images/logo.png"
              alt="Norris Construction"
              width={220}
              height={72}
              className="h-14 w-auto sm:h-16"
            />
            <p className="mt-5 text-sm leading-relaxed text-[var(--color-cream)]/70">
              Luxury custom homes and remodeling across Miami and South Florida —
              clear estimates, accountable supervision, finishes that photograph.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={openQuiz}
              className="btn-primary touch-manipulation"
            >
              Start quote quiz
            </button>
            <button
              type="button"
              onClick={openContact}
              className="btn-ghost touch-manipulation"
            >
              Contact us
            </button>
          </div>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-orange)]">
              Contact
            </p>
            <ul className="mt-4 space-y-3 text-sm text-[var(--color-cream)]/80">
              <li>{address}</li>
              <li>
                <a
                  href={telHref(phone)}
                  className="transition-colors hover:text-[var(--color-orange)]"
                >
                  {phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="transition-colors hover:text-[var(--color-orange)]"
                >
                  {email}
                </a>
              </li>
              <li className="pt-2 text-[var(--color-cream)]/55">{licenseText}</li>
              <li className="text-[var(--color-cream)]/55">{insuranceText}</li>
            </ul>
          </div>

          <nav aria-label="Explore">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-orange)]">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-[var(--color-cream)]/80">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-[var(--color-orange)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-orange)]">
              Services
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-[var(--color-cream)]/80">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-[var(--color-orange)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Areas">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-orange)]">
              Areas
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-[var(--color-cream)]/80">
              {areaLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-[var(--color-orange)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-[var(--color-stone)]/15 py-6 text-xs text-[var(--color-cream)]/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© Norris Construction. All rights reserved.</p>
          <p>Miami-Dade · Broward · South Florida</p>
        </div>
      </div>
    </footer>
  );
}
