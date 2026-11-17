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
  const items = [
    yearsInBusiness,
    licenseText,
    insuranceText,
    "Palm Beach · Broward · Martin",
    "Design-build partners",
    "On-time craftsmanship",
    "Free project estimate",
  ];
  const loop = [...items, ...items];

  return (
    <section className="border-y border-[var(--color-stone)]/15 bg-[var(--color-ink-soft)] py-4">
      <div className="marquee">
        <div className="marquee-track">
          {loop.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-cream)]/70"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-orange)]" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
