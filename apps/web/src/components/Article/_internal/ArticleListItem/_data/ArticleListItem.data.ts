// ============================================================================
// ARTICLE LIST ITEM COMPONENT LABELS
// ============================================================================

type ArticleListItemComponentLabels = Readonly<Record<string, string>>;
export const ARTICLE_LIST_ITEM_COMPONENT_LABELS = {
  cta: "Read article",
} as const satisfies ArticleListItemComponentLabels;
