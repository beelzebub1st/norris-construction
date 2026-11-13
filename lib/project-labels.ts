import type { ProjectType } from "@prisma/client";

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  custom_home: "Custom home",
  remodel: "Remodel",
  kitchen: "Kitchen",
  bath: "Bath",
  addition: "Addition",
  outdoor: "Outdoor",
};

export const PROJECT_TYPE_FILTER_OPTIONS: { value: ProjectType; label: string }[] =
  (Object.keys(PROJECT_TYPE_LABELS) as ProjectType[]).map((value) => ({
    value,
    label: PROJECT_TYPE_LABELS[value],
  }));
