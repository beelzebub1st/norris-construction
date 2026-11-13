import { AdminPageHeader, Field, SubmitButton, inputClass } from "@/components/admin/admin-chrome";
import { getPrisma } from "@/lib/prisma";
import { saveExperiment } from "./actions";

export default async function AdminExperimentsPage() {
  const experiments = await getPrisma().experiment.findMany({
    orderBy: { key: "asc" },
  });

  return (
    <div>
      <AdminPageHeader title="Experiments" />
      <p className="mb-6 max-w-2xl text-sm text-zinc-400">
        Lightweight A/B flags. Visitors are bucketed by the <code className="text-zinc-300">nid</code>{" "}
        cookie using a stable hash. Variants JSON is a map of variant keys to copy (e.g. headline
        strings).
      </p>
      <div className="space-y-10">
        {experiments.map((row) => (
          <form key={row.id} action={saveExperiment} className="max-w-2xl space-y-4 rounded-lg border border-zinc-800 p-5">
            <input type="hidden" name="key" value={row.key} />
            <h2 className="font-mono text-sm text-zinc-200">{row.key}</h2>
            <Field label="Active">
              <input
                type="checkbox"
                name="active"
                defaultChecked={row.active}
                className="size-4 rounded border-zinc-600"
              />
            </Field>
            <Field label="Variants (JSON)" hint='e.g. {"a":"Headline A","b":"Headline B"}'>
              <textarea
                name="variants"
                rows={6}
                defaultValue={JSON.stringify(row.variants, null, 2)}
                className={inputClass}
              />
            </Field>
            <SubmitButton label="Save experiment" />
          </form>
        ))}
      </div>
      {experiments.length === 0 ? (
        <p className="text-sm text-zinc-500">No experiments in the database. Run seed.</p>
      ) : null}
    </div>
  );
}
