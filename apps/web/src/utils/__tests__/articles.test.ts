/**
 * @file apps/web/src/utils/__tests__/articles.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for Sanity-backed article utility behavior.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  getAllGatewayArticles,
  getGatewayArticleBySlug,
} from "@web/gateway/content";
import { getAllArticles, getArticleBySlug } from "@web/utils/articles";

vi.mock("@web/gateway/content", () => ({
  getAllGatewayArticles: vi.fn(),
  getGatewayArticleBySlug: vi.fn(),
}));

describe("getAllArticles", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("normalizes and sorts articles returned from the API gateway", async () => {
    vi.mocked(getAllGatewayArticles).mockResolvedValue([
      {
        id: "article-older",
        title: "Older",
        slug: "older",
        publishedAt: "2025-01-01",
        excerpt: "Older summary",
        imageUrl: undefined,
        imageWidth: undefined,
        imageHeight: undefined,
        tags: ["engineering", " "],
      },
      {
        id: "article-newer",
        title: "Newer",
        slug: "newer",
        publishedAt: "2025-02-01",
        excerpt: "Newer summary",
        imageUrl: "https://cdn.example.com/newer.jpg",
        imageWidth: 1400,
        imageHeight: 900,
        tags: [],
      },
      {
        id: "invalid",
        title: "",
        slug: "invalid",
        publishedAt: "2025-03-01",
        excerpt: "Should be filtered",
        imageUrl: undefined,
        imageWidth: undefined,
        imageHeight: undefined,
        tags: [],
      },
    ]);

    await expect(getAllArticles()).resolves.toEqual([
      {
        slug: "newer",
        title: "Newer",
        date: "2025-02-01",
        description: "Newer summary",
        image: "https://cdn.example.com/newer.jpg",
        imageWidth: 1400,
        imageHeight: 900,
      },
      {
        slug: "older",
        title: "Older",
        date: "2025-01-01",
        description: "Older summary",
        tags: ["engineering"],
      },
    ]);
  });

  it("throws when the gateway request fails", async () => {
    vi.mocked(getAllGatewayArticles).mockRejectedValue(
      new Error("Gateway unavailable")
    );

    await expect(getAllArticles()).rejects.toThrow("Gateway unavailable");
  });
});

describe("getArticleBySlug", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns null when the gateway article detail is not found", async () => {
    vi.mocked(getGatewayArticleBySlug).mockResolvedValue(null);

    await expect(getArticleBySlug("missing-article")).resolves.toBeNull();
  });

  it("normalizes article detail payloads returned from the gateway", async () => {
    vi.mocked(getGatewayArticleBySlug).mockResolvedValue({
      id: "article-1",
      title: "Article 1",
      slug: "article-1",
      publishedAt: "2026-02-24T00:00:00.000Z",
      excerpt: "Summary",
      seoDescription: "SEO Summary",
      imageUrl: "https://cdn.example.com/cover.jpg",
      imageWidth: 1600,
      imageHeight: 900,
      imageAlt: "Cover image",
      tags: ["engineering", " "],
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
    });

    await expect(getArticleBySlug("article-1")).resolves.toEqual({
      slug: "article-1",
      title: "Article 1",
      date: "2026-02-24T00:00:00.000Z",
      description: "Summary",
      image: "https://cdn.example.com/cover.jpg",
      imageWidth: 1600,
      imageHeight: 900,
      imageAlt: "Cover image",
      seoDescription: "SEO Summary",
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
    });
  });
});
