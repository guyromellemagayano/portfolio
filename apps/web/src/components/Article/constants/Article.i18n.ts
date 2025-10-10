// ============================================================================
// ARTICLE COMPONENT INTERNATIONALIZATION
// ============================================================================

/** `ArticleI18n` type. */
export type ArticleI18n = Readonly<Record<string, string>>;

/** `ARTICLE_I18N` object. */
export const ARTICLE_I18N = {
  cta: "Read article",
  goBackToArticles: "Go back to articles",
  invalidArticleData: "Invalid article data",
  articleItem: "Article item",
  articleLayout: "Article layout",
  articleContent: "Article content",
  articleHeader: "Article header",
  articleTitle: "Article title",
  articleDate: "Published on",
  articlePublished: "Publication date",
  articleList: "Article list",
  articles: "Articles",
  // Note: Error handling is managed by Next.js App Router
} as const satisfies ArticleI18n;
