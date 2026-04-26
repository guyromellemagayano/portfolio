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
      images: [
        {
          alt: "Guy Romelle Magayano - product engineering consultant portfolio",
          height: 630,
          url: "https://www.guyromellemagayano.com/og-image.png",
          width: 1200,
        },
      ],
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: "Services",
      images: ["https://www.guyromellemagayano.com/og-image.png"],
    });
    expect(metadata.robots).toEqual({
      index: true,
      follow: true,
    });
    expect(metadata.structuredData).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "@type": "BreadcrumbList",
        }),
      ])
    );
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
    expect(metadata.structuredData).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "@type": "BreadcrumbList",
        }),
      ])
    );
  });

  it("keeps extended homepage titles absolute to avoid repeating the owner name", () => {
    const metadata = buildPortfolioPageMetadata({
      ...basePage,
      slug: "",
      title: "Home",
      seoTitle: "Guy Romelle Magayano - Product Engineering Consultant",
      seoCanonicalPath: "/",
    });

    expect(metadata.title).toEqual({
      absolute: "Guy Romelle Magayano - Product Engineering Consultant",
    });
  });
});
