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

function getPublicSanityProjectId(): string {
  // eslint-disable-next-line no-undef -- Next.js inlines NEXT_PUBLIC_* in client bundles only with direct process.env access
  return process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ?? "";
}

function getPublicSanityDataset(): string {
  // eslint-disable-next-line no-undef -- Next.js inlines NEXT_PUBLIC_* in client bundles only with direct process.env access
  return process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() ?? "";
}

function getPublicSanityApiVersion(): string {
  // eslint-disable-next-line no-undef -- Next.js inlines NEXT_PUBLIC_* in client bundles only with direct process.env access
  return process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() ?? "";
}

/** Reads and normalizes the Sanity runtime configuration used by the web app. */
export function getSanityConfig(): SanityConfig | null {
  const projectId = getPublicSanityProjectId();
  const dataset = getPublicSanityDataset();
  const apiVersion = getPublicSanityApiVersion() || DEFAULT_SANITY_API_VERSION;
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
