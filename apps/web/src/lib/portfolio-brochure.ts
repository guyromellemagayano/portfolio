/**
 * @file apps/web/src/lib/portfolio-brochure.ts
 * @author Guy Romelle Magayano
 * @description Shared helpers for brochure-page lookup and metadata generation.
 */

import { getPage, type PageData, socialLinks } from "@web/data/site";
import {
  buildOpenGraphImages,
  buildPageMetadata,
  buildTwitterImages,
  resolveMetadataDescription,
  resolveMetadataTitle,
} from "@web/lib/metadata";
import { type WebPageMetadata } from "@web/lib/metadata.types";
import {
  buildBreadcrumbListStructuredData,
  buildWebPageStructuredData,
} from "@web/lib/structured-data";

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
  const description = resolveMetadataDescription(
    page.seoDescription,
    page.intro,
    page.title
  );
  const pagePath = page.seoCanonicalPath || (page.slug ? `/${page.slug}` : "/");
  const structuredData = [
    buildWebPageStructuredData(page),
    ...(page.slug
      ? [
          buildBreadcrumbListStructuredData([
            { name: "Home", path: "/" },
            { name: page.subheading || page.title, path: pagePath },
          ]),
        ]
      : []),
  ];
  const title =
    page.slug === ""
      ? {
          absolute: resolveMetadataDescription(page.seoTitle, page.title),
        }
      : resolveMetadataTitle(page.seoTitle, page.title);

  return buildPageMetadata({
    canonicalPathOrUrl: pagePath,
    description,
    openGraphImages: buildOpenGraphImages(),
    robots: {
      index: page.seoNoIndex === true ? false : true,
      follow: true,
    },
    structuredData,
    title,
    twitterImages: buildTwitterImages(),
  });
}

/** Resolves a specific portfolio social link by canonical platform name. */
export function getPortfolioSocialLinkByPlatform(
  platform: "email" | "github" | "instagram" | "linkedin" | "website" | "x"
) {
  return socialLinks.find((entry) => entry.platform === platform);
}
