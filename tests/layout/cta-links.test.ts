import { describe, expect, it } from "vitest";
import { smsHref, telHref } from "@/lib/site-settings";

describe("cta hrefs", () => {
  it("builds tel and sms links", () => {
    expect(telHref("(305) 555-0100")).toBe("tel:+13055550100");
    expect(smsHref("+13055550100")).toBe("sms:+13055550100");
  });
});
