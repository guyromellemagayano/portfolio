/**
 * @file sanity/_types/articles.ts
 * @author Guy Romelle Magayano
 * @description Types for Sanity article query responses.
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
