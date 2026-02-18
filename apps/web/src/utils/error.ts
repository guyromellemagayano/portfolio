/**
 * @file error.ts
 * @author Guy Romelle Magayano
 * @description Utility functions for error handling.
 */

import { getTranslations } from "next-intl/server";

import logger from "@portfolio/logger";

/** Utility for normalizing unknown errors to a standard error format. */
export function normalizeError(err: unknown): Error {
  if (err instanceof Error) {
    return err;
  }

  return new Error(String(err));
}

/**
 * Safely retrieves a hero message (title, subheading, or description) for a given namespace. Falls back to a provided value if translation fails or is missing, and logs translation errors.
 */
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
