/**
 * @file apps/web/src/portfolio-api/content/pages.ts
 * @author Guy Romelle Magayano
 * @description Local standalone page accessors retained behind the existing web module path.
 */

import { cache } from "react";

import { contentSnapshot } from "@portfolio/content-data";

/** Returns all local standalone page summaries in their canonical sorted order. */
export const getAllPortfolioPages = cache(
  async function getAllPortfolioPages() {
    return globalThis.structuredClone(contentSnapshot.pageSummaries);
  }
);

/** Returns a single local standalone page detail payload by slug. */
export const getPortfolioPageBySlug = cache(
  async function getPortfolioPageBySlug(slug: string) {
    const normalizedSlug = slug.trim();

    if (!normalizedSlug) {
      return null;
    }

    const page = contentSnapshot.pageBySlug.get(normalizedSlug) ?? null;

    return page ? globalThis.structuredClone(page) : null;
  }
);
