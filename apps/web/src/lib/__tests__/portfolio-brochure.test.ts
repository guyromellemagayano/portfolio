/**
 * @file apps/web/src/_lib/__tests__/portfolio-brochure.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for brochure metadata normalization and fallback behavior.
 */

import { describe, expect, it } from "vitest";

import type { PageData } from "@web/data/site";
import { buildPortfolioPageMetadata } from "@web/lib/portfolio-brochure";

const basePage: PageData = {
  slug: "services",
  subheading: "Services",
  title: "Architecture review, advisory, and direct implementation work.",
  intro: "Direct help on product architecture and implementation.",
  seoCanonicalPath: "/services",
  seoNoIndex: false,
};

describe("buildPortfolioPageMetadata", () => {
  it("normalizes page titles so the root layout template does not duplicate the site name", () => {
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
      slug: "",
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
