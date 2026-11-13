"use client";

import { useConversion } from "@/components/conversion/ConversionProvider";
import { telHref } from "@/lib/phone-links";

type PageCtaButtonsProps = {
  phone?: string;
  primaryLabel?: string;
  className?: string;
};

export function PageCtaButtons({
  phone,
  primaryLabel = "Start quote quiz",
  className = "",
}: PageCtaButtonsProps) {
  const { openQuiz, openContact } = useConversion();

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <button
        type="button"
        onClick={openQuiz}
        className="btn-primary touch-manipulation"
      >
        {primaryLabel}
      </button>
      <button
        type="button"
        onClick={openContact}
        className="btn-ghost touch-manipulation"
      >
        Contact us
      </button>
      {phone ? (
        <a href={telHref(phone)} className="btn-ghost touch-manipulation">
          Call
        </a>
      ) : null}
    </div>
  );
}
