/**
 * @file apps/web/src/data/portfolio-content.ts
 * @author Guy Romelle Magayano
 * @description Direct local content accessors for the web app portfolio, article, and page data.
 */

import type {
  ContentArticle,
  ContentArticleDetailResponseData,
  ContentPage,
  ContentPageDetailResponseData,
  ContentPortfolioPage,
  ContentPortfolioSnapshot,
} from "@portfolio/api-contracts/content";
import { contentSnapshot } from "@portfolio/content-data";

/** Clones local content records so route code cannot mutate the canonical snapshot. */
function cloneSnapshotRecord<T>(value: T): T {
  return globalThis.structuredClone(value);
}

/** Returns the canonical local portfolio snapshot for brochure pages and shell data. */
export function getLocalPortfolioSnapshot(): ContentPortfolioSnapshot {
  return cloneSnapshotRecord(contentSnapshot.portfolio);
}

/** Returns a local brochure page document by slug. */
export function getLocalPortfolioPageBySlug(
  slug: string
): ContentPortfolioPage | null {
  const normalizedSlug = slug.trim();
  const page =
    contentSnapshot.portfolio.pages.find(
      (entry) => entry.slug === normalizedSlug
    ) ?? null;

  return page ? cloneSnapshotRecord(page) : null;
}

/** Returns local standalone article summaries in their canonical sorted order. */
export function getLocalArticleSummaries(): Array<ContentArticle> {
  return cloneSnapshotRecord(contentSnapshot.articleSummaries);
}

/** Returns a local standalone article detail by slug. */
export function getLocalArticleBySlug(
  slug: string
): ContentArticleDetailResponseData | null {
  const normalizedSlug = slug.trim();

  if (!normalizedSlug) {
    return null;
  }

  const article = contentSnapshot.articleBySlug.get(normalizedSlug) ?? null;

  return article ? cloneSnapshotRecord(article) : null;
}

/** Returns local standalone page summaries in their canonical sorted order. */
export function getLocalPageSummaries(): Array<ContentPage> {
  return cloneSnapshotRecord(contentSnapshot.pageSummaries);
}

/** Returns a local standalone page detail by slug. */
export function getLocalPageBySlug(
  slug: string
): ContentPageDetailResponseData | null {
  const normalizedSlug = slug.trim();

  if (!normalizedSlug) {
    return null;
  }

  const page = contentSnapshot.pageBySlug.get(normalizedSlug) ?? null;

  return page ? cloneSnapshotRecord(page) : null;
}
