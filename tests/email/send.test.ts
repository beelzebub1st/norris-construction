import { beforeEach, describe, expect, it, vi } from "vitest";

const send = vi.fn();
const emailCreate = vi.fn();
const siteSettingsFindUnique = vi.fn();

vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));

vi.mock("@/lib/prisma", () => ({
  getPrisma: () => ({
    emailLog: { create: emailCreate },
    siteSettings: { findUnique: siteSettingsFindUnique },
  }),
}));

import type { Lead } from "@prisma/client";
import { sendLeadEmails, sendNurture } from "@/lib/email/send";

const sampleLead = {
  id: "lead_1",
  name: "Alex",
  email: "alex@example.com",
  phone: "305",
  message: "Hi",
} as Lead;

describe("sendLeadEmails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.RESEND_API_KEY = "re_test";
    process.env.RESEND_FROM = "Norris <noreply@test.com>";
    process.env.LEAD_NOTIFY_EMAIL = "leads@test.com";
    send.mockResolvedValue({ data: { id: "1" }, error: null });
    emailCreate.mockResolvedValue({});
    siteSettingsFindUnique.mockResolvedValue({
      email: "hello@norris.construction",
    });
  });

  it("sends confirmation and notify", async () => {
    await sendLeadEmails(sampleLead);
    expect(send).toHaveBeenCalledTimes(2);
    expect(emailCreate).toHaveBeenCalledTimes(2);
    expect(emailCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: "sent",
          template: "lead_confirmation",
          to: "alex@example.com",
        }),
      }),
    );
    expect(emailCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: "sent",
          template: "lead_notify",
          to: "leads@test.com",
        }),
      }),
    );
  });

  it("logs failed rows when RESEND_API_KEY is missing", async () => {
    delete process.env.RESEND_API_KEY;
    await sendLeadEmails(sampleLead);
    expect(send).not.toHaveBeenCalled();
    expect(emailCreate).toHaveBeenCalledTimes(2);
    expect(emailCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: "failed",
          error: "RESEND_API_KEY missing",
        }),
      }),
    );
  });
});

describe("sendNurture", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.RESEND_API_KEY = "re_test";
    process.env.RESEND_FROM = "Norris <noreply@test.com>";
    send.mockResolvedValue({ data: { id: "1" }, error: null });
    emailCreate.mockResolvedValue({});
    siteSettingsFindUnique.mockResolvedValue({
      email: "hello@norris.construction",
    });
  });

  it("sends nurture template to lead email", async () => {
    await sendNurture(sampleLead, "nurture_day2");
    expect(send).toHaveBeenCalledTimes(1);
    expect(emailCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          template: "nurture_day2",
          status: "sent",
          to: "alex@example.com",
        }),
      }),
    );
  });
});
