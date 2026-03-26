/**
 * @file apps/web/src/portfolio-api/content/__tests__/articles.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for portfolio API content article client behavior.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  getAllPortfolioArticles,
  getPortfolioArticleBySlug,
  resolvePortfolioApiBaseUrl,
} from "@web/portfolio-api/content/articles";

describe("portfolio API content articles client", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("uses explicit portfolio API URL when configured", () => {
    vi.stubEnv("PORTFOLIO_API_URL", "https://api.example.com/");

    expect(resolvePortfolioApiBaseUrl()).toBe("https://api.example.com");
  });

  it("falls back to local API URL in development when no explicit URL is set", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("API_PORT", "5001");

    expect(resolvePortfolioApiBaseUrl()).toBe("http://localhost:5001");
  });

  it("returns null in production when explicit API URL is missing", () => {
    vi.stubEnv("NODE_ENV", "production");

    expect(resolvePortfolioApiBaseUrl()).toBeNull();
  });

  it("returns null in production when the configured API URL points to a local-only host", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("PORTFOLIO_API_URL", "http://127.0.0.1:5001");

    expect(resolvePortfolioApiBaseUrl()).toBeNull();
  });

  it("returns null in production when the configured public API URL uses a .local host", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_API_URL", "https://api.guyromellemagayano.local");

    expect(resolvePortfolioApiBaseUrl()).toBeNull();
  });

  it("fetches and returns portfolio API article data", async () => {
    vi.stubEnv("PORTFOLIO_API_URL", "https://api.example.com");

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        success: true,
        data: [
          {
            id: "article-1",
            title: "Article 1",
            slug: "article-1",
            publishedAt: "2026-02-21",
            excerpt: "Summary",
            imageUrl: "https://cdn.example.com/image.jpg",
            tags: ["engineering"],
          },
        ],
        meta: {
          correlationId: "corr-1",
          requestId: "req-1",
          timestamp: "2026-02-21T00:00:00.000Z",
        },
      }),
    });

    vi.stubGlobal("fetch", fetchMock);

    const articles = await getAllPortfolioArticles();

    expect(articles).toEqual([
      {
        id: "article-1",
        title: "Article 1",
        slug: "article-1",
        publishedAt: "2026-02-21",
        excerpt: "Summary",
        imageUrl: "https://cdn.example.com/image.jpg",
        tags: ["engineering"],
      },
    ]);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.example.com/v1/content/articles",
      {
        method: "GET",
        cache: "force-cache",
        next: {
          revalidate: 60,
          tags: ["articles"],
        },
      }
    );
  });

  it("throws when the portfolio API returns an error envelope", async () => {
    vi.stubEnv("PORTFOLIO_API_URL", "https://api.example.com");

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        success: false,
        error: {
          code: "UPSTREAM_ERROR",
          message: "Failed",
        },
        meta: {
          correlationId: "corr-1",
          requestId: "req-1",
          timestamp: "2026-02-21T00:00:00.000Z",
        },
      }),
    });

    vi.stubGlobal("fetch", fetchMock);

    await expect(getAllPortfolioArticles()).rejects.toThrow(
      "unexpected response envelope"
    );
  });

  it("fetches and returns a single article detail payload", async () => {
    vi.stubEnv("PORTFOLIO_API_URL", "https://api.example.com");

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue({
        success: true,
        data: {
          id: "article-1",
          title: "Article 1",
          slug: "article-1",
          publishedAt: "2026-02-21T00:00:00.000Z",
          excerpt: "Summary",
          seoDescription: "SEO Summary",
          imageUrl: "https://cdn.example.com/image.jpg",
          imageAlt: "Cover image",
          tags: ["engineering"],
          body: [
            {
              _type: "block",
              children: [
                {
                  _type: "span",
                  text: "Hello world",
                },
              ],
            },
          ],
        },
        meta: {
          correlationId: "corr-1",
          requestId: "req-1",
          timestamp: "2026-02-21T00:00:00.000Z",
        },
      }),
    });

    vi.stubGlobal("fetch", fetchMock);

    const article = await getPortfolioArticleBySlug("article-1");

    expect(article).toMatchObject({
      slug: "article-1",
      body: expect.any(Array),
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.example.com/v1/content/articles/article-1",
      {
        method: "GET",
        cache: "force-cache",
        next: {
          revalidate: 60,
          tags: ["articles", "article:article-1"],
        },
      }
    );
  });

  it("returns null when the article detail endpoint responds with 404", async () => {
    vi.stubEnv("PORTFOLIO_API_URL", "https://api.example.com");

    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    vi.stubGlobal("fetch", fetchMock);

    await expect(
      getPortfolioArticleBySlug("missing-article")
    ).resolves.toBeNull();
  });
});
