import type { Metadata } from "next";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { EstimateCta } from "@/components/sections/EstimateCta";
import { listServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom homes, renovations, kitchens, baths, additions, and outdoor living across South Florida.",
};

export default async function ServicesPage() {
  const services = await listServices();

  return (
    <>
      <section className="border-b border-[var(--color-stone)]/15 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="font-display text-4xl text-[var(--color-cream)] sm:text-5xl">
            Services
          </h1>
          <p className="mt-4 max-w-2xl text-[var(--color-cream)]/75">
            Full-service residential construction for discerning homeowners across
            Miami-Dade and Broward.
          </p>
        </div>
      </section>
      <ServicesSection services={services} />
      <EstimateCta />
    </>
  );
}
