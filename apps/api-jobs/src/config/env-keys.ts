/**
 * @file apps/api-jobs/src/config/env-keys.ts
 * @author Guy Romelle Magayano
 * @description Canonical environment variable keys consumed by the jobs API runtime.
 */

/** Canonical jobs API environment variable keys. */
export const JOBS_API_ENV_KEYS = {
  NODE_ENV: "NODE_ENV",
  PORT: "PORT",
  JOBS_API_PORT: "JOBS_API_PORT",
  JOBS_API_CORS_ORIGINS: "JOBS_API_CORS_ORIGINS",
  JOBS_DATABASE_URL: "JOBS_DATABASE_URL",
  JOBS_SYNC_INTERVAL_MS: "JOBS_SYNC_INTERVAL_MS",
} as const;

export type JobsApiEnvKey =
  (typeof JOBS_API_ENV_KEYS)[keyof typeof JOBS_API_ENV_KEYS];
