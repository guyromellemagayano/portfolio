/**
 * @file apps/web/src/utils/pages.ts
 * @author Guy Romelle Magayano
 * @description Utilities for local standalone page normalization in the web app.
 */

import type {
  ContentPage,
  ContentPageDetailResponseData,
  ContentPortableTextBlock,
  ContentPortableTextImageBlock,
  ContentTwitterCard,
} from "@portfolio/api-contracts/content";

import {
  getLocalPageBySlug,
  getLocalPageSummaries,
} from "@web/data/portfolio-content";

export type CmsPage = {
  slug: string;
  title: string;
  subheading?: string;
  intro?: string;
  updatedAt?: string;
  hideFromSitemap?: boolean;
  seoNoIndex?: boolean;
};

export type CmsPageDetail = CmsPage & {
  seoTitle?: string;
  seoDescription?: string;
  seoCanonicalPath?: string;
  seoNoIndex?: boolean;
  seoNoFollow?: boolean;
  seoOgTitle?: string;
  seoOgDescription?: string;
  seoOgImage?: string;
  seoOgImageWidth?: number;
  seoOgImageHeight?: number;
  seoOgImageAlt?: string;
  seoTwitterCard?: ContentTwitterCard;
  body: Array<ContentPortableTextBlock | ContentPortableTextImageBlock>;
};

/** Normalizes an optional positive image dimension for safe image rendering. */
function getOptionalPositiveImageDimension(value: unknown): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return undefined;
  }

  return Math.round(value);
}

/** Maps a local page summary payload into the web CMS page shape. */
function mapContentPageToCmsPage(pageRecord: ContentPage): CmsPage | null {
  const title = pageRecord.title?.trim();
  const slug = pageRecord.slug?.trim();

  if (!title || !slug) {
    return null;
  }

  return {
    slug,
    title,
    subheading: pageRecord.subheading?.trim() || undefined,
    intro: pageRecord.intro?.trim() || undefined,
    updatedAt: pageRecord.updatedAt?.trim() || undefined,
    hideFromSitemap:
      typeof pageRecord.hideFromSitemap === "boolean"
        ? pageRecord.hideFromSitemap
        : undefined,
    seoNoIndex:
      typeof pageRecord.seoNoIndex === "boolean"
        ? pageRecord.seoNoIndex
        : undefined,
  };
}

/** Maps a local page detail payload into the web CMS page detail shape. */
function mapContentPageDetailToCmsPageDetail(
  pageRecord: ContentPageDetailResponseData
): CmsPageDetail | null {
  const page = mapContentPageToCmsPage(pageRecord);

  if (!page) {
    return null;
  }

  return {
    ...page,
    seoTitle: pageRecord.seoTitle?.trim() || undefined,
    seoDescription: pageRecord.seoDescription?.trim() || undefined,
    seoCanonicalPath: pageRecord.seoCanonicalPath?.trim() || undefined,
    seoNoIndex:
      typeof pageRecord.seoNoIndex === "boolean"
        ? pageRecord.seoNoIndex
        : undefined,
    seoNoFollow:
      typeof pageRecord.seoNoFollow === "boolean"
        ? pageRecord.seoNoFollow
        : undefined,
    seoOgTitle: pageRecord.seoOgTitle?.trim() || undefined,
    seoOgDescription: pageRecord.seoOgDescription?.trim() || undefined,
    seoOgImage: pageRecord.seoOgImageUrl?.trim() || undefined,
    seoOgImageWidth: getOptionalPositiveImageDimension(
      pageRecord.seoOgImageWidth
    ),
    seoOgImageHeight: getOptionalPositiveImageDimension(
      pageRecord.seoOgImageHeight
    ),
    seoOgImageAlt: pageRecord.seoOgImageAlt?.trim() || undefined,
    seoTwitterCard: pageRecord.seoTwitterCard,
    body: Array.isArray(pageRecord.body) ? pageRecord.body : [],
  };
}

/** Gets all standalone local pages and normalizes them for web routes. */
export async function getAllPages(): Promise<CmsPage[]> {
  return getLocalPageSummaries()
    .map(mapContentPageToCmsPage)
    .filter((page): page is CmsPage => page !== null);
}

/** Gets a single standalone local page detail payload by slug. */
export async function getPageBySlug(
  slug: string
): Promise<CmsPageDetail | null> {
  const page = getLocalPageBySlug(slug);

  if (!page) {
    return null;
  }

  return mapContentPageDetailToCmsPageDetail(page);
}
