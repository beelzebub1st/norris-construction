import { describe, expect, it } from "vitest";
import { buildSitemapPaths } from "@/lib/seo/sitemap-paths";

describe("buildSitemapPaths", () => {
  it("includes static routes and dynamic slugs from mocked data", () => {
    const paths = buildSitemapPaths({
      services: [{ slug: "kitchens" }],
      projects: [{ slug: "coral-gables-remodel" }],
      areas: [{ slug: "miami-beach" }],
      posts: [{ slug: "planning-a-remodel" }],
    });

    expect(paths).toContain("/");
    expect(paths).toContain("/contact");
    expect(paths).toContain("/services/kitchens");
    expect(paths).toContain("/projects/coral-gables-remodel");
    expect(paths).toContain("/areas/miami-beach");
    expect(paths).toContain("/blog/planning-a-remodel");
    expect(paths.length).toBe(6 + 4);
  });
});
