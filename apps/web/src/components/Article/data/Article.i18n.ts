// ============================================================================
// SHARED ARTICLE COMPONENT I18N LABELS
// ============================================================================

/** `ArticleComponentLabels` type. */
export type ArticleComponentLabels = Readonly<Record<string, string>>;

/** `ARTICLE_COMPONENT_LABELS` object. */
export const ARTICLE_COMPONENT_LABELS = {
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
} as const satisfies ArticleComponentLabels;
