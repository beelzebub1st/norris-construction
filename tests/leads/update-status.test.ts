import { beforeEach, describe, expect, it, vi } from "vitest";

const leadFindUnique = vi.fn();
const leadUpdate = vi.fn();

vi.mock("@/lib/prisma", () => ({
  getPrisma: () => ({
    lead: {
      findUnique: leadFindUnique,
      update: leadUpdate,
    },
  }),
}));

import { updateLeadStatus } from "@/lib/leads/update-status";

describe("updateLeadStatus", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns not_found when lead is missing", async () => {
    leadFindUnique.mockResolvedValue(null);
    const result = await updateLeadStatus("missing", "contacted");
    expect(result).toEqual({ ok: false, error: "not_found" });
    expect(leadUpdate).not.toHaveBeenCalled();
  });

  it("rejects invalid transitions", async () => {
    leadFindUnique.mockResolvedValue({ id: "l1", status: "new" });
    const result = await updateLeadStatus("l1", "won");
    expect(result).toEqual({ ok: false, error: "invalid_transition" });
    expect(leadUpdate).not.toHaveBeenCalled();
  });

  it("updates on allowed transition", async () => {
    const updated = { id: "l1", status: "contacted", name: "Alex" };
    leadFindUnique.mockResolvedValue({ id: "l1", status: "new" });
    leadUpdate.mockResolvedValue(updated);
    const result = await updateLeadStatus("l1", "contacted");
    expect(result).toEqual({ ok: true, lead: updated, previousStatus: "new" });
    expect(leadUpdate).toHaveBeenCalledWith({
      where: { id: "l1" },
      data: { status: "contacted" },
    });
  });

  it("is a no-op when status unchanged", async () => {
    const existing = { id: "l1", status: "contacted" };
    leadFindUnique.mockResolvedValue(existing);
    const result = await updateLeadStatus("l1", "contacted");
    expect(result).toEqual({ ok: true, lead: existing, previousStatus: "contacted" });
    expect(leadUpdate).not.toHaveBeenCalled();
  });
});
