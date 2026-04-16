/**
 * @file apps/web/src/sanity/__tests__/articles.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for article source mode resolution and hybrid merge behavior.
 */

import { beforeEach, describe, expect, it, vi } from "vitest";

import { getAllSanityArticles, toArticleWithSlug } from "@web/sanity/articles";
import { fetchSanityQuery, hasSanityConfig } from "@web/sanity/client";

vi.mock("@web/sanity/client", () => ({
  fetchSanityQuery: vi.fn(),
  hasSanityConfig: vi.fn(),
}));

describe("sanity articles", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
  });

  it("maps a valid Sanity article document", () => {
    const mapped = toArticleWithSlug({
      _id: "article-1",
      title: "  A Title  ",
      slug: " my-slug ",
      date: "2026-02-21",
      description: "  A description  ",
      image: "https://example.com/cover.jpg",
      tags: ["engineering", { title: "architecture" }, null],
    });

    expect(mapped).toEqual({
      title: "A Title",
      slug: "my-slug",
      date: "2026-02-21",
      description: "A description",
      image: "https://example.com/cover.jpg",
      tags: ["engineering", "architecture"],
    });
  });

  it("returns null when required fields are missing", () => {
    const mapped = toArticleWithSlug({
      _id: "article-2",
      title: "Missing slug",
      slug: "",
      date: "2026-02-21",
      description: "No slug should be rejected",
    });

    expect(mapped).toBeNull();
  });

  it("returns empty array when Sanity config is not set", async () => {
    const mockHasSanityConfig = vi.mocked(hasSanityConfig);
    const mockFetchSanityQuery = vi.mocked(fetchSanityQuery);

    mockHasSanityConfig.mockReturnValue(false);

    const articles = await getAllSanityArticles();

    expect(articles).toEqual([]);
    expect(mockFetchSanityQuery).not.toHaveBeenCalled();
  });

  it("fetches and normalizes Sanity articles when config exists", async () => {
    const mockHasSanityConfig = vi.mocked(hasSanityConfig);
    const mockFetchSanityQuery = vi.mocked(fetchSanityQuery);

    mockHasSanityConfig.mockReturnValue(true);
    mockFetchSanityQuery.mockResolvedValue([
      {
        _id: "article-b",
        title: "Second",
        slug: "second",
        date: "2024-01-01",
        description: "Second description",
      },
      {
        _id: "article-a",
        title: "First",
        slug: "first",
        date: "2025-01-01",
        description: "First description",
      },
      {
        _id: "article-invalid",
        title: "Invalid",
        slug: "",
        date: "2026-01-01",
        description: "Should be filtered",
      },
    ]);

    const articles = await getAllSanityArticles();

    expect(articles).toEqual([
      {
        title: "First",
        slug: "first",
        date: "2025-01-01",
        description: "First description",
        image: undefined,
        tags: undefined,
      },
      {
        title: "Second",
        slug: "second",
        date: "2024-01-01",
        description: "Second description",
        image: undefined,
        tags: undefined,
      },
    ]);
  });
});
