export type ExperimentVariants = Record<string, string>;

export function resolveExperiment(
  key: string,
  visitorId: string,
  experiment: { active: boolean; variants: unknown } | null,
): string | null {
  if (!experiment?.active) return null;
  const variants = experiment.variants as ExperimentVariants;
  const variantKeys = Object.keys(variants).sort();
  if (variantKeys.length === 0) return null;

  let hash = 0;
  const input = `${key}:${visitorId}`;
  for (let i = 0; i < input.length; i += 1) {
    hash = (Math.imul(31, hash) + input.charCodeAt(i)) >>> 0;
  }
  return variantKeys[hash % variantKeys.length] ?? null;
}

export function headlineForExperiment(
  experiment: { active: boolean; variants: unknown } | null,
  variantKey: string | null,
  defaultHeadline: string,
): string {
  if (!variantKey || !experiment?.active) return defaultHeadline;
  const variants = experiment.variants as ExperimentVariants;
  return variants[variantKey] ?? defaultHeadline;
}
