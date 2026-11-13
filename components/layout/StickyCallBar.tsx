"use client";

import { useConversion } from "@/components/conversion/ConversionProvider";
import { telHref, smsHref } from "@/lib/phone-links";

type StickyCallBarProps = {
  phone: string;
  sms: string;
};

export function StickyCallBar({ phone, sms }: StickyCallBarProps) {
  const { openQuiz } = useConversion();

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--color-stone)]/20 bg-[var(--color-ink)]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <div className="grid grid-cols-3">
        <a
          href={telHref(phone)}
          className="px-2 py-3.5 text-center text-xs font-semibold uppercase tracking-wide text-[var(--color-cream)]"
        >
          Call
        </a>
        <a
          href={smsHref(sms)}
          className="border-x border-[var(--color-stone)]/20 px-2 py-3.5 text-center text-xs font-semibold uppercase tracking-wide text-[var(--color-cream)]"
        >
          Text
        </a>
        <button
          type="button"
          onClick={openQuiz}
          className="bg-[var(--color-orange)] px-2 py-3.5 text-center text-xs font-bold uppercase tracking-wide text-white"
        >
          Quote quiz
        </button>
      </div>
    </div>
  );
}
