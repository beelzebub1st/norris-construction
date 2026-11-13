"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PROJECT_TYPE_FILTER_OPTIONS } from "@/lib/project-labels";

type AreaOption = {
  slug: string;
  name: string;
};

type ProjectFiltersProps = {
  areas: AreaOption[];
};

export function ProjectFilters({ areas }: ProjectFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentType = searchParams.get("type") ?? "";
  const currentArea = searchParams.get("area") ?? "";

  function updateFilter(key: "type" | "area", value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const query = params.toString();
    router.push(query ? `/projects?${query}` : "/projects", { scroll: false });
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
      <label className="flex flex-col gap-1.5 text-sm text-[var(--color-cream)]/75">
        <span className="text-xs uppercase tracking-wide text-[var(--color-cream)]/55">
          Type
        </span>
        <select
          value={currentType}
          onChange={(event) => updateFilter("type", event.target.value)}
          className="min-w-[10rem] rounded border border-[var(--color-stone)]/30 bg-[var(--color-ink)] px-3 py-2 text-sm text-[var(--color-cream)]"
        >
          <option value="">All types</option>
          {PROJECT_TYPE_FILTER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-sm text-[var(--color-cream)]/75">
        <span className="text-xs uppercase tracking-wide text-[var(--color-cream)]/55">
          Area
        </span>
        <select
          value={currentArea}
          onChange={(event) => updateFilter("area", event.target.value)}
          className="min-w-[10rem] rounded border border-[var(--color-stone)]/30 bg-[var(--color-ink)] px-3 py-2 text-sm text-[var(--color-cream)]"
        >
          <option value="">All areas</option>
          {areas.map((area) => (
            <option key={area.slug} value={area.slug}>
              {area.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
