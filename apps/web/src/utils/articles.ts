import { logError } from "@guyromellemagayano/logger";

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

// Sample articles data - in a real app, this would come from a CMS or database
const sampleArticles: ArticleWithSlug[] = [
  {
    slug: "sample-article",
    title: "Sample Article",
    date: "2024-01-15",
    description: "This is a sample article for testing purposes",
    image: "/images/sample-article.jpg",
    tags: ["sample", "test", "article"],
  },
  {
    slug: "another-article",
    title: "Another Article",
    date: "2024-01-20",
    description: "This is another sample article for testing",
    image: "/images/another-article.jpg",
    tags: ["another", "test", "markdown"],
  },
];

// Internal store to enable deterministic testing by swapping data
let __articlesStore: ArticleWithSlug[] = sampleArticles;

/** Test-only hook to replace articles data at runtime. */
export function __setArticlesForTests(articles: ArticleWithSlug[]): void {
  __articlesStore = articles;
}

/** Get all articles sorted by date */
export async function getAllArticles(): Promise<ArticleWithSlug[]> {
  try {
    // For now, return current articles store
    // In a real app, this would fetch from a CMS or database
    return __articlesStore
      .slice()
      .sort((a, b) => +new Date(b.date) - +new Date(a.date));
  } catch (error) {
    logError("Failed to get articles:", error);
    return [];
  }
}

/** Get a single article by slug */
export async function getArticleBySlug(
  slug: string
): Promise<ArticleWithSlug | null> {
  try {
    const articles = await getAllArticles();
    return articles.find((article) => article.slug === slug) || null;
  } catch (error) {
    logError(`Failed to get article by slug: ${slug}`, error);
    return null;
  }
}

/** Get articles by tag */
export async function getArticlesByTag(
  tag: string
): Promise<ArticleWithSlug[]> {
  try {
    const articles = await getAllArticles();
    return articles.filter((article) => article.tags.includes(tag));
  } catch (error) {
    logError(`Failed to get articles by tag: ${tag}`, error);
    return [];
  }
}
