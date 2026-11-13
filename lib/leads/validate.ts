import { z } from "zod";

export const projectTypeEnum = z.enum([
  "custom_home",
  "remodel",
  "kitchen",
  "bath",
  "addition",
  "outdoor",
]);

export const budgetRangeEnum = z.enum([
  "under_50k",
  "50_150k",
  "150_500k",
  "500k_plus",
  "not_sure",
]);

export const estimateSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(30),
  email: z.string().trim().email(),
  projectType: projectTypeEnum.optional(),
  area: z.string().trim().max(80).optional(),
  budgetRange: budgetRangeEnum.optional(),
  message: z.string().trim().min(5).max(5000),
  honeypot: z.string().optional(),
  pageUrl: z.string().optional(),
  source: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export type EstimateInput = z.infer<typeof estimateSchema>;

export function parseEstimateInput(raw: unknown) {
  return estimateSchema.safeParse(raw);
}
