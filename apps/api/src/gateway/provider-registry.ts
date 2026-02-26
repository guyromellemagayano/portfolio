/**
 * @file apps/api/src/gateway/provider-registry.ts
 * @author Guy Romelle Magayano
 * @description Provider registry for resolving gateway integrations.
 */

import type { ILogger } from "@portfolio/logger";

import type { ApiRuntimeConfig } from "../config/env.js";
import type { ContentProvider } from "../providers/content/content.provider.js";
import { createSanityContentProvider } from "../providers/content/sanity-content.provider.js";
import { createStaticContentProvider } from "../providers/content/static-content.provider.js";

export type ProviderRegistry = {
  content: ContentProvider;
};

/** Resolves the configured content provider and applies non-production fallback behavior when Sanity is unavailable. */
function resolveContentProvider(
  config: ApiRuntimeConfig,
  logger: ILogger
): ContentProvider {
  const requestedProvider = config.integrations.contentProvider;

  if (requestedProvider === "static") {
    logger.info("Using static content provider", {
      provider: "static",
    });

    return createStaticContentProvider();
  }

  const sanityConfig = config.integrations.sanity;

  if (!sanityConfig.projectId || !sanityConfig.dataset) {
    if (config.nodeEnv === "production") {
      throw new Error(
        "Sanity content provider is configured but SANITY_PROJECT_ID/SANITY_DATASET are missing in production."
      );
    }

    logger.warn(
      "Sanity provider requested but SANITY_PROJECT_ID/SANITY_DATASET are missing. Falling back to static provider.",
      {
        provider: "sanity",
      }
    );

    return createStaticContentProvider();
  }

  logger.info("Using Sanity content provider", {
    provider: "sanity",
    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,
    apiVersion: sanityConfig.apiVersion,
  });

  return createSanityContentProvider(
    {
      projectId: sanityConfig.projectId,
      dataset: sanityConfig.dataset,
      apiVersion: sanityConfig.apiVersion,
      readToken: sanityConfig.readToken,
      useCdn: sanityConfig.useCdn,
      requestTimeoutMs: sanityConfig.requestTimeoutMs,
      maxRetries: sanityConfig.maxRetries,
      retryDelayMs: sanityConfig.retryDelayMs,
    },
    logger
  );
}

/** Builds the provider registry consumed by feature modules. */
export function createProviderRegistry(
  config: ApiRuntimeConfig,
  logger: ILogger
): ProviderRegistry {
  return {
    content: resolveContentProvider(config, logger),
  };
}
