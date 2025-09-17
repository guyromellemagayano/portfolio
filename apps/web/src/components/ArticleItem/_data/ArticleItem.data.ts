type ArticleItemComponentLabels = Readonly<Record<string, string>>;

export const ARTICLE_ITEM_COMPONENT_LABELS = {
  cta: "Read article",
} as const satisfies ArticleItemComponentLabels;
