/**
 * @file apps/web/src/lib/__tests__/metadata.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for shared metadata builders and normalization helpers.
 */

import { afterEach, describe, expect, it, vi } from "vitest";

import {
  buildOpenGraphImages,
  buildPageMetadata,
  buildTwitterImages,
  clampMetadataDescription,
  formatResolvedMetadataTitle,
  resolveMetadataDescription,
} from "@web/lib/metadata";

describe("metadata helpers", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("formats route titles with the site suffix for consistent social titles", () => {
    expect(formatResolvedMetadataTitle("About")).toBe(
      "About | Guy Romelle Magayano"
    );
    expect(
      formatResolvedMetadataTitle({
        absolute: "Guy Romelle Magayano",
      })
    ).toBe("Guy Romelle Magayano");
  });

  it("resolves the first non-empty metadata description candidate", () => {
    expect(
      resolveMetadataDescription("", "  ", "Primary description", "Fallback")
    ).toBe("Primary description");
  });

  it("clamps long descriptions with a single trailing ellipsis", () => {
    expect(clampMetadataDescription("a".repeat(170))).toHaveLength(160);
    expect(clampMetadataDescription("a".repeat(170)).endsWith("…")).toBe(true);
  });

  it("builds canonical, browser title, and social titles from the same source", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("SITE_URL_PRODUCTION", "https://www.guyromellemagayano.com");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "guyromellemagayano.com");

    const metadata = buildPageMetadata({
      canonicalPathOrUrl: "/about",
      description: "Background, priorities, and engineering principles.",
      openGraphImages: buildOpenGraphImages(),
      title: "About",
      twitterImages: buildTwitterImages(),
    });

    expect(metadata.title).toBe("About");
    expect(metadata.alternates).toEqual({
      canonical: "https://www.guyromellemagayano.com/about",
    });
    expect(metadata.openGraph).toMatchObject({
      title: "About | Guy Romelle Magayano",
      description: "Background, priorities, and engineering principles.",
      url: "https://www.guyromellemagayano.com/about",
    });
    expect(metadata.twitter).toMatchObject({
      title: "About | Guy Romelle Magayano",
      description: "Background, priorities, and engineering principles.",
    });
  });

  it("throws when a metadata builder omits a valid canonical path", () => {
    expect(() =>
      buildPageMetadata({
        canonicalPathOrUrl: "about",
        description: "Background, priorities, and engineering principles.",
        title: "About",
      })
    ).toThrow(/valid metadata canonical path or URL/i);
  });

  it("throws when a metadata builder omits a usable description", () => {
    expect(() =>
      buildPageMetadata({
        canonicalPathOrUrl: "/about",
        description: "   ",
        title: "About",
      })
    ).toThrow(/non-empty metadata description/i);
  });
});
