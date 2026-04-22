/**
 * @file apps/web/src/utils/__tests__/articles.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for local article utility behavior.
 */

import { describe, expect, it } from "vitest";

import { getAllArticles, getArticleBySlug } from "@web/utils/articles";

describe("getAllArticles", () => {
  it("returns local articles in reverse chronological order", async () => {
    await expect(getAllArticles()).resolves.toMatchObject([
      {
        slug: "designing-system-boundaries-before-the-ui-starts-drifting",
        title: "Designing system boundaries before the UI starts drifting",
      },
      {
        slug: "a-monorepo-should-prove-leverage-not-just-collect-packages",
        title: "A monorepo should prove leverage, not just collect packages",
      },
      {
        slug: "content-models-are-product-architecture-not-editorial-paperwork",
        title:
          "Content models are product architecture, not editorial paperwork",
      },
    ]);
  });
});

describe("getArticleBySlug", () => {
  it("returns null when the local article detail is not found", async () => {
    await expect(getArticleBySlug("missing-article")).resolves.toBeNull();
  });

  it("normalizes the local article detail payload", async () => {
    await expect(
      getArticleBySlug(
        "designing-system-boundaries-before-the-ui-starts-drifting"
      )
    ).resolves.toMatchObject({
      slug: "designing-system-boundaries-before-the-ui-starts-drifting",
      title: "Designing system boundaries before the UI starts drifting",
      tags: ["frontend-architecture", "design-systems", "product-systems"],
      body: expect.any(Array),
    });
  });
});
