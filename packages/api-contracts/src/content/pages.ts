/**
 * @file packages/api-contracts/src/content/pages.ts
 * @author Guy Romelle Magayano
 * @description Canonical content contracts for standalone page resources.
 */

import type {
  ContentPortableTextBlock,
  ContentPortableTextImageBlock,
  ContentTwitterCard,
} from "./articles";

/** Route path for content pages in the API gateway. */
export const CONTENT_PAGES_ROUTE = "/v1/content/pages";

/** Route pattern for a single content page in the API gateway. */
export const CONTENT_PAGE_ROUTE_PATTERN = "/v1/content/pages/:slug";

/** Builds the canonical API gateway route for a content page slug. */
export function getContentPageRoute(slug: string): string {
  return `${CONTENT_PAGES_ROUTE}/${encodeURIComponent(slug)}`;
}

/** Canonical standalone page payload returned by the API gateway. */
export type ContentPage = {
  id: string;
  slug: string;
  title: string;
  subheading?: string;
  intro?: string;
  updatedAt?: string;
  hideFromSitemap?: boolean;
  seoNoIndex?: boolean;
};

/** Canonical list payload returned by the pages endpoint. */
export type ContentPagesResponseData = ContentPage[];

/** Canonical standalone page detail payload returned by the API gateway. */
export type ContentPageDetail = ContentPage & {
  seoTitle?: string;
  seoDescription?: string;
  seoCanonicalPath?: string;
  seoNoIndex?: boolean;
  seoNoFollow?: boolean;
  seoOgTitle?: string;
  seoOgDescription?: string;
  seoOgImageUrl?: string;
  seoOgImageWidth?: number;
  seoOgImageHeight?: number;
  seoOgImageAlt?: string;
  seoTwitterCard?: ContentTwitterCard;
  body: Array<ContentPortableTextBlock | ContentPortableTextImageBlock>;
};

/** Canonical detail response payload returned by the page detail endpoint. */
export type ContentPageDetailResponseData = ContentPageDetail;
