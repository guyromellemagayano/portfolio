/**
 * @file apps/api/src/providers/content/static-content.provider.ts
 * @author Guy Romelle Magayano
 * @description Static fallback provider for content module.
 */

import type { ContentProvider } from "@api/providers/content/content.provider";

/** Creates a static provider used when external providers are disabled or unavailable. */
export function createStaticContentProvider(): ContentProvider {
  return {
    name: "static",
    async getArticles() {
      return [];
    },
    async getArticleBySlug() {
      return null;
    },
  };
}
