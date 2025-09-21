// ============================================================================
// COMMON ARTICLE COMPONENT LABELS
// ============================================================================

type ArticleComponentLabels = Readonly<Record<string, string>>;
export const ARTICLE_COMPONENT_LABELS = {
  cta: "Read article",
  goBackToArticles: "Go back to articles",
  articleContent: "Article content",
  articleLayout: "Article layout",
  articleHeader: "Article header",
  articleTitle: "Article title",
  articleDate: "Published on",
  articleList: "Article list",
  articles: "Articles",
} as const satisfies ArticleComponentLabels;
