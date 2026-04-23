/**
 * @file apps/web/src/app/_lib/__tests__/portfolio-brochure.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for brochure metadata normalization and fallback behavior.
 */

import { describe, expect, it } from "vitest";

import type { ContentPortfolioPage } from "@portfolio/api-contracts/content";

import { buildPortfolioPageMetadata } from "@web/app/_lib/portfolio-brochure";

const basePage: ContentPortfolioPage = {
  id: "page-services",
  slug: "services",
  subheading: "Services",
  title: "Architecture review, advisory, and direct implementation work.",
  intro: "Direct help on product architecture and implementation.",
  template: "services",
  sections: [],
  seoCanonicalPath: "/services",
  seoNoIndex: false,
  status: "published",
  updatedAt: "2026-04-22T00:00:00.000Z",
};

describe("buildPortfolioPageMetadata", () => {
  it("normalizes CMS titles so the root layout template does not duplicate the site name", () => {
    const metadata = buildPortfolioPageMetadata({
      ...basePage,
      seoTitle: "Services - Guy Romelle Magayano",
      seoDescription: "Consulting and implementation for product systems.",
    });

    expect(metadata.title).toBe("Services");
    expect(metadata.description).toBe(
      "Consulting and implementation for product systems."
    );
    expect(metadata.openGraph).toMatchObject({
      type: "website",
      title: "Services",
      siteName: "Guy Romelle Magayano",
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary",
      title: "Services",
    });
    expect(metadata.robots).toEqual({
      index: true,
      follow: true,
    });
  });

  it("returns an absolute title for the homepage without applying the layout suffix", () => {
    const metadata = buildPortfolioPageMetadata({
      ...basePage,
      id: "page-home",
      slug: "",
      template: "home",
      title: "Home",
      seoTitle: "Guy Romelle Magayano",
      seoCanonicalPath: "/",
    });

    expect(metadata.title).toEqual({
      absolute: "Guy Romelle Magayano",
    });
    expect(metadata.openGraph).toMatchObject({
      title: "Guy Romelle Magayano",
    });
  });
});
