/**
 * @file apps/web/src/utils/__tests__/site-url.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for runtime site URL resolution across local and Vercel environments.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  isLocalOnlyHostname,
  resolveSiteUrlBase,
  resolveSiteUrlBaseOrDefault,
  toAbsoluteSiteUrl,
} from "@web/utils/site-url";

describe("site URL helpers", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("prefers NEXT_PUBLIC_SITE_URL when configured", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.com/");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "portfolio.vercel.app");

    expect(resolveSiteUrlBase()).toBe("https://example.com");
  });

  it("falls back to VERCEL_PROJECT_PRODUCTION_URL when NEXT_PUBLIC_SITE_URL is unset", () => {
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "guyromellemagayano.com");

    expect(resolveSiteUrlBase()).toBe("https://guyromellemagayano.com");
  });

  it("falls back to VERCEL_URL when no explicit site URL is configured", () => {
    vi.stubEnv("VERCEL_URL", "portfolio-preview-abc.vercel.app");

    expect(resolveSiteUrlBase()).toBe(
      "https://portfolio-preview-abc.vercel.app"
    );
  });

  it("ignores .local site URLs in production and uses the Vercel production URL fallback", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://guyromellemagayano.local");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "guyromellemagayano.com");

    expect(resolveSiteUrlBase()).toBe("https://guyromellemagayano.com");
  });

  it("builds absolute URLs for relative paths when a site URL base can be resolved", () => {
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "guyromellemagayano.com");

    expect(toAbsoluteSiteUrl("/feed.xml")).toBe(
      "https://guyromellemagayano.com/feed.xml"
    );
  });

  it("returns undefined for relative paths when no site URL base can be resolved", () => {
    expect(toAbsoluteSiteUrl("/feed.xml")).toBeUndefined();
  });

  it("returns the normalized fallback from resolveSiteUrlBaseOrDefault", () => {
    expect(resolveSiteUrlBaseOrDefault("http://localhost:3000/")).toBe(
      "http://localhost:3000"
    );
  });

  it("recognizes local-only hostnames", () => {
    expect(isLocalOnlyHostname("localhost")).toBe(true);
    expect(isLocalOnlyHostname("api.guyromellemagayano.local")).toBe(true);
    expect(isLocalOnlyHostname("guyromellemagayano.localhost")).toBe(true);
    expect(isLocalOnlyHostname("guyromellemagayano.com")).toBe(false);
  });
});
