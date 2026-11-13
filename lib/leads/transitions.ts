import type { LeadStatus } from "@prisma/client";

export const ALLOWED_TRANSITIONS: Record<LeadStatus, LeadStatus[]> = {
  new: ["contacted", "lost"],
  contacted: ["qualified", "lost"],
  qualified: ["quoted", "lost"],
  quoted: ["won", "lost"],
  won: [],
  lost: [],
};

export function canTransition(from: LeadStatus, to: LeadStatus): boolean {
  return ALLOWED_TRANSITIONS[from].includes(to);
}

export function statusSelectOptions(current: LeadStatus): LeadStatus[] {
  const next = ALLOWED_TRANSITIONS[current];
  return [current, ...next.filter((s) => s !== current)];
}
