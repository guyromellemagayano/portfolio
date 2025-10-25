// ============================================================================
// CARD COMPONENT INTERNATIONALIZATION
// ============================================================================

export type CardI18n = Readonly<Record<string, string>>;
export const CARD_I18N = {
  // Action labels
  cta: "Read more",
  learnMore: "Learn more",

  // Content labels
  title: "Card title",
  description: "Card description",

  // Navigation labels
  goToArticle: "Go to article",
  viewDetails: "View details",

  // Error messages
  invalidData: "Invalid card data provided",
  missingContent: "Card content is missing",

  // Accessibility labels
  ariaLabel: "Card",
  ariaDescription: "Card content",
  linkAriaLabel: "Card link",
} as const satisfies CardI18n;
