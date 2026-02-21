/**
 * @file apps/web/src/utils/error.ts
 * @author Guy Romelle Magayano
 * @description Error normalization and safe translation fallback utilities.
 */

import { getTranslations } from "next-intl/server";

import logger from "@portfolio/logger";

type NormalizedError = Error & {
  digest?: string;
  isDynamicServerUsage?: boolean;
};

/** Utility for normalizing unknown errors to a standard error format. */
export function normalizeError(err: unknown): NormalizedError {
  const normalizedError: NormalizedError =
    err instanceof Error ? (err as NormalizedError) : new Error(String(err));

  const digest =
    typeof err === "object" &&
    err !== null &&
    "digest" in err &&
    typeof err.digest === "string"
      ? err.digest
      : normalizedError.digest;

  if (digest) {
    normalizedError.digest = digest;
  }

  normalizedError.isDynamicServerUsage =
    normalizedError.digest === "DYNAMIC_SERVER_USAGE" ||
    normalizedError.message.includes("Dynamic server usage");

  return normalizedError;
}

/** Safely resolves hero translation messages and falls back when translation fails. */
export function getSafeHeroMessages(
  namespace: string,
  translate: Awaited<ReturnType<typeof getTranslations>>,
  key: "subheading" | "title" | "description",
  fallbackVal: string | undefined
): string | undefined {
  try {
    const translatedMessage = translate(key);
    return translatedMessage?.trim() ? translatedMessage : fallbackVal;
  } catch (error) {
    logger.error(
      "Hero translation key resolution failed",
      normalizeError(error),
      {
        component: "web.utils.error",
        operation: "getSafeHeroMessages",
        metadata: {
          namespace,
          key,
        },
      }
    );

    return fallbackVal;
  }
}
