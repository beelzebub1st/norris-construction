import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const EXPECTED_SECTION_ORDER = [
  "Hero",
  "TrustStrip",
  "ServicesSection",
  "FeaturedProjects",
  "ProcessSection",
  "TestimonialsSection",
  "AreasSection",
  "BlogTeaser",
  "EstimateCta",
];

describe("homepage section order", () => {
  it("renders sections in conversion order", () => {
    const source = readFileSync("app/(marketing)/page.tsx", "utf8");
    const indices = EXPECTED_SECTION_ORDER.map((name) => {
      const match = source.indexOf(`<${name}`);
      expect(match, `missing ${name}`).toBeGreaterThan(-1);
      return match;
    });
    const sorted = [...indices].sort((a, b) => a - b);
    expect(indices).toEqual(sorted);
  });
});
