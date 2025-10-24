// ============================================================================
// BUTTON COMPONENT INTERNATIONALIZATION
// ============================================================================

export type ButtonI18n = Readonly<Record<string, string>>;
export const BUTTON_I18N = {
  // Action labels
  goBackToArticles: "Go back to articles",
} as const satisfies ButtonI18n;
