// ============================================================================
// ARTICLE COMPONENT INTERNATIONALIZATION
// ============================================================================

export type ArticleI18n = Readonly<Record<string, string>>;
export const ARTICLE_I18N = {
  // Action labels
  cta: "Read article",
  goBackToArticles: "Go back to articles",

  // Content labels
  articleContent: "Article content",
  articleLayout: "Article layout",
  articleHeader: "Article header",
  articleTitle: "Article title",
  articleDate: "Published on",
  articlePublished: "Publication date",
  articleList: "Article list",
  articles: "Articles",

  // Error messages
  invalidArticleData: "Invalid article data",
} as const satisfies ArticleI18n;
