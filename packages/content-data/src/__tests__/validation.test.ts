/**
 * @file packages/content-data/src/__tests__/validation.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for local content snapshot validation helpers.
 */

import { describe, expect, it } from "vitest";

import { articlesSnapshot } from "../articles";
import { pagesSnapshot } from "../pages";
import { portfolioSnapshot } from "../portfolio";
import {
  validateArticleSnapshot,
  validatePageSnapshot,
  validatePortfolioSnapshot,
} from "../validation";

describe("content snapshot validation", () => {
  it("accepts the seeded snapshots", () => {
    expect(() => validateArticleSnapshot(articlesSnapshot)).not.toThrow();
    expect(() => validatePageSnapshot(pagesSnapshot)).not.toThrow();
    expect(() => validatePortfolioSnapshot(portfolioSnapshot)).not.toThrow();
  });

  it("rejects duplicate article slugs", () => {
    const seedArticle = articlesSnapshot[0];

    expect(seedArticle).toBeDefined();

    const duplicateArticles = [
      ...articlesSnapshot,
      {
        ...seedArticle!,
        id: "local-article-duplicate",
      },
    ];

    expect(() => validateArticleSnapshot(duplicateArticles)).toThrow(
      /articlesSnapshot\[1\]\.slug: slug must be unique/
    );
  });

  it("rejects invalid page bodies", () => {
    const seedPage = pagesSnapshot[0];

    expect(seedPage).toBeDefined();

    const invalidPages = [
      {
        ...seedPage!,
        body: "not-an-array",
      },
    ];

    expect(() =>
      validatePageSnapshot(invalidPages as unknown as typeof pagesSnapshot)
    ).toThrow(/pagesSnapshot\[0\]\.body: body must be an array/);
  });

  it("rejects unknown portfolio references", () => {
    const invalidPortfolio = globalThis.structuredClone(portfolioSnapshot);
    const seedPage = invalidPortfolio.pages[0];

    expect(seedPage).toBeDefined();

    invalidPortfolio.pages[0] = {
      ...seedPage!,
      sections: [
        {
          type: "projects",
          title: "Broken",
          projectSlugs: ["missing-project"],
        },
      ],
    };

    expect(() => validatePortfolioSnapshot(invalidPortfolio)).toThrow(
      /references an unknown project slug/
    );
  });
});
