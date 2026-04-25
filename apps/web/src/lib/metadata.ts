/**
 * @file apps/web/src/_lib/metadata.ts
 * @author Guy Romelle Magayano
 * @description Shared metadata title normalization helpers for brochure and content routes.
 */

import type { WebPageMetadata } from "@web/lib/metadata.types";

export const SITE_NAME = "Guy Romelle Magayano";

const SITE_TITLE_SUFFIX_PATTERN = new RegExp(
  `\\s*(?:\\||-|–|—)\\s*${SITE_NAME.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
  "iu"
);

/** Removes a duplicated site-name suffix from content-managed metadata titles. */
export function normalizeMetadataTitle(value?: string): string | undefined {
  const normalizedValue = value?.trim();

  if (!normalizedValue) {
    return undefined;
  }

  const withoutSiteName = normalizedValue.replace(
    SITE_TITLE_SUFFIX_PATTERN,
    ""
  );
  const normalizedTitle = withoutSiteName.trim();

  return normalizedTitle || SITE_NAME;
}

/** Resolves a route title that cooperates with the root layout title template. */
export function resolveMetadataTitle(
  primaryValue?: string,
  fallbackValue?: string
): WebPageMetadata["title"] {
  const normalizedTitle =
    normalizeMetadataTitle(primaryValue) ??
    normalizeMetadataTitle(fallbackValue) ??
    SITE_NAME;

  if (normalizedTitle === SITE_NAME) {
    return {
      absolute: SITE_NAME,
    };
  }

  return normalizedTitle;
}

/** Resolves a plain text title for social metadata fields. */
export function resolveMetadataTitleText(
  primaryValue?: string,
  fallbackValue?: string
): string {
  return (
    normalizeMetadataTitle(primaryValue) ??
    normalizeMetadataTitle(fallbackValue) ??
    SITE_NAME
  );
}
