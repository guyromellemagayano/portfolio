/**
 * @file apps/api/src/platform/__tests__/vercel.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for Vercel API gateway URL normalization.
 */

import { describe, expect, it } from "vitest";

import { normalizeVercelApiGatewayRequestUrl } from "@api/platform/vercel";

describe("normalizeVercelApiGatewayRequestUrl", () => {
  it("returns the root path for the rewritten function root path", () => {
    expect(normalizeVercelApiGatewayRequestUrl("/api")).toBe("/");
    expect(normalizeVercelApiGatewayRequestUrl("/api/")).toBe("/");
  });

  it("strips the /api prefix from rewritten versioned API paths", () => {
    expect(normalizeVercelApiGatewayRequestUrl("/api/v1/status")).toBe(
      "/v1/status"
    );
    expect(
      normalizeVercelApiGatewayRequestUrl("/api/v1/content/articles")
    ).toBe("/v1/content/articles");
  });

  it("preserves query strings when stripping the rewritten /api prefix", () => {
    expect(normalizeVercelApiGatewayRequestUrl("/api?v=1")).toBe("/?v=1");
    expect(normalizeVercelApiGatewayRequestUrl("/api/v1/status?debug=1")).toBe(
      "/v1/status?debug=1"
    );
  });

  it("does not modify paths that do not match the rewritten /api prefix", () => {
    expect(normalizeVercelApiGatewayRequestUrl("/v1/status")).toBe(
      "/v1/status"
    );
    expect(normalizeVercelApiGatewayRequestUrl("/apix/test")).toBe(
      "/apix/test"
    );
  });
});
