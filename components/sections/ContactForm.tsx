"use client";

import { useState, type FormEvent } from "react";
import { PROJECT_TYPE_FILTER_OPTIONS } from "@/lib/project-labels";
import { BUDGET_RANGE_PUBLIC, type BudgetRangePublic } from "@/lib/types";

const BUDGET_LABELS: Record<BudgetRangePublic, string> = {
  under_50k: "Under $50k",
  "50_150k": "$50k – $150k",
  "150_500k": "$150k – $500k",
  "500k_plus": "$500k+",
  not_sure: "Not sure yet",
};

const inputClass =
  "w-full rounded-2xl border border-[var(--color-stone)]/25 bg-[var(--color-ink)]/80 px-4 py-3.5 text-sm text-[var(--color-cream)] outline-none transition placeholder:text-[var(--color-cream)]/35 focus:border-[var(--color-orange)]/70 focus:ring-2 focus:ring-[var(--color-orange)]/25";

const labelClass =
  "text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-cream)]/55";

type ContactFormProps = {
  source?: string;
  submitLabel?: string;
};

export function ContactForm({
  source = "contact",
  submitLabel = "Send my project details",
}: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const raw = Object.fromEntries(data.entries()) as Record<string, string>;
    const payload: Record<string, string> = {};
    for (const [key, value] of Object.entries(raw)) {
      if (value.trim() === "" && key !== "message") continue;
      payload[key] = value;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          pageUrl:
            typeof window !== "undefined" ? window.location.href : undefined,
          source,
        }),
      });

      const json = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !json.ok) {
        setStatus("error");
        setErrorMessage(
          typeof json.error === "string"
            ? json.error
            : "Something went wrong. Please try again or call us.",
        );
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again or call us.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[1.75rem] border border-[var(--color-orange)]/35 bg-[var(--color-orange)]/10 px-6 py-10 text-center sm:px-8">
        <p className="font-display text-3xl text-[var(--color-cream)]">
          You’re on our list
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[var(--color-cream)]/75">
          Thanks — we received your request and will reply within one business
          day with a clear next step.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-ghost mt-6 touch-manipulation"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Name</span>
          <input
            name="name"
            required
            minLength={2}
            autoComplete="name"
            placeholder="Your full name"
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Phone</span>
          <input
            name="phone"
            required
            minLength={7}
            autoComplete="tel"
            placeholder="(305) 555-0100"
            className={inputClass}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@email.com"
          className={inputClass}
        />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Project type</span>
          <select name="projectType" className={inputClass} defaultValue="">
            <option value="">Select (optional)</option>
            {PROJECT_TYPE_FILTER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Area / neighborhood</span>
          <input
            name="area"
            maxLength={80}
            placeholder="e.g. Coral Gables"
            className={inputClass}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>Budget range</span>
        <select name="budgetRange" className={inputClass} defaultValue="">
          <option value="">Select (optional)</option>
          {BUDGET_RANGE_PUBLIC.map((value) => (
            <option key={value} value={value}>
              {BUDGET_LABELS[value]}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>Project details</span>
        <textarea
          name="message"
          required
          minLength={5}
          rows={5}
          placeholder="Tell us about the home, timeline, and what you want to feel when it’s done…"
          className={`${inputClass} min-h-[8.5rem] resize-y`}
        />
      </label>

      {errorMessage ? (
        <p
          className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary touch-manipulation disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : submitLabel}
        </button>
        <p className="text-xs text-[var(--color-cream)]/45">
          No spam. Reply within 1 business day.
        </p>
      </div>
    </form>
  );
}
