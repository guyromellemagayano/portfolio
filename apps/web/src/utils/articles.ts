export type Article = {
  title: string;
  date: string;
  description: string;
  image?: string;
  tags?: string[];
};

export type ArticleWithSlug = Article & {
  slug: string;
};
