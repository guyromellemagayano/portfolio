/**
 * @file apps/web/src/_lib/portfolio-brochure.ts
 * @author Guy Romelle Magayano
 * @description Shared helpers for brochure-page lookup and metadata generation.
 */

import { getPage, type PageData, socialLinks } from "@web/data/site";
import type { WebPageMetadata } from "@web/lib/metadata.types";
import {
  resolveMetadataTitle,
  resolveMetadataTitleText,
  SITE_NAME,
} from "@web/lib-pages/metadata";
import { buildWebPageStructuredData } from "@web/lib-pages/structured-data";
import { toAbsoluteSiteUrl } from "@web/utils/site-url";

/** Resolves a brochure page by slug and throws when the slug is missing. */
export async function getPortfolioBrochurePage(slug: string): Promise<{
  page: PageData;
}> {
  return {
    page: getPage(slug),
  };
}

/** Builds route metadata from the canonical brochure page record. */
export function buildPortfolioPageMetadata(page: PageData): WebPageMetadata {
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
    structuredData: buildWebPageStructuredData(page),
  };
}

/** Resolves a specific portfolio social link by canonical platform name. */
export function getPortfolioSocialLinkByPlatform(
  platform: "email" | "github" | "instagram" | "linkedin" | "website" | "x"
) {
  return socialLinks.find((entry) => entry.platform === platform);
}
