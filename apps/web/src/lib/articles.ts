import React from "react";

import glob from "fast-glob";

export interface Article {
  title: string;
  date: string;
  description: string;
  image: string;
  tags: string[];
}

export interface ArticleWithSlug extends Article {
  slug: string;
}

type ArticleModule = {
  default: React.ComponentType<any>;
  article: Partial<Article> | null;
};

type ArticleModuleLoader = (filename: string) => Promise<ArticleModule>;

declare global {
  interface ImportMeta {
    glob<T>(pattern: string): Record<string, () => Promise<T>>;
  }
}

const articleModules = import.meta.glob<ArticleModule>(
  "../app/articles/**/*.mdx"
);

const defaultArticleModuleLoader: ArticleModuleLoader = async (filename) => {
  const modulePath = `../app/articles/${filename}`;
  const importer = articleModules[modulePath];

  if (!importer) {
    throw new Error(`Cannot find article module: ${modulePath}`);
  }

  return importer();
};

let articleModuleLoader: ArticleModuleLoader = defaultArticleModuleLoader;

export const __setArticleModuleLoaderForTests = (
  loader?: ArticleModuleLoader
): void => {
  articleModuleLoader = loader ?? defaultArticleModuleLoader;
};

/**
 * Import an article from the articles directory
 */
export const importArticle = async (
  filename: string
): Promise<ArticleWithSlug> => {
  const { article } = await articleModuleLoader(filename);

  return {
    slug: filename.replace(/(\/page)?\.mdx$/, ""),
    ...(article ?? {}),
  } as ArticleWithSlug;
};

const MDXPageFile = "page.mdx";
const MDXPageFilePattern = `*/${MDXPageFile}`;
const ArticlesPath = "./src/app/articles";

/**
 * Get all articles sorted by date
 */
export const getAllArticles = async () => {
  let articleFilenames = await glob(MDXPageFilePattern, {
    cwd: ArticlesPath,
  });

  let articles = await Promise.all(articleFilenames.map(importArticle));
  return articles.sort((a, b) => +new Date(b.date) - +new Date(a.date));
};
