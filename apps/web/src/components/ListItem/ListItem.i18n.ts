// ============================================================================
// LIST ITEM COMPONENT INTERNATIONALIZATION
// ============================================================================

type ListItemI18n = Readonly<Record<string, string>>;
export const LIST_ITEM_I18N = {
  // Action labels
  cta: "Read article",

  // Content labels
  articleDate: "Published on",
} as const satisfies ListItemI18n;
