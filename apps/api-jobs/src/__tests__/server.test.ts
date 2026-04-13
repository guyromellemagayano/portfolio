/**
 * @file apps/api-jobs/src/__tests__/server.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for jobs API environment parsing and composition helpers.
 */

import { getJobsApiConfig } from "@api-jobs/config/env";
import { JOBS_API_ENV_KEYS } from "@api-jobs/config/env-keys";
import { resolveCorsOrigin } from "@api-jobs/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("jobs API runtime config", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("parses jobs API environment values", () => {
    vi.stubEnv(JOBS_API_ENV_KEYS.JOBS_API_PORT, "7002");
    vi.stubEnv(
      JOBS_API_ENV_KEYS.JOBS_API_CORS_ORIGINS,
      "http://localhost:3002,https://jobs.example.com"
    );
    vi.stubEnv(
      JOBS_API_ENV_KEYS.JOBS_DATABASE_URL,
      "postgres://jobs:jobs@localhost:5433/jobs"
    );
    vi.stubEnv(JOBS_API_ENV_KEYS.JOBS_SYNC_INTERVAL_MS, "600000");

    const config = getJobsApiConfig();

    expect(config.port).toBe(7002);
    expect(config.corsOrigins).toEqual([
      "http://localhost:3002",
      "https://jobs.example.com",
    ]);
    expect(config.databaseUrl).toBe("postgres://jobs:jobs@localhost:5433/jobs");
    expect(config.syncIntervalMs).toBe(600000);
  });

  it("allows CORS in development when allowlist is not configured", () => {
    vi.stubEnv(JOBS_API_ENV_KEYS.NODE_ENV, "development");
    vi.stubEnv(JOBS_API_ENV_KEYS.JOBS_API_CORS_ORIGINS, "");

    const config = getJobsApiConfig();

    expect(resolveCorsOrigin(config)).toBe(true);
  });

  it("disables CORS in production when allowlist is empty", () => {
    vi.stubEnv(JOBS_API_ENV_KEYS.NODE_ENV, "production");
    vi.stubEnv(JOBS_API_ENV_KEYS.JOBS_API_CORS_ORIGINS, "");

    const config = getJobsApiConfig();

    expect(resolveCorsOrigin(config)).toBe(false);
  });
});
