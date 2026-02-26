/**
 * @file apps/web/src/gateway/content/__tests__/pages.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for API gateway content page client behavior.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  getAllGatewayPages,
  getGatewayPageBySlug,
} from "@web/gateway/content/pages";

describe("gateway content pages client", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("fetches and returns gateway page data", async () => {
    vi.stubEnv("API_GATEWAY_URL", "https://api.example.com");

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        success: true,
        data: [
          {
            id: "page-1",
            slug: "now",
            title: "Now",
            subheading: "Now",
            intro: "Current focus and priorities",
            updatedAt: "2026-02-25T00:00:00.000Z",
          },
        ],
        meta: {
          correlationId: "corr-1",
          requestId: "req-1",
          timestamp: "2026-02-25T00:00:00.000Z",
        },
      }),
    });

    vi.stubGlobal("fetch", fetchMock);

    const pages = await getAllGatewayPages();

    expect(pages).toEqual([
      {
        id: "page-1",
        slug: "now",
        title: "Now",
        subheading: "Now",
        intro: "Current focus and priorities",
        updatedAt: "2026-02-25T00:00:00.000Z",
      },
    ]);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.example.com/v1/content/pages",
      {
        method: "GET",
        next: {
          revalidate: 60,
          tags: ["pages"],
        },
      }
    );
  });

  it("fetches and returns a single page detail payload", async () => {
    vi.stubEnv("API_GATEWAY_URL", "https://api.example.com");

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue({
        success: true,
        data: {
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
                  text: "Hello from the CMS page",
                },
              ],
            },
          ],
        },
        meta: {
          correlationId: "corr-1",
          requestId: "req-1",
          timestamp: "2026-02-25T00:00:00.000Z",
        },
      }),
    });

    vi.stubGlobal("fetch", fetchMock);

    const page = await getGatewayPageBySlug("now");

    expect(page).toMatchObject({
      slug: "now",
      body: expect.any(Array),
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.example.com/v1/content/pages/now",
      {
        method: "GET",
        next: {
          revalidate: 60,
          tags: ["pages", "page:now"],
        },
      }
    );
  });

  it("returns null when the page detail endpoint responds with 404", async () => {
    vi.stubEnv("API_GATEWAY_URL", "https://api.example.com");

    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    vi.stubGlobal("fetch", fetchMock);

    await expect(getGatewayPageBySlug("missing-page")).resolves.toBeNull();
  });
});
