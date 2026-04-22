/**
 * @file apps/web/src/portfolio-api/content/__tests__/pages.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for the local standalone page accessors.
 */

import { describe, expect, it } from "vitest";

import {
  getAllPortfolioPages,
  getPortfolioPageBySlug,
} from "@web/portfolio-api/content/pages";

describe("local standalone page accessors", () => {
  it("returns local standalone page summaries", async () => {
    const pages = await getAllPortfolioPages();

    expect(pages).toMatchObject([
      {
        slug: "now",
        title: "Now",
        subheading: "What I am focused on",
      },
    ]);
  });

  it("returns a local standalone page detail payload", async () => {
    const page = await getPortfolioPageBySlug("now");

    expect(page).toMatchObject({
      slug: "now",
      body: expect.any(Array),
    });
  });

  it("returns null when the local standalone page detail is missing", async () => {
    await expect(getPortfolioPageBySlug("missing-page")).resolves.toBeNull();
  });
});
