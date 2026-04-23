/**
 * @file apps/web/src/app/_lib/portfolio-brochure.ts
 * @author Guy Romelle Magayano
 * @description Shared helpers for brochure-page snapshot lookup and metadata generation.
 */

import { cache } from "react";

import type { Metadata } from "next";

import type {
  ContentPortfolioPage,
  ContentPortfolioSnapshot,
  ContentSocialPlatform,
} from "@portfolio/api-contracts/content";

import {
  resolveMetadataTitle,
  resolveMetadataTitleText,
  SITE_NAME,
} from "@web/app/_lib/metadata";
import { getLocalPortfolioSnapshot } from "@web/data/portfolio-content";
import { toAbsoluteSiteUrl } from "@web/utils/site-url";

const getCachedPortfolioSnapshot = cache(async () =>
  getLocalPortfolioSnapshot()
);

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
  const description = page.seoDescription || page.intro || page.title;
  const socialTitle = resolveMetadataTitleText(page.seoTitle, page.title);
  const canonicalUrl = page.seoCanonicalPath
    ? toAbsoluteSiteUrl(page.seoCanonicalPath)
    : undefined;
  const pagePath = page.seoCanonicalPath || (page.slug ? `/${page.slug}` : "/");
  const pageUrl = canonicalUrl ?? toAbsoluteSiteUrl(pagePath);

  return {
    title: resolveMetadataTitle(page.seoTitle, page.title),
    description,
    alternates: canonicalUrl
      ? {
          canonical: canonicalUrl,
        }
      : undefined,
    robots: {
      index: page.seoNoIndex === true ? false : true,
      follow: true,
    },
    openGraph: {
      type: "website",
      title: socialTitle,
      description,
      url: pageUrl,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary",
      title: socialTitle,
      description,
    },
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
