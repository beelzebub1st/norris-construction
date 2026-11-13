import type { BudgetRange } from "@prisma/client";

export const BUDGET_RANGE_PUBLIC = [
  "under_50k",
  "50_150k",
  "150_500k",
  "500k_plus",
  "not_sure",
] as const;

export type BudgetRangePublic = (typeof BUDGET_RANGE_PUBLIC)[number];

const TO_PRISMA: Record<BudgetRangePublic, BudgetRange> = {
  under_50k: "under_50k",
  "50_150k": "s50_150k",
  "150_500k": "s150_500k",
  "500k_plus": "s500k_plus",
  not_sure: "not_sure",
};

const FROM_PRISMA: Record<BudgetRange, BudgetRangePublic> = {
  under_50k: "under_50k",
  s50_150k: "50_150k",
  s150_500k: "150_500k",
  s500k_plus: "500k_plus",
  not_sure: "not_sure",
};

export function mapBudgetToPrisma(
  value?: string,
): BudgetRange | undefined {
  if (!value) return undefined;
  if (!(value in TO_PRISMA)) {
    throw new Error("Invalid budgetRange");
  }
  return TO_PRISMA[value as BudgetRangePublic];
}

export function mapBudgetFromPrisma(value: BudgetRange): BudgetRangePublic {
  return FROM_PRISMA[value];
}
