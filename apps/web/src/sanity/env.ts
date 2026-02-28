/* global process */

/**
 * @file apps/web/src/sanity/env.ts
 * @author Guy Romelle Magayano
 * @description Environment helpers for Sanity project configuration.
 */

const DEFAULT_SANITY_API_VERSION = "2025-02-19";
const SANITY_CONFIG_MISSING_ERROR =
  "Sanity configuration is missing. Set SANITY_STUDIO_PROJECT_ID/SANITY_STUDIO_DATASET, NEXT_PUBLIC_SANITY_PROJECT_ID/NEXT_PUBLIC_SANITY_DATASET, or SANITY_PROJECT_ID/SANITY_DATASET.";
const SANITY_STUDIO_CONFIG_MISSING_ERROR =
  "Sanity Studio configuration is missing. Set SANITY_STUDIO_PROJECT_ID/SANITY_STUDIO_DATASET, SANITY_STUDIO_API_PROJECT_ID/SANITY_STUDIO_API_DATASET, NEXT_PUBLIC_SANITY_PROJECT_ID/NEXT_PUBLIC_SANITY_DATASET, or SANITY_PROJECT_ID/SANITY_DATASET.";

export type SanityConfig = {
  projectId: string;
  dataset: string;
  apiVersion: string;
  token?: string;
};

function getServerSanityEnvVar(key: string): string {
  return process.env[key]?.trim() ?? "";
}

function getStudioSanityProjectId(): string {
  return getServerSanityEnvVar("SANITY_STUDIO_PROJECT_ID");
}

function getStudioSanityApiProjectId(): string {
  return getServerSanityEnvVar("SANITY_STUDIO_API_PROJECT_ID");
}

function getStudioSanityDataset(): string {
  return getServerSanityEnvVar("SANITY_STUDIO_DATASET");
}

function getStudioSanityApiDataset(): string {
  return getServerSanityEnvVar("SANITY_STUDIO_API_DATASET");
}

function getStudioSanityApiVersion(): string {
  return getServerSanityEnvVar("SANITY_STUDIO_API_VERSION");
}

function getPublicSanityProjectId(): string {
  return getServerSanityEnvVar("NEXT_PUBLIC_SANITY_PROJECT_ID");
}

function getPublicSanityDataset(): string {
  return getServerSanityEnvVar("NEXT_PUBLIC_SANITY_DATASET");
}

function getPublicSanityApiVersion(): string {
  return getServerSanityEnvVar("NEXT_PUBLIC_SANITY_API_VERSION");
}

/** Reads and normalizes the Sanity runtime configuration used by the web app. */
export function getSanityConfig(): SanityConfig | null {
  const projectId =
    getStudioSanityProjectId() ||
    getStudioSanityApiProjectId() ||
    getPublicSanityProjectId() ||
    getServerSanityEnvVar("SANITY_PROJECT_ID");
  const dataset =
    getStudioSanityDataset() ||
    getStudioSanityApiDataset() ||
    getPublicSanityDataset() ||
    getServerSanityEnvVar("SANITY_DATASET");
  const apiVersion =
    getStudioSanityApiVersion() ||
    getPublicSanityApiVersion() ||
    getServerSanityEnvVar("SANITY_API_VERSION") ||
    DEFAULT_SANITY_API_VERSION;
  const token = getServerSanityEnvVar("SANITY_API_READ_TOKEN");

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

/** Returns the resolved Studio Sanity configuration when env variables are available. */
export function getSanityStudioConfig(): SanityConfig | null {
  const projectId =
    getStudioSanityProjectId() ||
    getStudioSanityApiProjectId() ||
    getPublicSanityProjectId() ||
    getServerSanityEnvVar("SANITY_PROJECT_ID");
  const dataset =
    getStudioSanityDataset() ||
    getStudioSanityApiDataset() ||
    getPublicSanityDataset() ||
    getServerSanityEnvVar("SANITY_DATASET");
  const apiVersion =
    getStudioSanityApiVersion() ||
    getPublicSanityApiVersion() ||
    getServerSanityEnvVar("SANITY_API_VERSION") ||
    DEFAULT_SANITY_API_VERSION;
  const token = getServerSanityEnvVar("SANITY_API_READ_TOKEN");

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
  const webhookSecret = getServerSanityEnvVar("SANITY_WEBHOOK_SECRET");

  return webhookSecret || undefined;
}

/** Returns the required Sanity config or throws when required identifiers are missing. */
export function requireSanityConfig(): SanityConfig {
  const config = getSanityConfig();

  if (!config) {
    throw new Error(SANITY_CONFIG_MISSING_ERROR);
  }

  return config;
}

/** Returns required Studio config or throws when project/dataset identifiers are missing. */
export function requireSanityStudioConfig(): SanityConfig {
  const config = getSanityStudioConfig();

  if (!config) {
    throw new Error(SANITY_STUDIO_CONFIG_MISSING_ERROR);
  }

  return config;
}
