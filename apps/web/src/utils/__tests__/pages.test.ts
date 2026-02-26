/**
 * @file apps/web/src/utils/__tests__/pages.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for Sanity-backed standalone page utility behavior.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getAllGatewayPages, getGatewayPageBySlug } from "@web/gateway/content";
import { getAllPages, getPageBySlug } from "@web/utils/pages";

vi.mock("@web/gateway/content", () => ({
  getAllGatewayPages: vi.fn(),
  getGatewayPageBySlug: vi.fn(),
}));

describe("getAllPages", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("normalizes pages returned from the API gateway", async () => {
    vi.mocked(getAllGatewayPages).mockResolvedValue([
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

  it("returns null when the gateway page detail is not found", async () => {
    vi.mocked(getGatewayPageBySlug).mockResolvedValue(null);

    await expect(getPageBySlug("missing-page")).resolves.toBeNull();
  });

  it("normalizes standalone page detail payloads returned from the gateway", async () => {
    vi.mocked(getGatewayPageBySlug).mockResolvedValue({
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
