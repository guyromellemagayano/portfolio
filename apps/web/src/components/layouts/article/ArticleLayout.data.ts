type ArticleLayoutComponentLabels = Readonly<Record<string, string>>;

export const ARTICLE_LAYOUT_COMPONENT_LABELS = {
  goBackToArticles: "Go back to articles",
} as const satisfies ArticleLayoutComponentLabels;
