/**
 * @file apps/web/src/portfolio-api/__tests__/portfolio.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for the portfolio snapshot API client behavior.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getPortfolioSnapshot } from "@web/portfolio-api/portfolio";

describe("portfolio snapshot API client", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("fetches and returns the canonical portfolio snapshot payload", async () => {
    vi.stubEnv("PORTFOLIO_API_URL", "https://api.example.com");

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        success: true,
        data: {
          schemaVersion: "1.0",
          profile: {
            id: "profile-1",
            name: "Guy Romelle Magayano",
            role: "Product engineer",
            heroTitle: "Hello world",
            heroIntro: "Snapshot intro",
            status: "published",
          },
          navigation: [],
          socialLinks: [],
          showcaseApps: [],
          serviceOfferings: [],
          capabilityClusters: [],
          focusAreas: [],
          foundationCapabilities: [],
          buildSequence: [],
          bookingPaths: [],
          operatingPrinciples: [],
          workExperience: [],
          projects: [],
          speakingAppearances: [],
          useCategories: [],
          photos: [],
          pages: [],
        },
        meta: {
          correlationId: "corr-1",
          requestId: "req-1",
          timestamp: "2026-02-25T00:00:00.000Z",
        },
      }),
    });

    vi.stubGlobal("fetch", fetchMock);

    const snapshot = await getPortfolioSnapshot();

    expect(snapshot).toMatchObject({
      schemaVersion: "1.0",
      profile: {
        name: "Guy Romelle Magayano",
      },
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.example.com/v1/portfolio",
      {
        method: "GET",
        cache: "force-cache",
        next: {
          tags: ["portfolio"],
        },
      }
    );
  });

  it("throws when the API responds with an unexpected envelope", async () => {
    vi.stubEnv("PORTFOLIO_API_URL", "https://api.example.com");

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        success: true,
        data: [],
      }),
    });

    vi.stubGlobal("fetch", fetchMock);

    await expect(getPortfolioSnapshot()).rejects.toThrow(
      "Portfolio API returned an unexpected response envelope."
    );
  });
});
