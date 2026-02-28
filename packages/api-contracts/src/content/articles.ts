/**
 * @file packages/api-contracts/src/content/articles.ts
 * @author Guy Romelle Magayano
 * @description Canonical content contracts for article resources.
 */

import { API_VERSION_PREFIX } from "../http/routes";

/** Route prefix for content resources in the API gateway. */
export const CONTENT_ROUTE_PREFIX = `${API_VERSION_PREFIX}/content`;

/** Route path for content articles in the API gateway. */
export const CONTENT_ARTICLES_ROUTE = `${CONTENT_ROUTE_PREFIX}/articles`;

/** Route pattern for a single content article in the API gateway. */
export const CONTENT_ARTICLE_ROUTE_PATTERN = `${CONTENT_ARTICLES_ROUTE}/:slug`;

/** Builds the canonical API gateway route for a content article slug. */
export function getContentArticleRoute(slug: string): string {
  return `${CONTENT_ARTICLES_ROUTE}/${encodeURIComponent(slug)}`;
}

/** Canonical article payload returned by the API gateway. */
export type ContentArticle = {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  hideFromSitemap?: boolean;
  seoNoIndex?: boolean;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  tags: string[];
};

/** Supported Twitter card values for article metadata. */
export type ContentTwitterCard = "summary" | "summary_large_image";

/** Canonical list payload returned by the articles endpoint. */
export type ContentArticlesResponseData = ContentArticle[];

/** Portable Text mark definition object used by Sanity block content. */
export type ContentPortableTextMarkDef = {
  _key?: string;
  _type?: string;
  [key: string]: unknown;
};

/** Portable Text span node used in text blocks. */
export type ContentPortableTextSpan = {
  _key?: string;
  _type: "span";
  text: string;
  marks?: string[];
};

/** Portable Text image block normalized with a direct asset URL when available. */
export type ContentPortableTextImageBlock = {
  _key?: string;
  _type: "image";
  alt?: string;
  asset?: {
    url?: string;
    width?: number;
    height?: number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

/** Generic Portable Text block payload used for article body content. */
export type ContentPortableTextBlock = {
  _key?: string;
  _type: string;
  style?: string;
  listItem?: string;
  level?: number;
  children?: ContentPortableTextSpan[];
  markDefs?: ContentPortableTextMarkDef[];
  [key: string]: unknown;
};

/** Canonical detail payload returned by the article detail endpoint. */
export type ContentArticleDetail = ContentArticle & {
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
  hideFromSitemap?: boolean;
  imageAlt?: string;
  body: Array<ContentPortableTextBlock | ContentPortableTextImageBlock>;
};

/** Canonical detail response payload returned by the article detail endpoint. */
export type ContentArticleDetailResponseData = ContentArticleDetail;
