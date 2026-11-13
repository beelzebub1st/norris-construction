import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/auth/session";
import { hasDatabase } from "@/lib/has-database";

export const instant = false;

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  if (!hasDatabase()) {
    return (
      <AdminShell>
        <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <h1 className="font-display text-2xl text-white">Admin needs a database</h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            This Vercel deploy is running in demo mode without Postgres. Marketing pages use
            static content. Add a <code className="text-zinc-200">DATABASE_URL</code> (and
            run migrations/seed) to enable leads, CMS, and SEO health tools.
          </p>
        </div>
      </AdminShell>
    );
  }

  return <AdminShell>{children}</AdminShell>;
}
