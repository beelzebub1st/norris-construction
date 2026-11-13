import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { EstimateCta } from "@/components/sections/EstimateCta";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "About",
  description:
    "Norris Construction — Miami luxury homes and remodeling with clear communication and craft-led execution.",
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <section className="border-b border-[var(--color-stone)]/15 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="font-display text-4xl text-[var(--color-cream)] sm:text-5xl">
            About Norris
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-cream)]/75">
            Family-run construction rooted in South Florida — built for
            homeowners who expect precision, transparency, and work that lasts.
          </p>
        </div>
      </section>

      <TrustStrip
        licenseText={settings.licenseText}
        insuranceText={settings.insuranceText}
        yearsInBusiness={settings.yearsInBusiness}
      />

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <h2 className="font-display text-2xl text-[var(--color-cream)] sm:text-3xl">
              Our story
            </h2>
            <div className="mt-6 space-y-4 text-[var(--color-cream)]/80 leading-relaxed">
              <p>
                Norris Construction grew out of decades of hands-on remodeling and
                custom home work across Miami-Dade and Broward. We coordinate
                architects, engineers, and trades under one accountable team — so
                your project stays on schedule and on brand.
              </p>
              <p>
                Every engagement starts with listening: how you live, entertain,
                and maintain your property in South Florida&apos;s climate. From
                there we align scope, finishes, and phasing before we break
                ground.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="mt-12 font-display text-2xl text-[var(--color-cream)] sm:text-3xl">
              Team & credentials
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-[var(--color-cream)]/75">
              <li>
                <span className="text-[var(--color-cream)]">Leadership</span> —
                Photos and bios coming soon.
              </li>
              <li>
                <span className="text-[var(--color-cream)]">License</span> —{" "}
                {settings.licenseText}
              </li>
              <li>
                <span className="text-[var(--color-cream)]">Insurance</span> —{" "}
                {settings.insuranceText}
              </li>
              <li>
                <span className="text-[var(--color-cream)]">Service area</span>{" "}
                — {settings.address} and surrounding neighborhoods.
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <EstimateCta />
    </>
  );
}
