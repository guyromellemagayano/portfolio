/**
 * @file apps/api/src/config/env.ts
 * @author Guy Romelle Magayano
 * @description Runtime environment parsing for API gateway configuration.
 */

const DEFAULT_API_PORT = 5001;
const DEFAULT_SANITY_API_VERSION = "2025-02-19";
const DEFAULT_CONTENT_PROVIDER = "sanity";
const DEFAULT_SANITY_REQUEST_TIMEOUT_MS = 8_000;
const DEFAULT_SANITY_REQUEST_MAX_RETRIES = 1;
const DEFAULT_SANITY_REQUEST_RETRY_DELAY_MS = 250;

export type ApiRuntimeEnvironment = "development" | "test" | "production";
export type ContentProviderKind = "sanity" | "static";

export type SanityProviderConfig = {
  projectId?: string;
  dataset?: string;
  apiVersion: string;
  readToken?: string;
  useCdn: boolean;
  requestTimeoutMs: number;
  maxRetries: number;
  retryDelayMs: number;
};

export type ApiRuntimeConfig = {
  nodeEnv: ApiRuntimeEnvironment;
  port: number;
  corsOrigins: string[];
  integrations: {
    contentProvider: ContentProviderKind;
    sanity: SanityProviderConfig;
  };
};

function getEnvVar(key: string): string {
  return globalThis?.process?.env?.[key]?.trim() ?? "";
}

function parsePort(rawPort: string): number {
  const port = Number.parseInt(rawPort, 10);

  if (!Number.isFinite(port) || port <= 0) {
    return DEFAULT_API_PORT;
  }

  return port;
}

function parseNodeEnv(rawNodeEnv: string): ApiRuntimeEnvironment {
  if (rawNodeEnv === "production") {
    return "production";
  }

  if (rawNodeEnv === "test") {
    return "test";
  }

  return "development";
}

function parseBoolean(rawValue: string, fallback: boolean): boolean {
  if (!rawValue) {
    return fallback;
  }

  const normalizedValue = rawValue.toLowerCase();
  return normalizedValue === "true" || normalizedValue === "1";
}

function parseInteger(
  rawValue: string,
  fallback: number,
  options: {
    min?: number;
    max?: number;
  } = {}
): number {
  if (!rawValue) {
    return fallback;
  }

  const parsedValue = Number.parseInt(rawValue, 10);

  if (!Number.isFinite(parsedValue)) {
    return fallback;
  }

  if (options.min !== undefined && parsedValue < options.min) {
    return fallback;
  }

  if (options.max !== undefined && parsedValue > options.max) {
    return fallback;
  }

  return parsedValue;
}

function parseCorsOrigins(rawCorsOrigins: string): string[] {
  if (!rawCorsOrigins) {
    return [];
  }

  return rawCorsOrigins
    .split(",")
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
}

function parseContentProvider(rawProvider: string): ContentProviderKind {
  const normalizedProvider = rawProvider.toLowerCase();

  if (normalizedProvider === "static") {
    return "static";
  }

  return "sanity";
}

function resolveServerFirstEnvVar(
  nodeEnv: ApiRuntimeEnvironment,
  serverKey: string,
  publicKey: string
): string | undefined {
  const serverValue = getEnvVar(serverKey);

  if (serverValue) {
    return serverValue;
  }

  if (nodeEnv === "production") {
    return undefined;
  }

  const publicValue = getEnvVar(publicKey);
  return publicValue || undefined;
}

function resolveSanityProjectId(
  nodeEnv: ApiRuntimeEnvironment
): string | undefined {
  return resolveServerFirstEnvVar(
    nodeEnv,
    "SANITY_PROJECT_ID",
    "NEXT_PUBLIC_SANITY_PROJECT_ID"
  );
}

function resolveSanityDataset(
  nodeEnv: ApiRuntimeEnvironment
): string | undefined {
  return resolveServerFirstEnvVar(
    nodeEnv,
    "SANITY_DATASET",
    "NEXT_PUBLIC_SANITY_DATASET"
  );
}

function resolveSanityApiVersion(nodeEnv: ApiRuntimeEnvironment): string {
  const serverApiVersion = getEnvVar("SANITY_API_VERSION");

  if (serverApiVersion) {
    return serverApiVersion;
  }

  if (nodeEnv !== "production") {
    const publicApiVersion = getEnvVar("NEXT_PUBLIC_SANITY_API_VERSION");

    if (publicApiVersion) {
      return publicApiVersion;
    }
  }

  return DEFAULT_SANITY_API_VERSION;
}

export function getApiConfig(): ApiRuntimeConfig {
  const nodeEnv = parseNodeEnv(getEnvVar("NODE_ENV"));
  const port = parsePort(getEnvVar("PORT") || getEnvVar("API_PORT"));
  const corsOrigins = parseCorsOrigins(getEnvVar("API_GATEWAY_CORS_ORIGINS"));
  const contentProvider = parseContentProvider(
    getEnvVar("API_GATEWAY_CONTENT_PROVIDER") || DEFAULT_CONTENT_PROVIDER
  );

  return {
    nodeEnv,
    port,
    corsOrigins,
    integrations: {
      contentProvider,
      sanity: {
        projectId: resolveSanityProjectId(nodeEnv),
        dataset: resolveSanityDataset(nodeEnv),
        apiVersion: resolveSanityApiVersion(nodeEnv),
        readToken: getEnvVar("SANITY_API_READ_TOKEN") || undefined,
        useCdn: parseBoolean(getEnvVar("SANITY_USE_CDN"), true),
        requestTimeoutMs: parseInteger(
          getEnvVar("SANITY_REQUEST_TIMEOUT_MS"),
          DEFAULT_SANITY_REQUEST_TIMEOUT_MS,
          {
            min: 100,
            max: 60_000,
          }
        ),
        maxRetries: parseInteger(
          getEnvVar("SANITY_REQUEST_MAX_RETRIES"),
          DEFAULT_SANITY_REQUEST_MAX_RETRIES,
          {
            min: 0,
            max: 5,
          }
        ),
        retryDelayMs: parseInteger(
          getEnvVar("SANITY_REQUEST_RETRY_DELAY_MS"),
          DEFAULT_SANITY_REQUEST_RETRY_DELAY_MS,
          {
            min: 0,
            max: 10_000,
          }
        ),
      },
    },
  };
}
