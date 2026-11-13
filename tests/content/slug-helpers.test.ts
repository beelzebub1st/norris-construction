import { describe, expect, it } from "vitest";
import {
  getAreaBySlug,
  getPostBySlug,
  getProjectBySlug,
  getServiceBySlug,
  parseBeforeAfter,
  parseServiceFaqs,
} from "@/lib/content";

describe("content slug helpers", () => {
  it("exports prisma slug lookup helpers", () => {
    expect(typeof getServiceBySlug).toBe("function");
    expect(typeof getProjectBySlug).toBe("function");
    expect(typeof getAreaBySlug).toBe("function");
    expect(typeof getPostBySlug).toBe("function");
  });

  it("parses service FAQs from JSON", () => {
    const faqs = parseServiceFaqs([
      { q: "Timeline?", a: "12–18 months." },
      { bad: true },
    ]);
    expect(faqs).toEqual([{ q: "Timeline?", a: "12–18 months." }]);
  });

  it("parses before/after pairs from JSON", () => {
    const pairs = parseBeforeAfter([
      { before: "/a.jpg", after: "/b.jpg", caption: "Kitchen" },
      { before: "x" },
    ]);
    expect(pairs).toEqual([
      { before: "/a.jpg", after: "/b.jpg", caption: "Kitchen" },
    ]);
  });
});
