export type NurtureTemplate = "nurture_day2" | "nurture_day5";

export function nurtureDue(
  createdAt: Date,
  now: Date,
  sentTemplates: string[],
): NurtureTemplate | null {
  const days = (now.getTime() - createdAt.getTime()) / 86_400_000;
  if (days >= 5 && !sentTemplates.includes("nurture_day5")) return "nurture_day5";
  if (days >= 2 && !sentTemplates.includes("nurture_day2")) return "nurture_day2";
  return null;
}
