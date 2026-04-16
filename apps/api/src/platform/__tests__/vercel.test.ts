/**
 * @file apps/api/src/platform/__tests__/vercel.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for Vercel portfolio API URL normalization.
 */

import { describe, expect, it } from "vitest";

import { CONTENT_ARTICLES_ROUTE } from "@portfolio/api-contracts/content";
import {
  API_ROOT_ROUTE,
  HEALTH_ROUTE_STATUS,
  VERCEL_API_ROUTE_PREFIX,
} from "@portfolio/api-contracts/http";

import vercelPortfolioApiHandler, {
  normalizeVercelPortfolioApiRequestUrl,
} from "@api/platform/vercel";

describe("normalizeVercelPortfolioApiRequestUrl", () => {
  it("returns the root path for the rewritten function root path", () => {
    expect(normalizeVercelPortfolioApiRequestUrl(VERCEL_API_ROUTE_PREFIX)).toBe(
      API_ROOT_ROUTE
    );
    expect(
      normalizeVercelPortfolioApiRequestUrl(`${VERCEL_API_ROUTE_PREFIX}/`)
    ).toBe(API_ROOT_ROUTE);
  });

  it("strips the /api prefix from rewritten versioned API paths", () => {
    expect(
      normalizeVercelPortfolioApiRequestUrl(
        `${VERCEL_API_ROUTE_PREFIX}${HEALTH_ROUTE_STATUS}`
      )
    ).toBe(HEALTH_ROUTE_STATUS);
    expect(
      normalizeVercelPortfolioApiRequestUrl(
        `${VERCEL_API_ROUTE_PREFIX}${CONTENT_ARTICLES_ROUTE}`
      )
    ).toBe(CONTENT_ARTICLES_ROUTE);
  });

  it("preserves query strings when stripping the rewritten /api prefix", () => {
    expect(
      normalizeVercelPortfolioApiRequestUrl(`${VERCEL_API_ROUTE_PREFIX}?v=1`)
    ).toBe(`${API_ROOT_ROUTE}?v=1`);
    expect(
      normalizeVercelPortfolioApiRequestUrl(
        `${VERCEL_API_ROUTE_PREFIX}${HEALTH_ROUTE_STATUS}?debug=1`
      )
    ).toBe(`${HEALTH_ROUTE_STATUS}?debug=1`);
  });

  it("does not modify paths that do not match the rewritten /api prefix", () => {
    expect(normalizeVercelPortfolioApiRequestUrl(HEALTH_ROUTE_STATUS)).toBe(
      HEALTH_ROUTE_STATUS
    );
    expect(normalizeVercelPortfolioApiRequestUrl("/apix/test")).toBe(
      "/apix/test"
    );
  });

  it("handles rewritten /api root requests via the bun fetch handler", async () => {
    const response = await vercelPortfolioApiHandler(
      new Request("https://api.example.com/api")
    );

    expect(response.status).toBe(308);
    expect(response.headers.get("location")).toBe(HEALTH_ROUTE_STATUS);
  });

  it("handles rewritten /api versioned routes via the bun fetch handler", async () => {
    const response = await vercelPortfolioApiHandler(
      new Request("https://api.example.com/api/v1/status")
    );
    const payload = (await response.json()) as {
      success: boolean;
      data: {
        ok: boolean;
      };
    };

    expect(response.status).toBe(200);
    expect(payload.success).toBe(true);
    expect(payload.data.ok).toBe(true);
  });
});
