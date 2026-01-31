/**
 * @file articles.ts
 * @author Guy Romelle Magayano
 * @description Utility functions for articles.
 */

import { type ComponentType } from "react";

import glob from "fast-glob";

export type Article = {
  title: string;
  date: string;
  description: string;
  image?: string;
  tags?: string[];
};

export type ArticleWithSlug = Article & {
  slug: string;
};

/** Import an article from the articles directory and return it with a slug */
async function importArticle(
  articleFilename: string
): Promise<ArticleWithSlug> {
  let { article } = (await import(
    `@web/app/(blog)/articles/${articleFilename}`
  )) as {
    default: ComponentType;
    article: Article;
  };

  return {
    slug: articleFilename.replace(/(\/page)?\.mdx$/, ""),
    ...article,
  };
}

/** Get all articles from the articles directory */
export async function getAllArticles() {
  let articleFilenames = await glob("*/page.mdx", {
    cwd: "./src/app/(blog)/articles",
  });

  let articles = await Promise.all(articleFilenames.map(importArticle));

  return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date));
}
