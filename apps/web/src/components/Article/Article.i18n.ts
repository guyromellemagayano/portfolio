// ============================================================================
// ARTICLE COMPONENT INTERNATIONALIZATION
// ============================================================================

export type ArticleI18n = Readonly<Record<string, string>>;
export const ARTICLE_I18N = {
  // Action labels
  cta: "Read article",

  // Content labels
  articleDate: "Published on",
} as const satisfies ArticleI18n;
