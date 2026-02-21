/**
 * @file sanity/__tests__/client.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for Sanity client configuration and query fetching.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  fetchSanityQuery,
  getSanityConfig,
  hasSanityConfig,
} from "@web/sanity/client";

describe("sanity client", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("returns null config when required env vars are missing", () => {
    expect(getSanityConfig()).toBeNull();
    expect(hasSanityConfig()).toBe(false);
  });

  it("returns config when required env vars are provided", () => {
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "demo-project");
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "production");

    expect(getSanityConfig()).toEqual({
      projectId: "demo-project",
      dataset: "production",
      apiVersion: "2025-02-19",
      token: undefined,
    });
    expect(hasSanityConfig()).toBe(true);
  });

  it("fetches Sanity query results and includes query params", async () => {
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "demo-project");
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "production");
    vi.stubEnv("SANITY_API_READ_TOKEN", "secret-token");

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ result: [{ _id: "1" }] }),
    });

    vi.stubGlobal("fetch", fetchMock);

    const result = await fetchSanityQuery<{ _id: string }[]>(
      '*[_type == "article"]',
      { limit: 1 }
    );

    expect(result).toEqual([{ _id: "1" }]);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const parsedUrl = new URL(url);

    expect(parsedUrl.hostname).toBe("demo-project.api.sanity.io");
    expect(parsedUrl.pathname).toBe("/v2025-02-19/data/query/production");
    expect(parsedUrl.searchParams.get("perspective")).toBe("published");
    expect(parsedUrl.searchParams.get("params")).toBe('{"limit":1}');

    expect(init.headers).toEqual({
      Authorization: "Bearer secret-token",
    });
  });

  it("throws when Sanity query returns an error payload", async () => {
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "demo-project");
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "production");

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          error: {
            description: "bad query",
          },
        }),
      })
    );

    await expect(fetchSanityQuery('*[_type == "article"]')).rejects.toThrow(
      "bad query"
    );
  });
});
