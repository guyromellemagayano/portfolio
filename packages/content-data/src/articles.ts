/**
 * @file packages/content-data/src/articles.ts
 * @author Guy Romelle Magayano
 * @description Local article snapshot data that matches API content contracts.
 */

import type { ContentArticleDetail } from "@portfolio/api-contracts/content";

import { createPortableTextParagraph, defineArticle } from "./authoring";

/** Typed local article records used by the content data snapshot. */
export type LocalArticleRecord = ContentArticleDetail;

/** Seed article snapshot; update this list directly when local content changes. */
export const articlesSnapshot: ReadonlyArray<LocalArticleRecord> = [
  defineArticle({
    id: "local-article-hello-world",
    title: "Hello world",
    slug: "hello-world",
    publishedAt: "2026-03-13T00:00:00.000Z",
    excerpt:
      "A local content snapshot article used to validate the content migration pipeline.",
    hideFromSitemap: false,
    seoNoIndex: false,
    tags: ["migration", "local-content"],
    body: [
      createPortableTextParagraph(
        "hello-world-paragraph-1",
        "This article is served from local typed content data instead of an external CMS."
      ),
    ],
  }),
];
