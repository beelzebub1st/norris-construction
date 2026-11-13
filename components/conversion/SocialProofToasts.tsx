"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const EVENTS = [
  { text: "Kitchen estimate requested · Coral Gables", ago: "8 min ago" },
  { text: "Quote quiz completed · Miami Beach", ago: "21 min ago" },
  { text: "Outdoor living consult booked · Fort Lauderdale", ago: "41 min ago" },
  { text: "Bath remodel inquiry · Brickell", ago: "1 hr ago" },
];

export function SocialProofToasts() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const start = window.setTimeout(() => setVisible(true), 4200);
    const cycle = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % EVENTS.length);
        setVisible(true);
      }, 500);
    }, 9000);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(cycle);
    };
  }, []);

  const event = EVENTS[index];

  return (
    <div className="pointer-events-none fixed bottom-28 left-4 z-[55] md:bottom-10 md:left-8">
      <AnimatePresence>
        {visible ? (
          <motion.div
            key={`${event.text}-${index}`}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            className="max-w-xs rounded-2xl border border-[var(--color-stone)]/25 bg-[var(--color-ink)]/95 px-4 py-3 shadow-2xl backdrop-blur"
          >
            <p className="text-sm font-medium text-[var(--color-cream)]">
              {event.text}
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-wide text-[var(--color-orange)]">
              {event.ago}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
