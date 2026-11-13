"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed right-4 bottom-[11.5rem] z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-stone)]/30 bg-[var(--color-ink)]/90 text-[var(--color-cream)] shadow-lg backdrop-blur md:right-8 md:bottom-[9.5rem]"
        >
          <span className="text-lg leading-none">↑</span>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
