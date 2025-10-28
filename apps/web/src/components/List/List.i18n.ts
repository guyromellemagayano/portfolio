// ============================================================================
// LIST COMPONENT INTERNATIONALIZATION
// ============================================================================

export type ListI18n = Readonly<Record<string, string>>;
export const LIST_I18N = {
  // Heading labels
  articleList: "Article list",
  articles: "Articles",
} as const satisfies ListI18n;
