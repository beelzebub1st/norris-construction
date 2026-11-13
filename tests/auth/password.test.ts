import bcrypt from "bcryptjs";
import { afterEach, describe, expect, it } from "vitest";
import { verifyAdminPassword } from "@/lib/auth/password";

const originalAdminPassword = process.env.ADMIN_PASSWORD;

afterEach(() => {
  if (originalAdminPassword === undefined) {
    delete process.env.ADMIN_PASSWORD;
  } else {
    process.env.ADMIN_PASSWORD = originalAdminPassword;
  }
});

describe("verifyAdminPassword", () => {
  it("accepts plain env password with timing-safe compare", async () => {
    process.env.ADMIN_PASSWORD = "secret-operator-pass";
    await expect(verifyAdminPassword("secret-operator-pass")).resolves.toBe(true);
    await expect(verifyAdminPassword("wrong")).resolves.toBe(false);
  });

  it("accepts bcrypt-hashed env password", async () => {
    const hash = bcrypt.hashSync("hashed-pass", 10);
    process.env.ADMIN_PASSWORD = hash;
    await expect(verifyAdminPassword("hashed-pass")).resolves.toBe(true);
    await expect(verifyAdminPassword("other")).resolves.toBe(false);
  });

  it("rejects when ADMIN_PASSWORD is unset", async () => {
    delete process.env.ADMIN_PASSWORD;
    await expect(verifyAdminPassword("anything")).resolves.toBe(false);
  });
});
