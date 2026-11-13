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
  "w-full rounded border border-[var(--color-stone)]/30 bg-[var(--color-ink)] px-3 py-2.5 text-sm text-[var(--color-cream)] placeholder:text-[var(--color-cream)]/40";

const labelClass =
  "text-xs uppercase tracking-wide text-[var(--color-cream)]/55";

export function ContactForm() {
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
          pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
          source: "contact",
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
      <p className="rounded border border-[var(--color-stone)]/25 bg-[var(--color-stone)]/10 px-6 py-8 text-[var(--color-cream)]">
        Thanks — we received your request and will respond within one business
        day.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Name</span>
          <input
            name="name"
            required
            minLength={2}
            autoComplete="name"
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Phone</span>
          <input
            name="phone"
            required
            minLength={7}
            autoComplete="tel"
            className={inputClass}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
        />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
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
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Area / neighborhood</span>
          <input
            name="area"
            maxLength={80}
            placeholder="e.g. Coral Gables"
            className={inputClass}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
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

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>Project details</span>
        <textarea
          name="message"
          required
          minLength={5}
          rows={5}
          className={`${inputClass} resize-y`}
        />
      </label>

      {errorMessage ? (
        <p className="text-sm text-red-400" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-[var(--color-orange)] px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Submit request"}
      </button>
    </form>
  );
}
