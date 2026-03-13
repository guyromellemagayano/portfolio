/**
 * @file packages/content-data/src/snapshot.ts
 * @author Guy Romelle Magayano
 * @description Validated, deterministic local content snapshot exports for runtime providers.
 */

import type {
  ContentArticle,
  ContentPage,
} from "@portfolio/api-contracts/content";

import { articlesSnapshot } from "./articles";
import { pagesSnapshot } from "./pages";
import { validateArticleSnapshot, validatePageSnapshot } from "./validation";

validateArticleSnapshot(articlesSnapshot);
validatePageSnapshot(pagesSnapshot);

function cloneArticleSummaryFields(
  article: (typeof articlesSnapshot)[number]
): ContentArticle {
  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    publishedAt: article.publishedAt,
    excerpt: article.excerpt,
    hideFromSitemap: article.hideFromSitemap,
    seoNoIndex: article.seoNoIndex,
    imageUrl: article.imageUrl,
    imageWidth: article.imageWidth,
    imageHeight: article.imageHeight,
    tags: [...article.tags],
  };
}

function clonePageSummaryFields(
  page: (typeof pagesSnapshot)[number]
): ContentPage {
  return {
    id: page.id,
    slug: page.slug,
    title: page.title,
    subheading: page.subheading,
    intro: page.intro,
    updatedAt: page.updatedAt,
    hideFromSitemap: page.hideFromSitemap,
    seoNoIndex: page.seoNoIndex,
  };
}

const sortedArticleDetails = [...articlesSnapshot].sort((a, z) =>
  z.publishedAt.localeCompare(a.publishedAt)
);

const sortedPageDetails = [...pagesSnapshot].sort((a, z) =>
  a.slug.localeCompare(z.slug)
);

export const contentSnapshot = {
  articleDetails: sortedArticleDetails,
  pageDetails: sortedPageDetails,
  articleSummaries: sortedArticleDetails.map(cloneArticleSummaryFields),
  pageSummaries: sortedPageDetails.map(clonePageSummaryFields),
  articleBySlug: new Map(
    sortedArticleDetails.map((article) => [article.slug, article])
  ),
  pageBySlug: new Map(sortedPageDetails.map((page) => [page.slug, page])),
} as const;
