/**
 * @file apps/api-portfolio/src/modules/content/content.service.ts
 * @author Guy Romelle Magayano
 * @description Content service orchestrating provider-level article retrieval.
 */

import type { ApiArticle, ApiArticleDetail } from "../../contracts/articles.js";
import type { ApiPage, ApiPageDetail } from "../../contracts/pages.js";
import type { ContentProvider } from "../../providers/content/content.provider.js";

export type ContentService = {
  providerName: ContentProvider["name"];
  getArticles: () => Promise<ApiArticle[]>;
  getArticleBySlug: (slug: string) => Promise<ApiArticleDetail | null>;
  getPages: () => Promise<ApiPage[]>;
  getPageBySlug: (slug: string) => Promise<ApiPageDetail | null>;
};

/** Creates content service bound to a specific provider implementation. */
export function createContentService(
  contentProvider: ContentProvider
): ContentService {
  return {
    providerName: contentProvider.name,
    getArticles: () => contentProvider.getArticles(),
    getArticleBySlug: (slug: string) => contentProvider.getArticleBySlug(slug),
    getPages: () => contentProvider.getPages(),
    getPageBySlug: (slug: string) => contentProvider.getPageBySlug(slug),
  };
}
