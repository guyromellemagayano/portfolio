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

export type ArticleSourceMode = "mdx" | "sanity" | "hybrid";

const MDX_ARTICLES_DIRECTORY = path.join("src", "app", "(blog)", "articles");
const SANITY_ARTICLES_SOURCE_ENV_KEY = "SANITY_ARTICLES_SOURCE";

function sortArticlesByDateDesc(
  articles: ArticleWithSlug[]
): ArticleWithSlug[] {
  return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date));
}

function isSanityEnabledFlagSet(): boolean {
  const flag = globalThis?.process?.env?.SANITY_ENABLED?.trim().toLowerCase();
  return flag === "1" || flag === "true" || flag === "yes";
}

/** Resolves which article source mode to use for the web app. */
export function resolveArticleSourceMode(): ArticleSourceMode {
  const sourceMode =
    globalThis?.process?.env?.[
      SANITY_ARTICLES_SOURCE_ENV_KEY
    ]?.trim().toLowerCase();

  if (
    sourceMode === "mdx" ||
    sourceMode === "sanity" ||
    sourceMode === "hybrid"
  ) {
    return sourceMode;
  }

  return isSanityEnabledFlagSet() ? "sanity" : "mdx";
}

/** Merges two article lists and prefers entries from the first list when slugs collide. */
export function mergeArticlesBySlug(
  preferredArticles: ArticleWithSlug[],
  fallbackArticles: ArticleWithSlug[]
): ArticleWithSlug[] {
  const articleBySlug = new Map<string, ArticleWithSlug>();

  for (const article of fallbackArticles) {
    articleBySlug.set(article.slug, article);
  }

  for (const article of preferredArticles) {
    articleBySlug.set(article.slug, article);
  }

  return sortArticlesByDateDesc([...articleBySlug.values()]);
}

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

  return sortArticlesByDateDesc(articles);
}

/** Get all articles based on configured source mode, with resilient fallback behavior. */
export async function getAllArticles(): Promise<ArticleWithSlug[]> {
  const sourceMode = resolveArticleSourceMode();

  if (sourceMode === "mdx") {
    return getAllMdxArticles();
  }

  const mdxArticles = await getAllMdxArticles();

  if (!isSanityConfigured()) {
    return mdxArticles;
  }

  try {
    const sanityArticles = await getAllSanityArticles();

    if (sourceMode === "hybrid") {
      return mergeArticlesBySlug(sanityArticles, mdxArticles);
    }

    if (sanityArticles.length > 0) {
      return sanityArticles;
    }
  } catch {
    // Fall through to MDX when Sanity is temporarily unavailable.
  }

  return mdxArticles;
}
