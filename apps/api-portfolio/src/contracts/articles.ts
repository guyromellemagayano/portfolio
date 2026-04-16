/**
 * @file apps/api-portfolio/src/contracts/articles.ts
 * @author Guy Romelle Magayano
 * @description Portfolio API contract for normalized article payloads.
 */

import type {
  ContentArticle,
  ContentArticleDetail,
} from "@portfolio/api-contracts/content";

/** Local alias used by API modules for canonical content article contracts. */
export type ApiArticle = ContentArticle;

/** Local alias used by API modules for canonical article detail contracts. */
export type ApiArticleDetail = ContentArticleDetail;
