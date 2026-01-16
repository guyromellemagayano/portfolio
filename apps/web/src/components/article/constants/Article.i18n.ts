/**
 * @file Article.i18n.ts
 * @author Guy Romelle Magayano
 * @description Internationalization constants for the Article component.
 */

export type ArticleI18n = Readonly<Record<string, string>>;
export const ARTICLE_I18N = {
  cta: "Read article",
  articleDate: "Published on",
} as const satisfies ArticleI18n;
