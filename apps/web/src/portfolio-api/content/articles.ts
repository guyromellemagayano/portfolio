/**
 * @file apps/web/src/portfolio-api/content/articles.ts
 * @author Guy Romelle Magayano
 * @description Local article content accessors retained behind the existing web module path.
 */

import { cache } from "react";

import { contentSnapshot } from "@portfolio/content-data";

/** Returns all local article summaries in their canonical sorted order. */
export const getAllPortfolioArticles = cache(
  async function getAllPortfolioArticles() {
    return globalThis.structuredClone(contentSnapshot.articleSummaries);
  }
);

/** Returns a single local article detail payload by slug. */
export const getPortfolioArticleBySlug = cache(
  async function getPortfolioArticleBySlug(slug: string) {
    const normalizedSlug = slug.trim();

    if (!normalizedSlug) {
      return null;
    }

    const article = contentSnapshot.articleBySlug.get(normalizedSlug) ?? null;

    return article ? globalThis.structuredClone(article) : null;
  }
);
