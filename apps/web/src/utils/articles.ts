/**
 * @file apps/web/src/utils/articles.ts
 * @author Guy Romelle Magayano
 * @description Utilities for Sanity-backed article normalization in the web app.
 */

import type {
  ContentArticle,
  ContentArticleDetailResponseData,
  ContentPortableTextBlock,
  ContentPortableTextImageBlock,
} from "@portfolio/api-contracts/content";

import {
  getAllGatewayArticles,
  getGatewayArticleBySlug,
} from "@web/gateway/content";

export type Article = {
  title: string;
  date: string;
  description: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  tags?: string[];
};

export type ArticleWithSlug = Article & {
  slug: string;
};

export type ArticleDetail = ArticleWithSlug & {
  seoDescription?: string;
  imageAlt?: string;
  body: Array<ContentPortableTextBlock | ContentPortableTextImageBlock>;
};

function sortArticlesByDateDesc(
  articles: ArticleWithSlug[]
): ArticleWithSlug[] {
  return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date));
}

/** Normalizes an optional positive image dimension for safe image rendering. */
function getOptionalPositiveImageDimension(value: unknown): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return undefined;
  }

  return Math.round(value);
}

/** Maps a gateway article summary payload into the web article list shape. */
function mapGatewayArticleToArticleWithSlug(
  gatewayArticle: ContentArticle
): ArticleWithSlug | null {
  const title = gatewayArticle.title?.trim();
  const slug = gatewayArticle.slug?.trim();
  const date = gatewayArticle.publishedAt?.trim();

  if (!title || !slug || !date) {
    return null;
  }

  const description = gatewayArticle.excerpt?.trim() ?? "";
  const image = gatewayArticle.imageUrl?.trim() || undefined;
  const imageWidth = getOptionalPositiveImageDimension(
    gatewayArticle.imageWidth
  );
  const imageHeight = getOptionalPositiveImageDimension(
    gatewayArticle.imageHeight
  );
  const tags = gatewayArticle.tags
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  return {
    title,
    slug,
    date,
    description,
    image,
    imageWidth,
    imageHeight,
    tags: tags.length > 0 ? tags : undefined,
  };
}

/** Maps a gateway article detail payload into the web article detail shape. */
function mapGatewayArticleDetailToArticleDetail(
  gatewayArticle: ContentArticleDetailResponseData
): ArticleDetail | null {
  const article = mapGatewayArticleToArticleWithSlug(gatewayArticle);

  if (!article) {
    return null;
  }

  return {
    ...article,
    seoDescription: gatewayArticle.seoDescription?.trim() || undefined,
    imageAlt: gatewayArticle.imageAlt?.trim() || undefined,
    body: Array.isArray(gatewayArticle.body) ? gatewayArticle.body : [],
  };
}

/**
 * Gets all articles from the API gateway and normalizes them for web components.
 *
 * @returns Sorted article list for list/card rendering.
 */
export async function getAllArticles(): Promise<ArticleWithSlug[]> {
  const gatewayArticles = (await getAllGatewayArticles())
    .map(mapGatewayArticleToArticleWithSlug)
    .filter((article): article is ArticleWithSlug => article !== null);

  return sortArticlesByDateDesc(gatewayArticles);
}

/**
 * Gets a single article detail payload from the API gateway by slug.
 *
 * @param slug Article slug from the route segment.
 * @returns Normalized article detail payload or `null` when not found.
 */
export async function getArticleBySlug(
  slug: string
): Promise<ArticleDetail | null> {
  const gatewayArticle = await getGatewayArticleBySlug(slug);

  if (!gatewayArticle) {
    return null;
  }

  return mapGatewayArticleDetailToArticleDetail(gatewayArticle);
}
