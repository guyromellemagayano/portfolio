/**
 * @file packages/content-data/src/__tests__/snapshot.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for the assembled local content snapshot.
 */

import { describe, expect, it } from "vitest";

import { articlesSnapshot } from "../articles";
import { pagesSnapshot } from "../pages";
import { portfolioSnapshot } from "../portfolio";
import { contentSnapshot } from "../snapshot";

describe("content snapshot", () => {
  it("exposes article summaries without article bodies", () => {
    const articleSummary = contentSnapshot.articleSummaries[0]!;
    const articleDetail = articlesSnapshot[0]!;

    expect(articleSummary).toMatchObject({
      id: articleDetail.id,
      slug: articleDetail.slug,
      title: articleDetail.title,
      publishedAt: articleDetail.publishedAt,
      excerpt: articleDetail.excerpt,
    });
    expect("body" in articleSummary).toBe(false);
    expect(articleSummary.tags).not.toBe(articleDetail.tags);
  });

  it("indexes article details by slug", () => {
    const articleDetail = articlesSnapshot[0]!;

    expect(contentSnapshot.articleBySlug.get(articleDetail.slug)).toEqual(
      articleDetail
    );
  });

  it("exposes page summaries without page bodies", () => {
    const pageSummary = contentSnapshot.pageSummaries[0]!;
    const pageDetail = pagesSnapshot[0]!;

    expect(pageSummary).toMatchObject({
      id: pageDetail.id,
      slug: pageDetail.slug,
      title: pageDetail.title,
      subheading: pageDetail.subheading,
      intro: pageDetail.intro,
      updatedAt: pageDetail.updatedAt,
    });
    expect("body" in pageSummary).toBe(false);
  });

  it("indexes page details by slug", () => {
    const pageDetail = pagesSnapshot[0]!;

    expect(contentSnapshot.pageBySlug.get(pageDetail.slug)).toEqual(pageDetail);
  });

  it("re-exports the canonical portfolio snapshot", () => {
    expect(contentSnapshot.portfolio).toEqual(portfolioSnapshot);
  });
});
