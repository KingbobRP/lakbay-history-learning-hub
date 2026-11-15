import { describe, expect, it } from "vitest";
import { getRouter } from "@/router";
import { lessons } from "@/lib/historia-data";
import { sitemapPathForLocation, sitemapStaticPaths, sitemapXML } from "@/lib/sitemap";

describe("Public course sitemap", () => {
  it("includes public curriculum pages but not device-specific progress or search", () => {
    const paths = sitemapStaticPaths(getRouter());
    expect(paths).toContain("/");
    expect(paths).toContain("/curriculum");
    expect(paths).not.toContain("/progress");
    expect(paths).not.toContain("/search");
    expect(paths).not.toContain("/sitemap.xml");
  });

  it("includes every existing public lesson as its real destination", () => {
    const router = getRouter();
    for (const lesson of lessons) {
      const location = router.buildLocation({ to: "/lessons/$lessonId", params: { lessonId: lesson.id }, search: () => ({}), hash: "" });
      expect(sitemapPathForLocation(router, location, "/lessons/$lessonId")).toBe(`/lessons/${lesson.id}`);
    }
  });

  it("uses the published origin and does not fabricate content dates", () => {
    const xml = sitemapXML("https://lakbay-history-learning-hub.lovable.app", [{ path: "/curriculum" }]);
    expect(xml).toContain("<loc>https://lakbay-history-learning-hub.lovable.app/curriculum</loc>");
    expect(xml).not.toContain("<lastmod>");
  });
});