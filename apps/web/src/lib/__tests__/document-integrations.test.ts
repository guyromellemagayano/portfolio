/**
 * @file apps/web/src/lib/__tests__/document-integrations.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for shared document integration resolution.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { resolveDocumentIntegrations } from "@web/lib/document-integrations";

describe("resolveDocumentIntegrations", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns disabled integrations when env vars are absent", () => {
    const integrations = resolveDocumentIntegrations();

    expect(integrations).toMatchObject({
      bingSiteVerification: "",
      googleAnalyticsBootstrapScript: "",
      googleAnalyticsMeasurementId: "",
      googleAnalyticsScriptUrl: "",
      googleTagManagerBootstrapScript: "",
      googleTagManagerContainerId: "",
      googleTagManagerNoScriptUrl: "",
      shouldRenderVercelObservability: false,
    });
  });

  it("builds predictable direct analytics payloads when GTM is absent", () => {
    vi.stubEnv("BING_SITE_VERIFICATION", "bing-token");
    vi.stubEnv("GOOGLE_ANALYTICS_MEASUREMENT_ID", "G-TEST123");
    vi.stubEnv("VERCEL_ENV", "production");

    const integrations = resolveDocumentIntegrations();

    expect(integrations.bingSiteVerification).toBe("bing-token");
    expect(integrations.googleAnalyticsMeasurementId).toBe("G-TEST123");
    expect(integrations.googleAnalyticsScriptUrl).toBe(
      "https://www.googletagmanager.com/gtag/js?id=G-TEST123"
    );
    expect(integrations.googleAnalyticsBootstrapScript).toContain(
      'window.gtag("config", "G-TEST123");'
    );
    expect(integrations.googleTagManagerContainerId).toBe("");
    expect(integrations.googleTagManagerBootstrapScript).toBe("");
    expect(integrations.googleTagManagerNoScriptUrl).toBe("");
    expect(integrations.shouldRenderVercelObservability).toBe(true);
  });

  it("prefers GTM over direct gtag loading when both Google integrations are configured", () => {
    vi.stubEnv("GOOGLE_ANALYTICS_MEASUREMENT_ID", "G-TEST123");
    vi.stubEnv("GOOGLE_TAG_MANAGER_CONTAINER_ID", "GTM-TEST123");

    const integrations = resolveDocumentIntegrations();

    expect(integrations.googleAnalyticsMeasurementId).toBe("G-TEST123");
    expect(integrations.googleAnalyticsScriptUrl).toBe("");
    expect(integrations.googleAnalyticsBootstrapScript).toBe("");
    expect(integrations.googleTagManagerContainerId).toBe("GTM-TEST123");
    expect(integrations.googleTagManagerBootstrapScript).toContain(
      '"GTM-TEST123"'
    );
    expect(integrations.googleTagManagerNoScriptUrl).toBe(
      "https://www.googletagmanager.com/ns.html?id=GTM-TEST123"
    );
  });
});
