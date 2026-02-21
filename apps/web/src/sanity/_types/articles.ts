/**
 * @file apps/web/src/sanity/_types/articles.ts
 * @author Guy Romelle Magayano
 * @description Type definitions for Sanity article documents and query results.
 */

export type SanityArticleTag = string | { title?: string | null } | null;

export type SanityArticleDocument = {
  _id: string;
  title?: string | null;
  slug?: string | null;
  date?: string | null;
  description?: string | null;
  image?: string | null;
  tags?: SanityArticleTag[] | null;
};
