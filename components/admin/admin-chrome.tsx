import Link from "next/link";
import type { ReactNode } from "react";
import { AdminDeleteButton as AdminDeleteInner } from "./AdminDeleteButton";

export const inputClass =
  "mt-1 w-full rounded-lg border border-white/10 bg-[#0c0c0e] px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 transition focus:border-[#E06820]/50 focus:outline-none focus:ring-1 focus:ring-[#E06820]/35";

export const labelClass =
  "block text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500";

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
      <div>
        <h1 className="font-display text-3xl tracking-wide text-white">{title}</h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function AdminPrimaryLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-lg bg-[#E06820] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(224,104,32,0.25)] transition hover:brightness-110"
    >
      {children}
    </Link>
  );
}

export function AdminStatCard({
  label,
  value,
  href,
  hint,
  accent = false,
}: {
  label: string;
  value: string | number;
  href?: string;
  hint?: string;
  accent?: boolean;
}) {
  const inner = (
    <>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
        {label}
      </p>
      <p
        className={`mt-3 font-display text-3xl ${
          accent ? "text-[#E06820]" : "text-white"
        }`}
      >
        {value}
      </p>
      {hint ? <p className="mt-2 text-xs text-zinc-500">{hint}</p> : null}
    </>
  );

  const className =
    "rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-5 transition hover:border-[#E06820]/35 hover:bg-white/[0.06]";

  if (href) {
    return (
      <Link href={href} className={`block ${className}`}>
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
}

export function AdminPanel({
  title,
  action,
  children,
  className = "",
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-white/10 bg-[#101012]/80 p-5 sm:p-6 ${className}`}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-lg text-white">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function AdminTable({
  headers,
  children,
}: {
  headers: string[];
  children: ReactNode;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="min-w-full divide-y divide-white/10 text-sm">
        <thead className="bg-white/[0.03]">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 bg-[#0c0c0e]/60">{children}</tbody>
      </table>
    </div>
  );
}

export function AdminRowLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className="font-medium text-[#E06820] hover:text-[#f08a4a]">
      {children}
    </Link>
  );
}

export function AdminDeleteForm({
  action,
  label = "Delete",
  confirmMessage,
}: {
  action: (formData: FormData) => Promise<void>;
  label?: string;
  confirmMessage?: string;
}) {
  return (
    <form action={action} className="inline">
      <AdminDeleteInner label={label} confirmMessage={confirmMessage} />
    </form>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {children}
      {hint ? <p className="mt-1 text-xs text-zinc-500">{hint}</p> : null}
    </label>
  );
}

export function FormActions({ children }: { children: ReactNode }) {
  return <div className="mt-8 flex flex-wrap items-center gap-4">{children}</div>;
}

export function SubmitButton({ label = "Save" }: { label?: string }) {
  return (
    <button
      type="submit"
      className="rounded-lg bg-[#E06820] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(224,104,32,0.25)] transition hover:brightness-110"
    >
      {label}
    </button>
  );
}

export function AdminEmpty({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-zinc-500">
      {children}
    </p>
  );
}
