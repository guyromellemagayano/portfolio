/**
 * @file apps/web/src/utils/__tests__/articles.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for article source mode resolution and hybrid merge behavior.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  mergeArticlesBySlug,
  resolveArticleSourceMode,
  type ArticleWithSlug,
} from "@web/utils/articles";

describe("resolveArticleSourceMode", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("defaults to mdx when no Sanity env toggles are set", () => {
    expect(resolveArticleSourceMode()).toBe("mdx");
  });

  it("uses sanity mode when SANITY_ENABLED is true and no explicit source mode is set", () => {
    vi.stubEnv("SANITY_ENABLED", "true");
    expect(resolveArticleSourceMode()).toBe("sanity");
  });

  it("respects explicit SANITY_ARTICLES_SOURCE value over SANITY_ENABLED", () => {
    vi.stubEnv("SANITY_ENABLED", "true");
    vi.stubEnv("SANITY_ARTICLES_SOURCE", "hybrid");
    expect(resolveArticleSourceMode()).toBe("hybrid");
  });

  it("falls back to SANITY_ENABLED-based behavior when source mode is invalid", () => {
    vi.stubEnv("SANITY_ENABLED", "true");
    vi.stubEnv("SANITY_ARTICLES_SOURCE", "invalid-value");
    expect(resolveArticleSourceMode()).toBe("sanity");
  });
});

describe("mergeArticlesBySlug", () => {
  const mdxArticles: ArticleWithSlug[] = [
    {
      slug: "launch-log",
      title: "MDX Launch Log",
      date: "2024-05-01",
      description: "From MDX",
    },
    {
      slug: "legacy-post",
      title: "Legacy Post",
      date: "2023-10-01",
      description: "From MDX",
    },
  ];

  const sanityArticles: ArticleWithSlug[] = [
    {
      slug: "launch-log",
      title: "Sanity Launch Log",
      date: "2025-01-15",
      description: "From Sanity",
    },
    {
      slug: "new-cms-post",
      title: "New CMS Post",
      date: "2025-03-01",
      description: "From Sanity",
    },
  ];

  it("dedupes by slug and prefers entries from the first list", () => {
    const merged = mergeArticlesBySlug(sanityArticles, mdxArticles);

    expect(merged).toHaveLength(3);
    expect(merged.find((article) => article.slug === "launch-log")?.title).toBe(
      "Sanity Launch Log"
    );
  });

  it("returns merged results sorted by date descending", () => {
    const merged = mergeArticlesBySlug(sanityArticles, mdxArticles);

    expect(merged.map((article) => article.slug)).toEqual([
      "new-cms-post",
      "launch-log",
      "legacy-post",
    ]);
  });
});
