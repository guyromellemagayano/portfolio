export interface Article {
  title: string;
  date: string;
  description: string;
  image: string;
  tags: string[];
}
export interface ArticleWithSlug extends Article {
  slug: string;
}
