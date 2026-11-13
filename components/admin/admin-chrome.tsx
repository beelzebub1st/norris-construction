import Link from "next/link";
import type { ReactNode } from "react";
import { AdminDeleteButton as AdminDeleteInner } from "./AdminDeleteButton";

export const inputClass =
  "mt-1 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-amber-500/60 focus:outline-none focus:ring-1 focus:ring-amber-500/40";

export const labelClass = "block text-xs font-medium uppercase tracking-wide text-zinc-400";

export function AdminPageHeader({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <h1 className="font-display text-2xl text-white">{title}</h1>
      {action}
    </div>
  );
}

export function AdminPrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex rounded-md bg-amber-600 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-amber-500"
    >
      {children}
    </Link>
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
    <div className="overflow-x-auto rounded-lg border border-zinc-800">
      <table className="min-w-full divide-y divide-zinc-800 text-sm">
        <thead className="bg-zinc-900/80">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800 bg-zinc-950">{children}</tbody>
      </table>
    </div>
  );
}

export function AdminRowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-amber-400 hover:text-amber-300">
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
      className="rounded-md bg-amber-600 px-5 py-2 text-sm font-medium text-zinc-950 hover:bg-amber-500"
    >
      {label}
    </button>
  );
}
