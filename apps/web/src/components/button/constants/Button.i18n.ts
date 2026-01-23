/**
 * @file Button.i18n.ts
 * @author Guy Romelle Magayano
 * @description Internationalization constants for the Button component.
 */

export type ButtonI18n = Readonly<Record<string, string>>;
export const BUTTON_I18N = {
  goBackToArticles: "Go back to articles",
} as const satisfies ButtonI18n;