import { describe, expect, it } from "vitest";
import { parseEstimateInput } from "@/lib/leads/validate";

describe("parseEstimateInput", () => {
  it("accepts a valid estimate", () => {
    const result = parseEstimateInput({
      name: "Alex Rivera",
      phone: "3055550199",
      email: "alex@example.com",
      message: "Kitchen remodel in Coral Gables",
      projectType: "kitchen",
      budgetRange: "50_150k",
      honeypot: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing email", () => {
    const result = parseEstimateInput({
      name: "Alex",
      phone: "3055550199",
      message: "Hi",
    });
    expect(result.success).toBe(false);
  });

  it("flags filled honeypot as spam", () => {
    const result = parseEstimateInput({
      name: "Bot",
      phone: "3055550199",
      email: "bot@example.com",
      message: "spam!",
      honeypot: "http://spam",
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.honeypot).toBeTruthy();
  });
});
