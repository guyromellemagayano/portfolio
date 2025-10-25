// ============================================================================
// LAYOUT COMPONENT INTERNATIONALIZATION
// ============================================================================

export type LayoutI18n = Readonly<Record<string, string>>;
export const LAYOUT_I18N = {
  // Content labels
  articleContent: "Article content",
  articleLayout: "Article layout",
  articleHeader: "Article header",
  articleDate: "Published on",
  articlePublished: "Publication date",
} as const satisfies LayoutI18n;
