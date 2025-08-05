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

/**
 * Import an article from the articles directory
 */
export const importArticle = async (
  filename: string
): Promise<ArticleWithSlug> => {
  let { article } = (await import(`../app/articles/${filename}`)) as {
    default: React.ComponentType<any>;
    article: Article;
  };

  return {
    slug: filename.replace(/(\/page)?\.mdx$/, ""),
    ...article,
  };
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
