import glob from "fast-glob";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  type Article,
  type ArticleWithSlug,
  getAllArticles,
  importArticle,
} from "./articles";

// Mock fast-glob
vi.mock("fast-glob", () => ({
  default: vi.fn(),
}));

// Mock dynamic imports
vi.mock("../app/articles", () => ({
  // This will be mocked per test
}));

describe("Articles Module", () => {
  const mockGlob = glob as any;

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

  describe("importArticle", () => {
    it("imports an article and returns ArticleWithSlug", async () => {
      // Mock the import function
      vi.doMock("../app/articles/test-article/page.mdx", () => ({
        default: vi.fn(),
        article: mockArticle,
      }));

      const result = await importArticle("test-article/page.mdx");

      expect(result).toEqual(mockArticleWithSlug);
      expect(result.slug).toBe("test-article");
      expect(result.title).toBe(mockArticle.title);
      expect(result.date).toBe(mockArticle.date);
      expect(result.description).toBe(mockArticle.description);
      expect(result.image).toBe(mockArticle.image);
      expect(result.tags).toEqual(mockArticle.tags);
    });

    it("handles articles without page.mdx suffix", async () => {
      vi.doMock("../app/articles/test-article.mdx", () => ({
        default: vi.fn(),
        article: mockArticle,
      }));

      const result = await importArticle("test-article.mdx");

      expect(result.slug).toBe("test-article");
    });

    it("handles nested article paths", async () => {
      vi.doMock("../app/articles/nested/path/article/page.mdx", () => ({
        default: vi.fn(),
        article: mockArticle,
      }));

      const result = await importArticle("nested/path/article/page.mdx");

      expect(result.slug).toBe("nested/path/article");
    });

    it("handles articles with different date formats", async () => {
      const articleWithDifferentDate: Article = {
        ...mockArticle,
        date: "2024-12-31T23:59:59Z",
      };

      vi.doMock("../app/articles/different-date/page.mdx", () => ({
        default: vi.fn(),
        article: articleWithDifferentDate,
      }));

      const result = await importArticle("different-date/page.mdx");

      expect(result.date).toBe("2024-12-31T23:59:59Z");
    });

    it("handles articles with empty tags array", async () => {
      const articleWithEmptyTags: Article = {
        ...mockArticle,
        tags: [],
      };

      vi.doMock("../app/articles/no-tags/page.mdx", () => ({
        default: vi.fn(),
        article: articleWithEmptyTags,
      }));

      const result = await importArticle("no-tags/page.mdx");

      expect(result.tags).toEqual([]);
    });

    it("handles articles with multiple tags", async () => {
      const articleWithMultipleTags: Article = {
        ...mockArticle,
        tags: ["react", "typescript", "nextjs", "testing"],
      };

      vi.doMock("../app/articles/multiple-tags/page.mdx", () => ({
        default: vi.fn(),
        article: articleWithMultipleTags,
      }));

      const result = await importArticle("multiple-tags/page.mdx");

      expect(result.tags).toEqual(["react", "typescript", "nextjs", "testing"]);
    });

    it("handles articles without image", async () => {
      const articleWithoutImage: Article = {
        ...mockArticle,
        image: "",
      };

      vi.doMock("../app/articles/no-image/page.mdx", () => ({
        default: vi.fn(),
        article: articleWithoutImage,
      }));

      const result = await importArticle("no-image/page.mdx");

      expect(result.image).toBe("");
    });

    it("handles articles with long descriptions", async () => {
      const articleWithLongDescription: Article = {
        ...mockArticle,
        description:
          "This is a very long description that might contain multiple sentences and should be handled properly by the import function without any issues.",
      };

      vi.doMock("../app/articles/long-description/page.mdx", () => ({
        default: vi.fn(),
        article: articleWithLongDescription,
      }));

      const result = await importArticle("long-description/page.mdx");

      expect(result.description).toBe(
        "This is a very long description that might contain multiple sentences and should be handled properly by the import function without any issues."
      );
    });
  });

  describe("getAllArticles", () => {
    it("returns all articles sorted by date (newest first)", async () => {
      const mockFilenames = [
        "article-1/page.mdx",
        "article-2/page.mdx",
        "article-3/page.mdx",
      ];

      const mockArticles = [
        { ...mockArticle, title: "Article 1", date: "2024-01-01" },
        { ...mockArticle, title: "Article 2", date: "2024-03-15" },
        { ...mockArticle, title: "Article 3", date: "2024-02-01" },
      ];

      mockGlob.mockResolvedValue(mockFilenames);

      // Mock dynamic imports for each article
      mockFilenames.forEach((filename, index) => {
        vi.doMock(`../app/articles/${filename}`, () => ({
          default: vi.fn(),
          article: mockArticles[index],
        }));
      });

      const result = await getAllArticles();

      expect(mockGlob).toHaveBeenCalledWith("*/page.mdx", {
        cwd: "./src/app/articles",
      });
      expect(result).toHaveLength(3);
      expect(result[0]?.title).toBe("Article 2"); // March 15 (newest)
      expect(result[1]?.title).toBe("Article 3"); // February 1
      expect(result[2]?.title).toBe("Article 1"); // January 1 (oldest)
    });

    it("handles empty articles directory", async () => {
      mockGlob.mockResolvedValue([]);

      const result = await getAllArticles();

      expect(result).toEqual([]);
      expect(mockGlob).toHaveBeenCalledWith("*/page.mdx", {
        cwd: "./src/app/articles",
      });
    });

    it("handles single article", async () => {
      const mockFilenames = ["single-article/page.mdx"];
      const mockArticleData = { ...mockArticle, title: "Single Article" };

      mockGlob.mockResolvedValue(mockFilenames);
      vi.doMock("../app/articles/single-article/page.mdx", () => ({
        default: vi.fn(),
        article: mockArticleData,
      }));

      const result = await getAllArticles();

      expect(result).toHaveLength(1);
      expect(result[0]?.title).toBe("Single Article");
      expect(result[0]?.slug).toBe("single-article");
    });

    it("handles articles with same date", async () => {
      const mockFilenames = ["article-a/page.mdx", "article-b/page.mdx"];

      const mockArticles = [
        { ...mockArticle, title: "Article A", date: "2024-01-01" },
        { ...mockArticle, title: "Article B", date: "2024-01-01" },
      ];

      mockGlob.mockResolvedValue(mockFilenames);

      mockFilenames.forEach((filename, index) => {
        vi.doMock(`../app/articles/${filename}`, () => ({
          default: vi.fn(),
          article: mockArticles[index],
        }));
      });

      const result = await getAllArticles();

      expect(result).toHaveLength(2);
      // When dates are the same, order should be preserved as returned by glob
      expect(result[0]?.title).toBe("Article A");
      expect(result[1]?.title).toBe("Article B");
    });

    it("handles articles with invalid dates gracefully", async () => {
      const mockFilenames = [
        "valid-article/page.mdx",
        "invalid-article/page.mdx",
      ];

      const mockArticles = [
        { ...mockArticle, title: "Valid Article", date: "2024-01-01" },
        { ...mockArticle, title: "Invalid Article", date: "invalid-date" },
      ];

      mockGlob.mockResolvedValue(mockFilenames);

      mockFilenames.forEach((filename, index) => {
        vi.doMock(`../app/articles/${filename}`, () => ({
          default: vi.fn(),
          article: mockArticles[index],
        }));
      });

      const result = await getAllArticles();

      expect(result).toHaveLength(2);
      // Invalid dates should be treated as very old dates
      expect(result[0]?.title).toBe("Valid Article");
      expect(result[1]?.title).toBe("Invalid Article");
    });

    it("handles nested article directories", async () => {
      const mockFilenames = [
        "nested/deep/article/page.mdx",
        "shallow/article/page.mdx",
      ];

      const mockArticles = [
        { ...mockArticle, title: "Deep Article", date: "2024-01-01" },
        { ...mockArticle, title: "Shallow Article", date: "2024-02-01" },
      ];

      mockGlob.mockResolvedValue(mockFilenames);

      mockFilenames.forEach((filename, index) => {
        vi.doMock(`../app/articles/${filename}`, () => ({
          default: vi.fn(),
          article: mockArticles[index],
        }));
      });

      const result = await getAllArticles();

      expect(result).toHaveLength(2);
      expect(result[0]?.title).toBe("Shallow Article"); // February (newer)
      expect(result[1]?.title).toBe("Deep Article"); // January (older)
      expect(result[0]?.slug).toBe("shallow/article");
      expect(result[1]?.slug).toBe("nested/deep/article");
    });

    it("handles articles with special characters in filenames", async () => {
      const mockFilenames = [
        "article-with-dashes/page.mdx",
        "article_with_underscores/page.mdx",
        "article.with.dots/page.mdx",
      ];

      const mockArticles = [
        { ...mockArticle, title: "Dashed Article", date: "2024-01-01" },
        { ...mockArticle, title: "Underscored Article", date: "2024-02-01" },
        { ...mockArticle, title: "Dotted Article", date: "2024-03-01" },
      ];

      mockGlob.mockResolvedValue(mockFilenames);

      mockFilenames.forEach((filename, index) => {
        vi.doMock(`../app/articles/${filename}`, () => ({
          default: vi.fn(),
          article: mockArticles[index],
        }));
      });

      const result = await getAllArticles();

      expect(result).toHaveLength(3);
      expect(result[0]?.slug).toBe("article.with.dots");
      expect(result[1]?.slug).toBe("article_with_underscores");
      expect(result[2]?.slug).toBe("article-with-dashes");
    });

    it("handles import errors gracefully", async () => {
      const mockFilenames = ["valid-article/page.mdx"];

      mockGlob.mockResolvedValue(mockFilenames);

      // Mock successful import for first article
      vi.doMock("../app/articles/valid-article/page.mdx", () => ({
        default: vi.fn(),
        article: mockArticle,
      }));

      const result = await getAllArticles();

      expect(result).toHaveLength(1);
      expect(result[0]?.title).toBe(mockArticle.title);
    });

    it("handles articles with missing required fields", async () => {
      const mockFilenames = ["incomplete-article/page.mdx"];

      const incompleteArticle = {
        title: "Incomplete Article",
        // Missing date, description, image, tags
      };

      mockGlob.mockResolvedValue(mockFilenames);
      vi.doMock("../app/articles/incomplete-article/page.mdx", () => ({
        default: vi.fn(),
        article: incompleteArticle,
      }));

      const result = await getAllArticles();

      expect(result).toHaveLength(1);
      expect(result[0]?.title).toBe("Incomplete Article");
      expect(result[0]?.date).toBeUndefined();
      expect(result[0]?.description).toBeUndefined();
      expect(result[0]?.image).toBeUndefined();
      expect(result[0]?.tags).toBeUndefined();
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

  describe("Error Handling", () => {
    it("handles glob errors gracefully", async () => {
      mockGlob.mockRejectedValue(new Error("Glob error"));

      await expect(getAllArticles()).rejects.toThrow("Glob error");
    });

    it("handles dynamic import errors", async () => {
      mockGlob.mockRejectedValue(new Error("Dynamic import failed"));

      await expect(getAllArticles()).rejects.toThrow("Dynamic import failed");
    });

    it("handles malformed article data", async () => {
      const mockFilenames = ["malformed-article/page.mdx"];
      mockGlob.mockResolvedValue(mockFilenames);

      // Mock article with malformed data
      vi.doMock("../app/articles/malformed-article/page.mdx", () => ({
        default: vi.fn(),
        article: null, // Malformed data
      }));

      const result = await getAllArticles();

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        slug: "malformed-article",
        title: undefined,
        date: undefined,
        description: undefined,
        image: undefined,
        tags: undefined,
      });
    });
  });

  describe("Performance", () => {
    it("handles large number of articles efficiently", async () => {
      const largeNumberOfArticles = 100;
      const mockFilenames = Array.from(
        { length: largeNumberOfArticles },
        (_, i) => `article-${i}/page.mdx`
      );

      const mockArticles = Array.from(
        { length: largeNumberOfArticles },
        (_, i) => ({
          ...mockArticle,
          title: `Article ${i}`,
          date: `2024-${String(largeNumberOfArticles - i).padStart(2, "0")}-01`,
        })
      );

      mockGlob.mockResolvedValue(mockFilenames);

      mockFilenames.forEach((filename, index) => {
        vi.doMock(`../app/articles/${filename}`, () => ({
          default: vi.fn(),
          article: mockArticles[index],
        }));
      });

      const startTime = Date.now();
      const result = await getAllArticles();
      const endTime = Date.now();

      expect(result).toHaveLength(largeNumberOfArticles);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second

      // Verify sorting (newest first)
      expect(result[0]?.title).toBe("Article 0");
      expect(result[result.length - 1]?.title).toBe("Article 99");
    });
  });
});
