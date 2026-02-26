/**
 * @file apps/web/src/utils/pages.ts
 * @author Guy Romelle Magayano
 * @description Utilities for Sanity-backed standalone page normalization in the web app.
 */

import type {
  ContentPage,
  ContentPageDetailResponseData,
  ContentPortableTextBlock,
  ContentPortableTextImageBlock,
  ContentTwitterCard,
} from "@portfolio/api-contracts/content";

import { getAllGatewayPages, getGatewayPageBySlug } from "@web/gateway/content";

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

/** Maps a gateway page summary payload into the web CMS page shape. */
function mapGatewayPageToCmsPage(gatewayPage: ContentPage): CmsPage | null {
  const title = gatewayPage.title?.trim();
  const slug = gatewayPage.slug?.trim();

  if (!title || !slug) {
    return null;
  }

  return {
    slug,
    title,
    subheading: gatewayPage.subheading?.trim() || undefined,
    intro: gatewayPage.intro?.trim() || undefined,
    updatedAt: gatewayPage.updatedAt?.trim() || undefined,
    hideFromSitemap:
      typeof gatewayPage.hideFromSitemap === "boolean"
        ? gatewayPage.hideFromSitemap
        : undefined,
    seoNoIndex:
      typeof gatewayPage.seoNoIndex === "boolean"
        ? gatewayPage.seoNoIndex
        : undefined,
  };
}

/** Maps a gateway page detail payload into the web CMS page detail shape. */
function mapGatewayPageDetailToCmsPageDetail(
  gatewayPage: ContentPageDetailResponseData
): CmsPageDetail | null {
  const page = mapGatewayPageToCmsPage(gatewayPage);

  if (!page) {
    return null;
  }

  return {
    ...page,
    seoTitle: gatewayPage.seoTitle?.trim() || undefined,
    seoDescription: gatewayPage.seoDescription?.trim() || undefined,
    seoCanonicalPath: gatewayPage.seoCanonicalPath?.trim() || undefined,
    seoNoIndex:
      typeof gatewayPage.seoNoIndex === "boolean"
        ? gatewayPage.seoNoIndex
        : undefined,
    seoNoFollow:
      typeof gatewayPage.seoNoFollow === "boolean"
        ? gatewayPage.seoNoFollow
        : undefined,
    seoOgTitle: gatewayPage.seoOgTitle?.trim() || undefined,
    seoOgDescription: gatewayPage.seoOgDescription?.trim() || undefined,
    seoOgImage: gatewayPage.seoOgImageUrl?.trim() || undefined,
    seoOgImageWidth: getOptionalPositiveImageDimension(
      gatewayPage.seoOgImageWidth
    ),
    seoOgImageHeight: getOptionalPositiveImageDimension(
      gatewayPage.seoOgImageHeight
    ),
    seoOgImageAlt: gatewayPage.seoOgImageAlt?.trim() || undefined,
    seoTwitterCard: gatewayPage.seoTwitterCard,
    body: Array.isArray(gatewayPage.body) ? gatewayPage.body : [],
  };
}

/** Gets all standalone pages from the API gateway and normalizes them for web routes. */
export async function getAllPages(): Promise<CmsPage[]> {
  return (await getAllGatewayPages())
    .map(mapGatewayPageToCmsPage)
    .filter((page): page is CmsPage => page !== null);
}

/** Gets a single standalone page detail payload from the API gateway by slug. */
export async function getPageBySlug(
  slug: string
): Promise<CmsPageDetail | null> {
  const gatewayPage = await getGatewayPageBySlug(slug);

  if (!gatewayPage) {
    return null;
  }

  return mapGatewayPageDetailToCmsPageDetail(gatewayPage);
}
