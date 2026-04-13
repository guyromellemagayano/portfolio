/**
 * @file apps/api-jobs/src/config/env.ts
 * @author Guy Romelle Magayano
 * @description Runtime environment parsing for jobs API configuration.
 */

import { JOBS_API_ENV_KEYS, type JobsApiEnvKey } from "./env-keys.js";

const DEFAULT_API_PORT = 5002;
const DEFAULT_DATABASE_URL = "postgres://jobs:jobs@127.0.0.1:5433/jobs";
const DEFAULT_SYNC_INTERVAL_MS = 60 * 60 * 1000;

export type JobsApiRuntimeEnvironment = "development" | "test" | "production";

export type JobsApiRuntimeConfig = {
  nodeEnv: JobsApiRuntimeEnvironment;
  port: number;
  corsOrigins: string[];
  databaseUrl: string;
  syncIntervalMs: number;
};

/** Reads and trims an environment variable value, returning an empty string when missing. */
function getEnvVar(key: JobsApiEnvKey): string {
  return process.env[key]?.trim() ?? "";
}

/** Parses the API port with a safe fallback when the value is missing or invalid. */
function parsePort(rawPort: string): number {
  const port = Number.parseInt(rawPort, 10);

  if (!Number.isFinite(port) || port <= 0) {
    return DEFAULT_API_PORT;
  }

  return port;
}

/** Normalizes `NODE_ENV` into the jobs API runtime environment union. */
function parseNodeEnv(rawNodeEnv: string): JobsApiRuntimeEnvironment {
  if (rawNodeEnv === "production") {
    return "production";
  }

  if (rawNodeEnv === "test") {
    return "test";
  }

  return "development";
}

/** Parses a comma-delimited CORS origin allowlist. */
function parseCorsOrigins(rawCorsOrigins: string): string[] {
  if (!rawCorsOrigins) {
    return [];
  }

  return rawCorsOrigins
    .split(",")
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
}

/** Parses the sync interval with a conservative default. */
function parseSyncInterval(rawSyncIntervalMs: string): number {
  const interval = Number.parseInt(rawSyncIntervalMs, 10);

  if (!Number.isFinite(interval) || interval < 30_000) {
    return DEFAULT_SYNC_INTERVAL_MS;
  }

  return interval;
}

/** Builds and validates the jobs API runtime configuration from process env. */
export function getJobsApiConfig(): JobsApiRuntimeConfig {
  const nodeEnv = parseNodeEnv(getEnvVar(JOBS_API_ENV_KEYS.NODE_ENV));
  const port = parsePort(
    getEnvVar(JOBS_API_ENV_KEYS.PORT) ||
      getEnvVar(JOBS_API_ENV_KEYS.JOBS_API_PORT)
  );
  const corsOrigins = parseCorsOrigins(
    getEnvVar(JOBS_API_ENV_KEYS.JOBS_API_CORS_ORIGINS)
  );
  const databaseUrl =
    getEnvVar(JOBS_API_ENV_KEYS.JOBS_DATABASE_URL) || DEFAULT_DATABASE_URL;
  const syncIntervalMs = parseSyncInterval(
    getEnvVar(JOBS_API_ENV_KEYS.JOBS_SYNC_INTERVAL_MS)
  );

  return {
    nodeEnv,
    port,
    corsOrigins,
    databaseUrl,
    syncIntervalMs,
  };
}
