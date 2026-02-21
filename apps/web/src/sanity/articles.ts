/**
 * @file sanity/articles.ts
 * @author Guy Romelle Magayano
 * @description Sanity article data source and mappers.
 */

import { SANITY_ARTICLES_QUERY } from "@web/sanity/_queries/articles.queries";
import {
  type SanityArticleDocument,
  type SanityArticleTag,
} from "@web/sanity/_types/articles";
import { fetchSanityQuery, hasSanityConfig } from "@web/sanity/client";

export type SanityArticleWithSlug = {
  title: string;
  date: string;
  description: string;
  slug: string;
  image?: string;
  tags?: string[];
};

/** Extracts and trims the tag name from a `SanityArticleTag` (string or object). */
function extractSanityTagName(tag: SanityArticleTag): string | null {
  if (typeof tag === "string") {
    const trimmedTag = tag.trim();
    return trimmedTag.length > 0 ? trimmedTag : null;
  }

  if (tag && typeof tag === "object" && typeof tag.title === "string") {
    const trimmedTitle = tag.title.trim();
    return trimmedTitle.length > 0 ? trimmedTitle : null;
  }

  return null;
}

/** Maps a `SanityArticleDocument` to `SanityArticleWithSlug` or returns `null` if required fields are missing. */
export function toArticleWithSlug(
  sanityArticle: SanityArticleDocument
): SanityArticleWithSlug | null {
  const title = sanityArticle?.title?.trim();
  const slug = sanityArticle?.slug?.trim();
  const date = sanityArticle?.date?.trim();
  const description = sanityArticle?.description?.trim() ?? "";
  const image = sanityArticle?.image?.trim();
  const tags =
    sanityArticle?.tags
      ?.map(extractSanityTagName)
      .filter((tag): tag is string => Boolean(tag)) ?? [];

  if (!title || !slug || !date) {
    return null;
  }

  return {
    title,
    slug,
    date,
    description,
    image: image || undefined,
    tags: tags.length > 0 ? tags : undefined,
  };
}

/** Fetches and returns all published Sanity articles, sorted by date descending. */
export async function getAllSanityArticles(): Promise<SanityArticleWithSlug[]> {
  if (!isSanityConfigured()) {
    return [];
  }

  const sanityArticles = await fetchSanityQuery<SanityArticleDocument[]>(
    SANITY_ARTICLES_QUERY
  );

  const mappedArticles = sanityArticles
    .map(toArticleWithSlug)
    .filter((article): article is SanityArticleWithSlug => article !== null);

  return mappedArticles.sort((a, z) => +new Date(z.date) - +new Date(a.date));
}

/** Returns `true` when required Sanity configuration exists. */
export function isSanityConfigured(): boolean {
  return hasSanityConfig();
}
