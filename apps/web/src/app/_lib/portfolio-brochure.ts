/**
 * @file apps/web/src/app/_lib/portfolio-brochure.ts
 * @author Guy Romelle Magayano
 * @description Shared helpers for brochure-page snapshot lookup and metadata generation.
 */

import type { Metadata } from "next";
import { cache } from "react";

import type {
  ContentPortfolioPage,
  ContentPortfolioSnapshot,
  ContentSocialPlatform,
} from "@portfolio/api-contracts/content";

import { getPortfolioSnapshot } from "@web/portfolio-api/portfolio";
import { toAbsoluteSiteUrl } from "@web/utils/site-url";

const getCachedPortfolioSnapshot = cache(getPortfolioSnapshot);

/** Resolves the canonical portfolio snapshot once per render tree. */
export async function getBrochureSnapshot(): Promise<ContentPortfolioSnapshot> {
  return getCachedPortfolioSnapshot();
}

/** Resolves a brochure page by slug and throws when the slug is missing from the snapshot. */
export async function getPortfolioBrochurePage(slug: string): Promise<{
  snapshot: ContentPortfolioSnapshot;
  page: ContentPortfolioPage;
}> {
  const snapshot = await getBrochureSnapshot();
  const normalizedSlug = slug.trim();
  const page = snapshot.pages.find((entry) => entry.slug === normalizedSlug);

  if (!page) {
    throw new Error(
      `Portfolio brochure page not found for slug "${normalizedSlug || "home"}".`
    );
  }

  return {
    snapshot,
    page,
  };
}

/** Builds route metadata from the canonical brochure page record. */
export function buildPortfolioPageMetadata(
  page: ContentPortfolioPage
): Metadata {
  const canonicalUrl = page.seoCanonicalPath
    ? toAbsoluteSiteUrl(page.seoCanonicalPath)
    : undefined;

  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || page.intro,
    alternates: canonicalUrl
      ? {
          canonical: canonicalUrl,
        }
      : undefined,
  };
}

/** Reads the configured external inquiry form action for the static hire page. */
export function getPortfolioInquiryFormActionUrl(): string | null {
  const candidates = [
    globalThis.process.env.PORTFOLIO_INQUIRY_FORM_ACTION,
    globalThis.process.env.PORTFOLIO_INQUIRY_FORM_ACTION_URL,
  ];

  for (const candidate of candidates) {
    const normalizedValue = candidate?.trim();

    if (normalizedValue) {
      return normalizedValue;
    }
  }

  return null;
}

/** Resolves a specific portfolio social link by canonical platform name. */
export function getPortfolioSocialLinkByPlatform(
  snapshot: ContentPortfolioSnapshot,
  platform: ContentSocialPlatform
) {
  return snapshot.socialLinks.find((entry) => entry.platform === platform);
}
