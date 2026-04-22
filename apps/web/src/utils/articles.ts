/**
 * @file apps/web/src/utils/articles.ts
 * @author Guy Romelle Magayano
 * @description Utilities for local article normalization in the web app.
 */

import type {
  ContentArticle,
  ContentArticleDetailResponseData,
  ContentPortableTextBlock,
  ContentPortableTextImageBlock,
  ContentTwitterCard,
} from "@portfolio/api-contracts/content";

import {
  getLocalArticleBySlug,
  getLocalArticleSummaries,
} from "@web/data/portfolio-content";

export type Article = {
  title: string;
  date: string;
  description: string;
  hideFromSitemap?: boolean;
  seoNoIndex?: boolean;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  tags?: string[];
};

export type ArticleWithSlug = Article & {
  slug: string;
};

export type ArticleDetail = ArticleWithSlug & {
  seoTitle?: string;
  seoDescription?: string;
  seoCanonicalPath?: string;
  seoNoIndex?: boolean;
  seoNoFollow?: boolean;
  seoOgTitle?: string;
  seoOgDescription?: string;
  seoOgImage?: string;
  seoOgImageWidth?: number;
  seoOgImageHeight?: number;
  seoOgImageAlt?: string;
  seoTwitterCard?: ContentTwitterCard;
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

/** Maps a local article summary payload into the web article list shape. */
function mapContentArticleToArticleWithSlug(
  articleRecord: ContentArticle
): ArticleWithSlug | null {
  const title = articleRecord.title?.trim();
  const slug = articleRecord.slug?.trim();
  const date = articleRecord.publishedAt?.trim();

  if (!title || !slug || !date) {
    return null;
  }

  const description = articleRecord.excerpt?.trim() ?? "";
  const image = articleRecord.imageUrl?.trim() || undefined;
  const imageWidth = getOptionalPositiveImageDimension(
    articleRecord.imageWidth
  );
  const imageHeight = getOptionalPositiveImageDimension(
    articleRecord.imageHeight
  );
  const tags = articleRecord.tags
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  return {
    title,
    slug,
    date,
    description,
    hideFromSitemap:
      typeof articleRecord.hideFromSitemap === "boolean"
        ? articleRecord.hideFromSitemap
        : undefined,
    seoNoIndex:
      typeof articleRecord.seoNoIndex === "boolean"
        ? articleRecord.seoNoIndex
        : undefined,
    image,
    imageWidth,
    imageHeight,
    tags: tags.length > 0 ? tags : undefined,
  };
}

/** Maps a local article detail payload into the web article detail shape. */
function mapContentArticleDetailToArticleDetail(
  articleRecord: ContentArticleDetailResponseData
): ArticleDetail | null {
  const article = mapContentArticleToArticleWithSlug(articleRecord);

  if (!article) {
    return null;
  }

  return {
    ...article,
    seoTitle: articleRecord.seoTitle?.trim() || undefined,
    seoDescription: articleRecord.seoDescription?.trim() || undefined,
    seoCanonicalPath: articleRecord.seoCanonicalPath?.trim() || undefined,
    seoNoIndex:
      typeof articleRecord.seoNoIndex === "boolean"
        ? articleRecord.seoNoIndex
        : undefined,
    seoNoFollow:
      typeof articleRecord.seoNoFollow === "boolean"
        ? articleRecord.seoNoFollow
        : undefined,
    seoOgTitle: articleRecord.seoOgTitle?.trim() || undefined,
    seoOgDescription: articleRecord.seoOgDescription?.trim() || undefined,
    seoOgImage: articleRecord.seoOgImageUrl?.trim() || undefined,
    seoOgImageWidth: getOptionalPositiveImageDimension(
      articleRecord.seoOgImageWidth
    ),
    seoOgImageHeight: getOptionalPositiveImageDimension(
      articleRecord.seoOgImageHeight
    ),
    seoOgImageAlt: articleRecord.seoOgImageAlt?.trim() || undefined,
    seoTwitterCard: articleRecord.seoTwitterCard,
    imageAlt: articleRecord.imageAlt?.trim() || undefined,
    body: Array.isArray(articleRecord.body) ? articleRecord.body : [],
  };
}

/** Gets all local articles and normalizes them for web components. */
export async function getAllArticles(): Promise<ArticleWithSlug[]> {
  const localArticles = getLocalArticleSummaries()
    .map(mapContentArticleToArticleWithSlug)
    .filter((article): article is ArticleWithSlug => article !== null);

  return sortArticlesByDateDesc(localArticles);
}

/** Gets a single local article detail payload by slug. */
export async function getArticleBySlug(
  slug: string
): Promise<ArticleDetail | null> {
  const article = getLocalArticleBySlug(slug);

  if (!article) {
    return null;
  }

  return mapContentArticleDetailToArticleDetail(article);
}
