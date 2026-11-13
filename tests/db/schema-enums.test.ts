import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("prisma enums", () => {
  it("includes ProjectType, BudgetRange, LeadStatus", () => {
    const schema = readFileSync("prisma/schema.prisma", "utf8");
    expect(schema).toContain("enum ProjectType");
    expect(schema).toContain("custom_home");
    expect(schema).toContain("enum BudgetRange");
    expect(schema).toContain("under_50k");
    expect(schema).toContain("s50_150k");
    expect(schema).toContain('@map("50_150k")');
    expect(schema).toContain("enum LeadStatus");
    expect(schema).toContain("qualified");
  });
});
