import { describe, expect, it } from "vitest";
import { canTransition } from "@/lib/leads/transitions";

describe("canTransition", () => {
  it("allows new → contacted", () => {
    expect(canTransition("new", "contacted")).toBe(true);
  });
  it("allows quoted → won or lost", () => {
    expect(canTransition("quoted", "won")).toBe(true);
    expect(canTransition("quoted", "lost")).toBe(true);
  });
  it("blocks new → won", () => {
    expect(canTransition("new", "won")).toBe(false);
  });
});
