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

  it("prefers SITE_URL_PRODUCTION in production", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("SITE_URL_PRODUCTION", "https://example.com/");
    vi.stubEnv("SITE_URL_PREVIEW", "https://preview.example.com/");
    vi.stubEnv("SITE_URL_DEVELOPMENT", "http://localhost:4321/");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "portfolio.vercel.app");

    expect(resolveSiteUrlBase()).toBe("https://example.com");
  });

  it("falls back to VERCEL_PROJECT_PRODUCTION_URL when SITE_URL_PRODUCTION is unset", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "guyromellemagayano.com");

    expect(resolveSiteUrlBase()).toBe("https://guyromellemagayano.com");
  });

  it("prefers SITE_URL_PREVIEW in preview", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("SITE_URL_PREVIEW", "https://preview.example.com/");
    vi.stubEnv("VERCEL_URL", "portfolio-preview-abc.vercel.app");

    expect(resolveSiteUrlBase()).toBe("https://preview.example.com");
  });

  it("falls back to VERCEL_URL in preview when SITE_URL_PREVIEW is unset", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("VERCEL_URL", "portfolio-preview-abc.vercel.app");

    expect(resolveSiteUrlBase()).toBe(
      "https://portfolio-preview-abc.vercel.app"
    );
  });

  it("ignores local-only site URLs in production and uses the Vercel production URL fallback", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("SITE_URL_PRODUCTION", "https://guyromellemagayano.local");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "guyromellemagayano.com");

    expect(resolveSiteUrlBase()).toBe("https://guyromellemagayano.com");
  });

  it("uses SITE_URL_DEVELOPMENT in development", () => {
    vi.stubEnv("VERCEL_ENV", "development");
    vi.stubEnv("SITE_URL_DEVELOPMENT", "http://localhost:4321/");

    expect(resolveSiteUrlBase()).toBe("http://localhost:4321");
  });

  it("builds absolute URLs for relative paths when a site URL base can be resolved", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "guyromellemagayano.com");

    expect(toAbsoluteSiteUrl("/feed.xml")).toBe(
      "https://guyromellemagayano.com/feed.xml"
    );
  });

  it("uses the local development domain for relative paths when development env URLs are unset", () => {
    vi.stubEnv("VERCEL_ENV", "development");

    expect(toAbsoluteSiteUrl("/feed.xml")).toBe(
      "http://localhost:4321/feed.xml"
    );
  });

  it("returns the normalized fallback from resolveSiteUrlBaseOrDefault", () => {
    expect(resolveSiteUrlBaseOrDefault("http://localhost:4321/")).toBe(
      "http://localhost:4321"
    );
  });

  it("recognizes local-only hostnames", () => {
    expect(isLocalOnlyHostname("localhost")).toBe(true);
    expect(isLocalOnlyHostname("preview.guyromellemagayano.local")).toBe(true);
    expect(isLocalOnlyHostname("guyromellemagayano.internal")).toBe(false);
    expect(isLocalOnlyHostname("guyromellemagayano.com")).toBe(false);
  });
});
