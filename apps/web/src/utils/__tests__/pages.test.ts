/**
 * @file apps/web/src/utils/__tests__/pages.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for content-backed standalone page utility behavior.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  getAllPortfolioPages,
  getPortfolioPageBySlug,
} from "@web/portfolio-api/content";
import { getAllPages, getPageBySlug } from "@web/utils/pages";

vi.mock("@web/portfolio-api/content", () => ({
  getAllPortfolioPages: vi.fn(),
  getPortfolioPageBySlug: vi.fn(),
}));

describe("getAllPages", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("normalizes pages returned from the portfolio API", async () => {
    vi.mocked(getAllPortfolioPages).mockResolvedValue([
      {
        id: "page-1",
        slug: "now",
        title: " Now ",
        subheading: " Updates ",
        intro: " What I am working on now. ",
        updatedAt: "2026-02-25T00:00:00.000Z",
      },
      {
        id: "invalid-page",
        slug: "invalid",
        title: "",
        body: [],
      } as never,
    ]);

    await expect(getAllPages()).resolves.toEqual([
      {
        slug: "now",
        title: "Now",
        subheading: "Updates",
        intro: "What I am working on now.",
        updatedAt: "2026-02-25T00:00:00.000Z",
      },
    ]);
  });
});

describe("getPageBySlug", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns null when the portfolio API page detail is not found", async () => {
    vi.mocked(getPortfolioPageBySlug).mockResolvedValue(null);

    await expect(getPageBySlug("missing-page")).resolves.toBeNull();
  });

  it("normalizes standalone page detail payloads returned from the portfolio API", async () => {
    vi.mocked(getPortfolioPageBySlug).mockResolvedValue({
      id: "page-1",
      slug: "now",
      title: "Now",
      subheading: "Now",
      intro: "Current focus and priorities",
      updatedAt: "2026-02-25T00:00:00.000Z",
      seoDescription: "What I am doing right now.",
      body: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Shipping CMS pages.",
            },
          ],
        },
      ],
    });

    await expect(getPageBySlug("now")).resolves.toEqual({
      slug: "now",
      title: "Now",
      subheading: "Now",
      intro: "Current focus and priorities",
      updatedAt: "2026-02-25T00:00:00.000Z",
      seoDescription: "What I am doing right now.",
      body: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Shipping CMS pages.",
            },
          ],
        },
      ],
    });
  });
});
