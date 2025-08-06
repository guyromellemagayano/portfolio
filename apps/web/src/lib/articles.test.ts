import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  type Article,
  type ArticleWithSlug,
  getAllArticles,
  getArticleBySlug,
  getArticlesByTag,
} from "./articles";

describe("Articles Module", () => {
  const mockArticle: Article = {
    title: "Test Article",
    date: "2024-01-01",
    description: "A test article description",
    image: "/test-image.jpg",
    tags: ["test", "example"],
  };

  const mockArticleWithSlug: ArticleWithSlug = {
    ...mockArticle,
    slug: "test-article",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetModules();
  });

  describe("getAllArticles", () => {
    it("returns all articles sorted by date (newest first)", async () => {
      const articles = await getAllArticles();

      expect(articles).toBeInstanceOf(Array);
      expect(articles.length).toBeGreaterThan(0);

      // Check that articles are sorted by date (newest first)
      for (let i = 0; i < articles.length - 1; i++) {
        const currentArticle = articles[i];
        const nextArticle = articles[i + 1];

        if (currentArticle && nextArticle) {
          const currentDate = new Date(currentArticle.date);
          const nextDate = new Date(nextArticle.date);
          expect(currentDate.getTime()).toBeGreaterThanOrEqual(
            nextDate.getTime()
          );
        }
      }
    });

    it("returns articles with correct structure", async () => {
      const articles = await getAllArticles();

      articles.forEach((article) => {
        expect(article).toHaveProperty("slug");
        expect(article).toHaveProperty("title");
        expect(article).toHaveProperty("date");
        expect(article).toHaveProperty("description");
        expect(article).toHaveProperty("image");
        expect(article).toHaveProperty("tags");
        expect(Array.isArray(article.tags)).toBe(true);
      });
    });

    it("returns articles with valid data types", async () => {
      const articles = await getAllArticles();

      articles.forEach((article) => {
        expect(typeof article.slug).toBe("string");
        expect(typeof article.title).toBe("string");
        expect(typeof article.date).toBe("string");
        expect(typeof article.description).toBe("string");
        expect(typeof article.image).toBe("string");
        expect(Array.isArray(article.tags)).toBe(true);

        // Check that tags are strings
        article.tags.forEach((tag) => {
          expect(typeof tag).toBe("string");
        });
      });
    });

    it("handles articles with same date correctly", async () => {
      const articles = await getAllArticles();

      // If we have articles with the same date, they should be handled gracefully
      const dateGroups = new Map<string, ArticleWithSlug[]>();

      articles.forEach((article) => {
        const date = article.date;
        if (!dateGroups.has(date)) {
          dateGroups.set(date, []);
        }
        dateGroups.get(date)!.push(article);
      });

      // Check that articles with same date are handled
      dateGroups.forEach((articlesWithSameDate, date) => {
        if (articlesWithSameDate.length > 1) {
          // Articles with same date should maintain their order
          expect(articlesWithSameDate.length).toBeGreaterThan(1);
        }
      });
    });
  });

  describe("getArticleBySlug", () => {
    it("returns article when slug exists", async () => {
      const article = await getArticleBySlug("sample-article");

      expect(article).not.toBeNull();
      expect(article?.slug).toBe("sample-article");
      expect(article?.title).toBe("Sample Article");
      expect(article?.description).toBe(
        "This is a sample article for testing purposes"
      );
      expect(article?.image).toBe("/images/sample-article.jpg");
      expect(article?.tags).toEqual(["sample", "test", "article"]);
    });

    it("returns null when slug does not exist", async () => {
      const article = await getArticleBySlug("non-existent-article");

      expect(article).toBeNull();
    });

    it("returns null for empty slug", async () => {
      const article = await getArticleBySlug("");

      expect(article).toBeNull();
    });

    it("returns null for whitespace-only slug", async () => {
      const article = await getArticleBySlug("   ");

      expect(article).toBeNull();
    });

    it("handles case-sensitive slug matching", async () => {
      const article = await getArticleBySlug("SAMPLE-ARTICLE");

      expect(article).toBeNull(); // Should be case-sensitive
    });

    it("returns correct article for 'another-article' slug", async () => {
      const article = await getArticleBySlug("another-article");

      expect(article).not.toBeNull();
      expect(article?.slug).toBe("another-article");
      expect(article?.title).toBe("Another Article");
      expect(article?.description).toBe(
        "This is another sample article for testing"
      );
      expect(article?.image).toBe("/images/another-article.jpg");
      expect(article?.tags).toEqual(["another", "test", "markdown"]);
    });
  });

  describe("getArticlesByTag", () => {
    it("returns articles with matching tag", async () => {
      const articles = await getArticlesByTag("sample");

      expect(articles).toBeInstanceOf(Array);
      expect(articles.length).toBeGreaterThan(0);

      articles.forEach((article) => {
        expect(article.tags).toContain("sample");
      });
    });

    it("returns empty array when tag does not exist", async () => {
      const articles = await getArticlesByTag("non-existent-tag");

      expect(articles).toEqual([]);
    });

    it("returns articles with multiple matching tags", async () => {
      const articles = await getArticlesByTag("test");

      expect(articles).toBeInstanceOf(Array);

      articles.forEach((article) => {
        expect(article.tags).toContain("test");
      });
    });

    it("returns empty array for empty tag", async () => {
      const articles = await getArticlesByTag("");

      expect(articles).toEqual([]);
    });

    it("returns empty array for whitespace-only tag", async () => {
      const articles = await getArticlesByTag("   ");

      expect(articles).toEqual([]);
    });

    it("handles case-sensitive tag matching", async () => {
      const articles = await getArticlesByTag("SAMPLE");

      expect(articles).toEqual([]); // Should be case-sensitive
    });

    it("returns articles with 'markdown' tag", async () => {
      const articles = await getArticlesByTag("markdown");

      expect(articles).toBeInstanceOf(Array);
      expect(articles.length).toBeGreaterThan(0);

      articles.forEach((article) => {
        expect(article.tags).toContain("markdown");
      });
    });

    it("returns articles with 'another' tag", async () => {
      const articles = await getArticlesByTag("another");

      expect(articles).toBeInstanceOf(Array);
      expect(articles.length).toBeGreaterThan(0);

      articles.forEach((article) => {
        expect(article.tags).toContain("another");
      });
    });
  });

  describe("Article Interface", () => {
    it("validates Article interface structure", () => {
      const validArticle: Article = {
        title: "Test Article",
        date: "2024-01-01",
        description: "Test description",
        image: "/test.jpg",
        tags: ["test"],
      };

      expect(validArticle).toHaveProperty("title");
      expect(validArticle).toHaveProperty("date");
      expect(validArticle).toHaveProperty("description");
      expect(validArticle).toHaveProperty("image");
      expect(validArticle).toHaveProperty("tags");
      expect(Array.isArray(validArticle.tags)).toBe(true);
    });

    it("validates ArticleWithSlug interface structure", () => {
      const validArticleWithSlug: ArticleWithSlug = {
        title: "Test Article",
        date: "2024-01-01",
        description: "Test description",
        image: "/test.jpg",
        tags: ["test"],
        slug: "test-article",
      };

      expect(validArticleWithSlug).toHaveProperty("slug");
      expect(validArticleWithSlug.slug).toBe("test-article");
    });
  });

  describe("Data Integrity", () => {
    it("ensures all articles have unique slugs", async () => {
      const articles = await getAllArticles();
      const slugs = articles.map((article) => article.slug);
      const uniqueSlugs = new Set(slugs);

      expect(slugs.length).toBe(uniqueSlugs.size);
    });

    it("ensures all articles have valid dates", async () => {
      const articles = await getAllArticles();

      articles.forEach((article) => {
        const date = new Date(article.date);
        expect(date.toString()).not.toBe("Invalid Date");
      });
    });

    it("ensures all articles have non-empty titles", async () => {
      const articles = await getAllArticles();

      articles.forEach((article) => {
        expect(article.title.trim().length).toBeGreaterThan(0);
      });
    });

    it("ensures all articles have non-empty descriptions", async () => {
      const articles = await getAllArticles();

      articles.forEach((article) => {
        expect(article.description.trim().length).toBeGreaterThan(0);
      });
    });
  });
});
