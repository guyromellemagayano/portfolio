/* eslint-disable simple-import-sort/imports */

/**
 * @file utils/articles.ts
 * @author Guy Romelle Magayano
 * @description Utility functions for articles.
 */

import { existsSync } from "node:fs";
import path from "node:path";
import { type ComponentType } from "react";

import glob from "fast-glob";

import { getAllSanityArticles, isSanityConfigured } from "@web/sanity/articles";

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

const MDX_ARTICLES_DIRECTORY = path.join("src", "app", "(blog)", "articles");

function resolveMdxArticlesDirectory(): string | null {
  const candidateDirectories = [
    path.join(process.cwd(), MDX_ARTICLES_DIRECTORY),
    path.join(process.cwd(), "apps", "web", MDX_ARTICLES_DIRECTORY),
  ];

  return (
    candidateDirectories.find((directory) => existsSync(directory)) ?? null
  );
}

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
async function getAllMdxArticles(): Promise<ArticleWithSlug[]> {
  const mdxArticlesDirectory = resolveMdxArticlesDirectory();

  if (!mdxArticlesDirectory) {
    return [];
  }

  let articleFilenames = await glob("*/page.mdx", {
    cwd: mdxArticlesDirectory,
  });

  let articles = await Promise.all(articleFilenames.map(importArticle));

  return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date));
}

/** Get all articles, preferring Sanity when configured. */
export async function getAllArticles(): Promise<ArticleWithSlug[]> {
  if (!isSanityConfigured()) {
    return getAllMdxArticles();
  }

  try {
    const sanityArticles = await getAllSanityArticles();

    if (sanityArticles.length > 0) {
      return sanityArticles;
    }
  } catch {
    // Fall through to MDX when Sanity is temporarily unavailable.
  }

  return getAllMdxArticles();
}
