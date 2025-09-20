// ============================================================================
// COMMON ARTICLE COMPONENT LABELS
// ============================================================================

type ArticleComponentLabels = Readonly<Record<string, string>>;
export const ARTICLE_COMPONENT_LABELS = {
  cta: "Read article",
} as const satisfies ArticleComponentLabels;
