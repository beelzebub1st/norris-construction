import { smsHref, telHref } from "@/lib/site-settings";

type StickyCallBarProps = {
  phone: string;
  sms: string;
};

export function StickyCallBar({ phone, sms }: StickyCallBarProps) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--color-stone)]/30 bg-[var(--color-ink)] pb-[env(safe-area-inset-bottom)] md:hidden"
      role="region"
      aria-label="Quick contact"
    >
      <div className="grid grid-cols-2 gap-px bg-[var(--color-stone)]/30">
        <a
          href={telHref(phone)}
          className="flex items-center justify-center bg-[var(--color-orange)] py-3.5 text-center text-sm font-semibold text-white"
        >
          Call
        </a>
        <a
          href={smsHref(sms)}
          className="flex items-center justify-center bg-[var(--color-ink)] py-3.5 text-center text-sm font-semibold text-[var(--color-cream)]"
        >
          Text
        </a>
      </div>
    </div>
  );
}
