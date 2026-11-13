import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("brand tokens", () => {
  it("defines safety orange #E06820 in globals.css", () => {
    const css = readFileSync("app/globals.css", "utf8");
    expect(css).toMatch(/#E06820/i);
  });
});
