/**
 * @file apps/web/src/sanity/client.ts
 * @author Guy Romelle Magayano
 * @description Sanity client utilities for Studio and Draft Mode integration.
 */

import { createClient } from "next-sanity";

import { getSanityConfig as getConfig } from "@web/sanity/env";

/** Returns the Sanity configuration from environment variables. */
export function getSanityConfig() {
  return getConfig();
}

/** Returns `true` when required Sanity configuration exists. */
export function hasSanityConfig(): boolean {
  return getSanityConfig() !== null;
}

function createSanityClient() {
  const config = getSanityConfig();

  if (!config) {
    throw new Error(
      "Sanity configuration is missing. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET."
    );
  }

  return createClient({
    projectId: config.projectId,
    dataset: config.dataset,
    apiVersion: config.apiVersion,
    useCdn: true,
  });
}

export function getSanityClient() {
  return createSanityClient();
}
