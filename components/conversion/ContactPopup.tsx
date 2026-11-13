"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ContactForm } from "@/components/sections/ContactForm";
import { useConversion } from "@/components/conversion/ConversionProvider";

export function ContactPopup() {
  const { modal, close, openQuiz } = useConversion();
  const open = modal === "contact";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Close contact form"
            onClick={close}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-popup-title"
            className="relative z-10 max-h-[92dvh] w-full max-w-xl overflow-y-auto rounded-t-3xl border border-[var(--color-stone)]/25 bg-[var(--color-ink-soft)] p-6 shadow-2xl sm:rounded-3xl sm:p-8"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-orange)]">
                  Free estimate
                </p>
                <h2
                  id="contact-popup-title"
                  className="mt-2 font-display text-2xl text-[var(--color-cream)] sm:text-3xl"
                >
                  Tell us about your project
                </h2>
                <p className="mt-2 text-sm text-[var(--color-cream)]/70">
                  Prefer guided questions?{" "}
                  <button
                    type="button"
                    onClick={openQuiz}
                    className="font-semibold text-[var(--color-orange)] underline-offset-2 hover:underline"
                  >
                    Take the 60-second quote quiz
                  </button>
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                className="rounded-full border border-[var(--color-stone)]/30 px-3 py-1 text-sm text-[var(--color-cream)]/80 hover:border-[var(--color-cream)]/50"
              >
                Close
              </button>
            </div>
            <ContactForm />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
