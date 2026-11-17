import type { ProjectType } from "@prisma/client";

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  custom_home: "Office build-out",
  remodel: "Commercial renovation",
  kitchen: "Restaurant renovation",
  bath: "Medical / professional",
  addition: "Storage & warehouse",
  outdoor: "White boxing / turnover",
};

export const PROJECT_TYPE_FILTER_OPTIONS: { value: ProjectType; label: string }[] =
  (Object.keys(PROJECT_TYPE_LABELS) as ProjectType[]).map((value) => ({
    value,
    label: PROJECT_TYPE_LABELS[value],
  }));
