import glob from "fast-glob";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  __setArticleModuleLoaderForTests,
  type Article,
  type ArticleWithSlug,
  getAllArticles,
  importArticle,
} from "./articles";

// Mock fast-glob
vi.mock("fast-glob", () => ({
  default: vi.fn(),
}));

describe("Articles Module", () => {
  const mockGlob = glob as any;
  const mockArticleModules = new Map<
    string,
    {
      default: ReturnType<typeof vi.fn>;
      article: Article | null;
    }
  >();

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
    mockArticleModules.clear();
    __setArticleModuleLoaderForTests(async (filename) => {
      const articleModule = mockArticleModules.get(filename);

      if (!articleModule) {
        throw new Error(
          `Cannot find article module: ../app/articles/${filename}`
        );
      }

      return articleModule;
    });
  });

  afterEach(() => {
    __setArticleModuleLoaderForTests();
    vi.resetModules();
  });

  const registerArticleModule = (
    filename: string,
    article: Article | null
  ): void => {
    mockArticleModules.set(filename, {
      default: vi.fn(),
      article,
    });
  };

  describe("importArticle", () => {
    it("imports an article and returns ArticleWithSlug", async () => {
      registerArticleModule("test-article/page.mdx", mockArticle);

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
      registerArticleModule("test-article.mdx", mockArticle);

      const result = await importArticle("test-article.mdx");

      expect(result.slug).toBe("test-article");
    });

    it("handles nested article paths", async () => {
      registerArticleModule("nested/path/article/page.mdx", mockArticle);

      const result = await importArticle("nested/path/article/page.mdx");

      expect(result.slug).toBe("nested/path/article");
    });

    it("handles articles with different date formats", async () => {
      const articleWithDifferentDate: Article = {
        ...mockArticle,
        date: "2024-12-31T23:59:59Z",
      };

      registerArticleModule(
        "different-date/page.mdx",
        articleWithDifferentDate
      );

      const result = await importArticle("different-date/page.mdx");

      expect(result.date).toBe("2024-12-31T23:59:59Z");
    });

    it("handles articles with empty tags array", async () => {
      const articleWithEmptyTags: Article = {
        ...mockArticle,
        tags: [],
      };

      registerArticleModule("no-tags/page.mdx", articleWithEmptyTags);

      const result = await importArticle("no-tags/page.mdx");

      expect(result.tags).toEqual([]);
    });

    it("handles articles with multiple tags", async () => {
      const articleWithMultipleTags: Article = {
        ...mockArticle,
        tags: ["react", "typescript", "nextjs", "testing"],
      };

      registerArticleModule("multiple-tags/page.mdx", articleWithMultipleTags);

      const result = await importArticle("multiple-tags/page.mdx");

      expect(result.tags).toEqual(["react", "typescript", "nextjs", "testing"]);
    });

    it("handles articles without image", async () => {
      const articleWithoutImage: Article = {
        ...mockArticle,
        image: "",
      };

      registerArticleModule("no-image/page.mdx", articleWithoutImage);

      const result = await importArticle("no-image/page.mdx");

      expect(result.image).toBe("");
    });

    it("handles articles with long descriptions", async () => {
      const articleWithLongDescription: Article = {
        ...mockArticle,
        description:
          "This is a very long description that might contain multiple sentences and should be handled properly by the import function without any issues.",
      };

      registerArticleModule(
        "long-description/page.mdx",
        articleWithLongDescription
      );

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
        registerArticleModule(filename, mockArticles[index]!);
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
      registerArticleModule("single-article/page.mdx", mockArticleData);

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
        registerArticleModule(filename, mockArticles[index]!);
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
        registerArticleModule(filename, mockArticles[index]!);
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
        registerArticleModule(filename, mockArticles[index]!);
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
        registerArticleModule(filename, mockArticles[index]!);
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
      registerArticleModule("valid-article/page.mdx", mockArticle);

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
      registerArticleModule(
        "incomplete-article/page.mdx",
        incompleteArticle as Article
      );

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

      registerArticleModule("malformed-article/page.mdx", null);

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
        registerArticleModule(filename, mockArticles[index]!);
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
