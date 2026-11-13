import { describe, expect, it } from "vitest";
import { nurtureDue } from "@/lib/email/nurture";

const day = 86_400_000;

describe("nurtureDue", () => {
  const created = new Date("2026-01-01T12:00:00Z");

  it("returns null before day 2", () => {
    const now = new Date(created.getTime() + day * 1.5);
    expect(nurtureDue(created, now, [])).toBeNull();
  });

  it("selects nurture_day2 at 2+ days when not sent", () => {
    const now = new Date(created.getTime() + day * 2);
    expect(nurtureDue(created, now, [])).toBe("nurture_day2");
  });

  it("skips day2 when already sent and picks day5 at 5+ days", () => {
    const now = new Date(created.getTime() + day * 5);
    expect(nurtureDue(created, now, ["nurture_day2"])).toBe("nurture_day5");
  });

  it("prefers day5 when both are due and day5 not sent", () => {
    const now = new Date(created.getTime() + day * 6);
    expect(nurtureDue(created, now, [])).toBe("nurture_day5");
  });

  it("returns null when both templates already sent", () => {
    const now = new Date(created.getTime() + day * 10);
    expect(nurtureDue(created, now, ["nurture_day2", "nurture_day5"])).toBeNull();
  });
});
