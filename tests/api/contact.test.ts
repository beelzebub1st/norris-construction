import { beforeEach, describe, expect, it, vi } from "vitest";

const leadCreate = vi.fn();
const submissionCreate = vi.fn();

vi.mock("@/lib/prisma", () => ({
  getPrisma: () => ({
    $transaction: (fn: (tx: {
      lead: { create: typeof leadCreate };
      submission: { create: typeof submissionCreate };
    }) => unknown) =>
      fn({
        lead: { create: leadCreate },
        submission: { create: submissionCreate },
      }),
  }),
}));

vi.mock("@/lib/email/send", () => ({
  sendLeadEmails: vi.fn().mockResolvedValue(undefined),
}));

import { createLeadFromEstimate } from "@/lib/leads/create-lead";

describe("createLeadFromEstimate", () => {
  beforeEach(() => {
    leadCreate.mockReset();
    submissionCreate.mockReset();
    leadCreate.mockResolvedValue({ id: "lead_1" });
  });

  it("skips persistence when honeypot filled", async () => {
    const res = await createLeadFromEstimate(
      {
        name: "Bot",
        phone: "3055550199",
        email: "bot@example.com",
        message: "spam message",
        honeypot: "x",
      },
      { ip: "1.1.1.1" },
    );
    expect(res).toEqual({ ok: true, spam: true });
    expect(leadCreate).not.toHaveBeenCalled();
  });

  it("creates lead and submission", async () => {
    const res = await createLeadFromEstimate(
      {
        name: "Alex Rivera",
        phone: "3055550199",
        email: "alex@example.com",
        message: "Need a kitchen remodel",
        projectType: "kitchen",
        budgetRange: "50_150k",
      },
      { ip: "1.1.1.1" },
    );
    expect(res.ok).toBe(true);
    expect(leadCreate).toHaveBeenCalled();
    expect(submissionCreate).toHaveBeenCalled();
  });
});
