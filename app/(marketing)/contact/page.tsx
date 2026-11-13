import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { localBusinessJsonLd } from "@/lib/seo/json-ld-data";
import { getSiteSettings, telHref, smsHref } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a construction estimate for your Miami-area remodel or custom home project.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <JsonLd data={localBusinessJsonLd(settings)} />
      <section className="border-b border-[var(--color-stone)]/15 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="font-display text-4xl text-[var(--color-cream)] sm:text-5xl">
            Get an estimate
          </h1>
          <p className="mt-4 max-w-2xl text-[var(--color-cream)]/75">
            Share a few details about your project. We respond within one
            business day.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_minmax(0,280px)] lg:gap-16">
          <Reveal>
            <ContactForm />
          </Reveal>

          <aside className="border-t border-[var(--color-stone)]/20 pt-8 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
            <h2 className="font-display text-xl text-[var(--color-cream)]">
              Prefer to talk?
            </h2>
            <p className="mt-2 text-sm text-[var(--color-cream)]/70">
              Call or text during business hours — same team that reviews your
              form.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a
                  href={telHref(settings.phone)}
                  className="font-medium text-[var(--color-cream)] transition-colors hover:text-[var(--color-orange)]"
                >
                  Call {settings.phone}
                </a>
              </li>
              <li>
                <a
                  href={smsHref(settings.sms)}
                  className="font-medium text-[var(--color-cream)] transition-colors hover:text-[var(--color-orange)]"
                >
                  Text {settings.sms}
                </a>
              </li>
              <li className="text-[var(--color-cream)]/60">{settings.email}</li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
