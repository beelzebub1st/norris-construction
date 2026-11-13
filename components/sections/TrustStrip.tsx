import { Reveal } from "@/components/motion/Reveal";

type TrustStripProps = {
  licenseText: string;
  insuranceText: string;
  yearsInBusiness: string;
};

export function TrustStrip({
  licenseText,
  insuranceText,
  yearsInBusiness,
}: TrustStripProps) {
  return (
    <section className="border-b border-[var(--color-stone)]/15 bg-[var(--color-ink)]">
      <Reveal>
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="font-display text-lg text-[var(--color-cream)]">
            Trusted Miami craftsmanship
          </p>
          <ul className="flex flex-col gap-2 text-sm text-[var(--color-cream)]/75 sm:flex-row sm:gap-8">
            <li>{licenseText}</li>
            <li>{insuranceText}</li>
            <li>{yearsInBusiness}</li>
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
