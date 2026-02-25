/**
 * @file apps/web/src/sanity/env.ts
 * @author Guy Romelle Magayano
 * @description Environment helpers for Sanity project configuration.
 */

const DEFAULT_SANITY_API_VERSION = "2025-02-19";

export type SanityConfig = {
  projectId: string;
  dataset: string;
  apiVersion: string;
  token?: string;
};

function getSanityEnvVar(key: string): string {
  return globalThis?.process?.env?.[key]?.trim() ?? "";
}

/** Reads and normalizes the Sanity runtime configuration used by the web app. */
export function getSanityConfig(): SanityConfig | null {
  const projectId = getSanityEnvVar("NEXT_PUBLIC_SANITY_PROJECT_ID");
  const dataset = getSanityEnvVar("NEXT_PUBLIC_SANITY_DATASET");
  const apiVersion =
    getSanityEnvVar("NEXT_PUBLIC_SANITY_API_VERSION") ||
    DEFAULT_SANITY_API_VERSION;
  const token = getSanityEnvVar("SANITY_API_READ_TOKEN");

  if (!projectId || !dataset) {
    return null;
  }

  return {
    projectId,
    dataset,
    apiVersion,
    token: token || undefined,
  };
}

/** Indicates whether the web app has the minimum Sanity config required for runtime features. */
export function hasSanityConfig(): boolean {
  return getSanityConfig() !== null;
}

/** Returns the optional Sanity read token from the resolved config. */
export function getSanityReadToken(): string | undefined {
  return getSanityConfig()?.token;
}

/** Returns the shared secret used to authorize Sanity webhook revalidation requests. */
export function getSanityWebhookSecret(): string | undefined {
  const webhookSecret = getSanityEnvVar("SANITY_WEBHOOK_SECRET");

  return webhookSecret || undefined;
}

/** Returns the required Sanity config or throws when required identifiers are missing. */
export function requireSanityConfig(): SanityConfig {
  const config = getSanityConfig();

  if (!config) {
    throw new Error(
      "Sanity configuration is missing. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET."
    );
  }

  return config;
}
