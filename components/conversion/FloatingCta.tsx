"use client";

import { useConversion } from "@/components/conversion/ConversionProvider";

export function FloatingCta() {
  const { openQuiz, openContact } = useConversion();

  return (
    <div className="pointer-events-none fixed right-4 bottom-24 z-[60] flex flex-col items-end gap-2 md:right-8 md:bottom-8">
      <button
        type="button"
        onClick={openQuiz}
        className="pointer-events-auto btn-primary relative pulse-dot shadow-xl"
      >
        Request a Bid
      </button>
      <button
        type="button"
        onClick={openContact}
        className="pointer-events-auto btn-ghost text-xs"
      >
        Contact
      </button>
    </div>
  );
}
