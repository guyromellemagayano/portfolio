/**
 * @file apps/api/src/__tests__/server.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for API gateway composition and provider resolution.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getApiConfig } from "@api/config/env";
import { createApiLogger } from "@api/config/logger";
import { createProviderRegistry } from "@api/gateway/provider-registry";
import { createServer, resolveCorsOrigin } from "@api/server";

describe("API gateway server", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("creates an Express application instance", () => {
    const app = createServer();

    expect(app).toBeDefined();
    expect(typeof app).toBe("function");
    expect(typeof app.use).toBe("function");
    expect(typeof app.listen).toBe("function");
  });

  it("redirects the root route to the latest versioned health endpoint", async () => {
    const app = createServer();
    const redirect = vi.fn();
    const next = vi.fn();

    type AppRouteLayer = {
      route?: {
        path?: string;
        stack?: Array<{
          handle: (
            request: unknown,
            response: {
              redirect: (statusCode: number, location: string) => unknown;
            },
            next: (error?: unknown) => void
          ) => unknown;
        }>;
      };
    };

    const routeStack =
      (
        app as unknown as {
          _router?: {
            stack?: AppRouteLayer[];
          };
          router?: {
            stack?: AppRouteLayer[];
          };
        }
      )._router?.stack ??
      (
        app as unknown as {
          router?: {
            stack?: AppRouteLayer[];
          };
        }
      ).router?.stack ??
      [];

    const routeLayer = routeStack.find((layer) => layer.route?.path === "/");
    const routeHandler = routeLayer?.route?.stack?.[0]?.handle;

    expect(routeHandler).toBeTypeOf("function");

    routeHandler?.({}, { redirect }, next);

    expect(redirect).toHaveBeenCalledWith(308, "/v1/status");
    expect(next).not.toHaveBeenCalled();
  });

  it("parses API gateway environment values", () => {
    vi.stubEnv("API_PORT", "7001");
    vi.stubEnv(
      "API_GATEWAY_CORS_ORIGINS",
      "http://localhost:3000,https://admin.example.com"
    );
    vi.stubEnv("API_GATEWAY_CONTENT_PROVIDER", "static");
    vi.stubEnv("SANITY_REQUEST_TIMEOUT_MS", "12000");
    vi.stubEnv("SANITY_REQUEST_MAX_RETRIES", "2");
    vi.stubEnv("SANITY_REQUEST_RETRY_DELAY_MS", "500");

    const config = getApiConfig();

    expect(config.port).toBe(7001);
    expect(config.corsOrigins).toEqual([
      "http://localhost:3000",
      "https://admin.example.com",
    ]);
    expect(config.integrations.contentProvider).toBe("static");
    expect(config.integrations.sanity.requestTimeoutMs).toBe(12000);
    expect(config.integrations.sanity.maxRetries).toBe(2);
    expect(config.integrations.sanity.retryDelayMs).toBe(500);
  });

  it("allows NEXT_PUBLIC_SANITY_* fallback in non-production environments", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("SANITY_PROJECT_ID", "");
    vi.stubEnv("SANITY_DATASET", "");
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "public-project");
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "public-dataset");
    vi.stubEnv("NEXT_PUBLIC_SANITY_API_VERSION", "2026-01-01");

    const config = getApiConfig();

    expect(config.integrations.sanity.projectId).toBe("public-project");
    expect(config.integrations.sanity.dataset).toBe("public-dataset");
    expect(config.integrations.sanity.apiVersion).toBe("2026-01-01");
  });

  it("ignores NEXT_PUBLIC_SANITY_* fallback in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("SANITY_PROJECT_ID", "");
    vi.stubEnv("SANITY_DATASET", "");
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "public-project");
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "public-dataset");
    vi.stubEnv("NEXT_PUBLIC_SANITY_API_VERSION", "2026-01-01");

    const config = getApiConfig();

    expect(config.integrations.sanity.projectId).toBeUndefined();
    expect(config.integrations.sanity.dataset).toBeUndefined();
    expect(config.integrations.sanity.apiVersion).toBe("2025-02-19");
  });

  it("uses static content provider when explicitly configured", () => {
    vi.stubEnv("API_GATEWAY_CONTENT_PROVIDER", "static");

    const config = getApiConfig();
    const logger = createApiLogger(config.nodeEnv);
    const providers = createProviderRegistry(config, logger);

    expect(providers.content.name).toBe("static");
  });

  it("falls back to static provider when sanity config is incomplete", () => {
    vi.stubEnv("API_GATEWAY_CONTENT_PROVIDER", "sanity");
    vi.stubEnv("SANITY_PROJECT_ID", "");
    vi.stubEnv("SANITY_DATASET", "");

    const config = getApiConfig();
    const logger = createApiLogger(config.nodeEnv);
    const providers = createProviderRegistry(config, logger);

    expect(providers.content.name).toBe("static");
  });

  it("uses sanity provider when sanity config is complete", () => {
    vi.stubEnv("API_GATEWAY_CONTENT_PROVIDER", "sanity");
    vi.stubEnv("SANITY_PROJECT_ID", "demo-project");
    vi.stubEnv("SANITY_DATASET", "production");

    const config = getApiConfig();
    const logger = createApiLogger(config.nodeEnv);
    const providers = createProviderRegistry(config, logger);

    expect(providers.content.name).toBe("sanity");
  });

  it("fails fast in production when sanity provider is configured without server-side sanity env", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("API_GATEWAY_CONTENT_PROVIDER", "sanity");
    vi.stubEnv("SANITY_PROJECT_ID", "");
    vi.stubEnv("SANITY_DATASET", "");
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "public-project");
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "public-dataset");

    const config = getApiConfig();
    const logger = createApiLogger(config.nodeEnv);

    expect(() => createProviderRegistry(config, logger)).toThrow(
      "Sanity content provider is configured but SANITY_PROJECT_ID/SANITY_DATASET are missing in production."
    );
  });

  it("allows CORS in development when allowlist is not configured", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("API_GATEWAY_CORS_ORIGINS", "");

    const config = getApiConfig();
    expect(resolveCorsOrigin(config)).toBe(true);
  });

  it("disables CORS in production when allowlist is empty", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("API_GATEWAY_CORS_ORIGINS", "");

    const config = getApiConfig();
    expect(resolveCorsOrigin(config)).toBe(false);
  });

  it("allows only configured CORS origins in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("API_GATEWAY_CORS_ORIGINS", "https://web.example.com");

    const config = getApiConfig();
    expect(resolveCorsOrigin(config)).toEqual(["https://web.example.com"]);
  });
});
