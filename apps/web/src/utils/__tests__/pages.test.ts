/**
 * @file apps/web/src/utils/__tests__/pages.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for local standalone page utility behavior.
 */

import { describe, expect, it } from "vitest";

import { getAllPages, getPageBySlug } from "@web/utils/pages";

describe("getAllPages", () => {
  it("returns local standalone pages", async () => {
    await expect(getAllPages()).resolves.toEqual([
      {
        slug: "now",
        title: "Now",
        subheading: "What I am focused on",
        intro:
          "A personal snapshot of what I am learning, studying, and rehearsing right now.",
        updatedAt: "2026-05-09T00:00:00.000Z",
        hideFromSitemap: false,
        seoNoIndex: false,
      },
    ]);
  });
});

describe("getPageBySlug", () => {
  it("returns null when the local standalone page is not found", async () => {
    await expect(getPageBySlug("missing-page")).resolves.toBeNull();
  });

  it("returns the local standalone page detail payload", async () => {
    await expect(getPageBySlug("now")).resolves.toMatchObject({
      slug: "now",
      title: "Now",
      seoDescription:
        "A personal snapshot of what Guy Romelle Magayano is learning, studying, and rehearsing right now across software architecture, product thinking, and technical communication.",
      body: expect.any(Array),
    });
  });
});
