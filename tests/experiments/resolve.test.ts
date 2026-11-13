import { describe, expect, it } from "vitest";
import {
  headlineForExperiment,
  resolveExperiment,
} from "@/lib/experiments/resolve";

const experiment = {
  active: true,
  variants: { a: "Headline A", b: "Headline B", c: "Headline C" },
};

describe("resolveExperiment", () => {
  it("returns null when inactive", () => {
    expect(
      resolveExperiment("hero_headline", "visitor-1", {
        active: false,
        variants: { a: "x" },
      }),
    ).toBeNull();
  });

  it("picks a stable variant for the same visitor", () => {
    const first = resolveExperiment("hero_headline", "nid-abc", experiment);
    const second = resolveExperiment("hero_headline", "nid-abc", experiment);
    expect(first).not.toBeNull();
    expect(first).toBe(second);
  });

  it("can assign different visitors to different buckets", () => {
    const buckets = new Set(
      Array.from({ length: 40 }, (_, i) =>
        resolveExperiment("hero_headline", `visitor-${i}`, experiment),
      ),
    );
    expect(buckets.size).toBeGreaterThan(1);
  });
});

describe("headlineForExperiment", () => {
  it("uses default when experiment inactive", () => {
    expect(
      headlineForExperiment(
        { active: false, variants: { a: "A" } },
        "a",
        "Default",
      ),
    ).toBe("Default");
  });

  it("returns variant copy when active", () => {
    expect(headlineForExperiment(experiment, "b", "Default")).toBe("Headline B");
  });
});
