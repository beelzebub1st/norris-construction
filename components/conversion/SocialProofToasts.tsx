"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TOASTS = [
  { text: "White-box bid requested · West Palm Beach", ago: "8 min ago" },
  { text: "Office build-out inquiry · Jupiter", ago: "21 min ago" },
  { text: "Restaurant renovation request · Fort Lauderdale", ago: "42 min ago" },
  { text: "Tenant turnover inquiry · Boca Raton", ago: "1 hr ago" },
];

export function SocialProofToasts() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = window.setTimeout(() => setVisible(true), 4200);
    const cycle = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % TOASTS.length);
        setVisible(true);
      }, 500);
    }, 9000);
    return () => {
      window.clearTimeout(show);
      window.clearInterval(cycle);
    };
  }, []);

  const toast = TOASTS[index];

  return (
    <div className="pointer-events-none fixed bottom-24 left-4 z-40 max-w-xs sm:left-6">
      <AnimatePresence>
        {visible ? (
          <motion.div
            key={toast.text}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="rounded-2xl border border-[var(--color-stone)]/25 bg-[var(--color-ink)]/92 px-4 py-3 text-sm text-[var(--color-cream)] shadow-xl backdrop-blur"
          >
            <p className="font-medium">{toast.text}</p>
            <p className="mt-1 text-xs text-[var(--color-cream)]/55">{toast.ago}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
