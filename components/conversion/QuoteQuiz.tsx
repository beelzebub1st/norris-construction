"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useConversion } from "@/components/conversion/ConversionProvider";

type Answers = {
  projectType: string;
  timeline: string;
  budgetRange: string;
  area: string;
  name: string;
  phone: string;
  email: string;
};

const STEPS = [
  {
    key: "projectType" as const,
    title: "What are you building?",
    options: [
      { value: "custom_home", label: "Custom home", hint: "Ground-up build" },
      { value: "remodel", label: "Full remodel", hint: "Whole-home refresh" },
      { value: "kitchen", label: "Kitchen", hint: "Cabinets & layout" },
      { value: "bath", label: "Bathroom", hint: "Spa-level suite" },
      { value: "addition", label: "Addition", hint: "More living space" },
      { value: "outdoor", label: "Outdoor living", hint: "Pool & terrace" },
    ],
  },
  {
    key: "timeline" as const,
    title: "When do you want to start?",
    options: [
      { value: "asap", label: "As soon as possible", hint: "Ready to move" },
      { value: "1_3_months", label: "1–3 months", hint: "Planning now" },
      { value: "3_6_months", label: "3–6 months", hint: "Exploring options" },
      { value: "researching", label: "Just researching", hint: "No rush" },
    ],
  },
  {
    key: "budgetRange" as const,
    title: "What’s your investment range?",
    options: [
      { value: "under_50k", label: "Under $50k" },
      { value: "50_150k", label: "$50k – $150k" },
      { value: "150_500k", label: "$150k – $500k" },
      { value: "500k_plus", label: "$500k+" },
      { value: "not_sure", label: "Not sure yet" },
    ],
  },
  {
    key: "area" as const,
    title: "Where is the property?",
    options: [
      { value: "Miami Beach", label: "Miami Beach" },
      { value: "Coral Gables", label: "Coral Gables" },
      { value: "Brickell", label: "Brickell" },
      { value: "Fort Lauderdale", label: "Fort Lauderdale" },
      { value: "Other South Florida", label: "Other South Florida" },
    ],
  },
];

const initial: Answers = {
  projectType: "",
  timeline: "",
  budgetRange: "",
  area: "",
  name: "",
  phone: "",
  email: "",
};

export function QuoteQuiz() {
  const { modal, close } = useConversion();
  const open = modal === "quiz";
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    if (open) {
      setStep(0);
      setAnswers(initial);
      setStatus("idle");
      setError(null);
    }
  }, [open]);

  const progress = useMemo(
    () => Math.round(((step + 1) / (STEPS.length + 1)) * 100),
    [step],
  );

  function pick(key: keyof Answers, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setTimeout(() => setStep((s) => Math.min(s + 1, STEPS.length)), 180);
  }

  async function submitContact(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const timelineLabel =
      STEPS[1].options.find((o) => o.value === answers.timeline)?.label ??
      answers.timeline;
    const message = `Quote quiz lead. Timeline: ${timelineLabel}. Area: ${answers.area}.`;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: answers.name,
          phone: answers.phone,
          email: answers.email,
          projectType: answers.projectType,
          budgetRange: answers.budgetRange,
          area: answers.area,
          message,
          source: "quote_quiz",
          pageUrl: window.location.href,
          honeypot: "",
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(json.error || "Could not submit. Please try again.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Network error. Please try again or call us.");
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            aria-label="Close quiz"
            onClick={close}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quiz-title"
            className="relative z-10 flex max-h-[94dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-[var(--color-stone)]/25 bg-[var(--color-ink-soft)] shadow-2xl sm:rounded-3xl"
            initial={{ y: 48, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 28, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            <div className="border-b border-[var(--color-stone)]/15 px-6 py-5 sm:px-8">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
                    Instant quote path
                  </p>
                  <h2
                    id="quiz-title"
                    className="mt-1 font-display text-2xl text-[var(--color-cream)]"
                  >
                    60-second project quiz
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-full border border-[var(--color-stone)]/30 px-3 py-1 text-sm text-[var(--color-cream)]/80"
                >
                  Close
                </button>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[var(--color-stone)]/20">
                <motion.div
                  className="h-full rounded-full bg-[var(--color-orange)]"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.35 }}
                />
              </div>
            </div>

            <div className="overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
              {status === "success" ? (
                <div className="py-10 text-center">
                  <p className="font-display text-3xl text-[var(--color-cream)]">
                    You’re on the list
                  </p>
                  <p className="mx-auto mt-3 max-w-md text-[var(--color-cream)]/75">
                    Norris will review your answers and follow up with next
                    steps — usually within one business day.
                  </p>
                  <button type="button" className="btn-primary mt-8" onClick={close}>
                    Back to site
                  </button>
                </div>
              ) : step < STEPS.length ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={STEPS[step].key}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -18 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="font-display text-xl text-[var(--color-cream)] sm:text-2xl">
                      {STEPS[step].title}
                    </h3>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {STEPS[step].options.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => pick(STEPS[step].key, opt.value)}
                          className="rounded-2xl border border-[var(--color-stone)]/25 bg-[var(--color-ink)]/60 px-4 py-4 text-left transition hover:border-[var(--color-orange)]/70 hover:bg-[var(--color-orange)]/10"
                        >
                          <span className="block font-semibold text-[var(--color-cream)]">
                            {opt.label}
                          </span>
                          {"hint" in opt && opt.hint ? (
                            <span className="mt-1 block text-xs text-[var(--color-cream)]/55">
                              {opt.hint}
                            </span>
                          ) : null}
                        </button>
                      ))}
                    </div>
                    {step > 0 ? (
                      <button
                        type="button"
                        className="mt-6 text-sm text-[var(--color-cream)]/60 hover:text-[var(--color-cream)]"
                        onClick={() => setStep((s) => s - 1)}
                      >
                        ← Back
                      </button>
                    ) : null}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <form onSubmit={submitContact} className="space-y-4">
                  <h3 className="font-display text-xl text-[var(--color-cream)] sm:text-2xl">
                    Where should we send your estimate?
                  </h3>
                  <label className="block space-y-1.5">
                    <span className="text-xs uppercase tracking-wide text-[var(--color-cream)]/55">
                      Name
                    </span>
                    <input
                      required
                      name="name"
                      value={answers.name}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, name: e.target.value }))
                      }
                      className="w-full rounded-xl border border-[var(--color-stone)]/30 bg-[var(--color-ink)] px-3 py-3 text-sm text-[var(--color-cream)]"
                    />
                  </label>
                  <label className="block space-y-1.5">
                    <span className="text-xs uppercase tracking-wide text-[var(--color-cream)]/55">
                      Phone
                    </span>
                    <input
                      required
                      name="phone"
                      value={answers.phone}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, phone: e.target.value }))
                      }
                      className="w-full rounded-xl border border-[var(--color-stone)]/30 bg-[var(--color-ink)] px-3 py-3 text-sm text-[var(--color-cream)]"
                    />
                  </label>
                  <label className="block space-y-1.5">
                    <span className="text-xs uppercase tracking-wide text-[var(--color-cream)]/55">
                      Email
                    </span>
                    <input
                      required
                      type="email"
                      name="email"
                      value={answers.email}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, email: e.target.value }))
                      }
                      className="w-full rounded-xl border border-[var(--color-stone)]/30 bg-[var(--color-ink)] px-3 py-3 text-sm text-[var(--color-cream)]"
                    />
                  </label>
                  {error ? (
                    <p className="text-sm text-red-300">{error}</p>
                  ) : null}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      className="btn-ghost"
                      onClick={() => setStep(STEPS.length - 1)}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={status === "loading"}
                    >
                      {status === "loading"
                        ? "Sending…"
                        : "Get my free estimate"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
