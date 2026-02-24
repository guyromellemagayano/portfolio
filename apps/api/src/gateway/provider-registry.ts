/**
 * @file apps/api/src/gateway/provider-registry.ts
 * @author Guy Romelle Magayano
 * @description Provider registry for resolving gateway integrations.
 */

import type { ILogger } from "@portfolio/logger";

import type { ApiRuntimeConfig } from "@api/config/env";
import type { ContentProvider } from "@api/providers/content/content.provider";
import { createSanityContentProvider } from "@api/providers/content/sanity-content.provider";
import { createStaticContentProvider } from "@api/providers/content/static-content.provider";

export type ProviderRegistry = {
  content: ContentProvider;
};

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
