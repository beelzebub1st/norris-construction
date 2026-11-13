import type { LeadStatus } from "@prisma/client";

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  quoted: "Quoted",
  won: "Won",
  lost: "Lost",
};

export const LEAD_STATUS_FILTER_OPTIONS: { value: LeadStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  ...(Object.keys(LEAD_STATUS_LABELS) as LeadStatus[]).map((value) => ({
    value,
    label: LEAD_STATUS_LABELS[value],
  })),
];
