/**
 * @file apps/web/src/_lib/metadata.ts
 * @author Guy Romelle Magayano
 * @description Shared metadata title normalization helpers for brochure and content routes.
 */

import { type WebPageMetadata } from "@web/lib/metadata.types";
import { toAbsoluteSiteUrl } from "@web/utils/site-url";

export const SITE_NAME = "Guy Romelle Magayano";
export const DEFAULT_SOCIAL_IMAGE_PATH = "/og-image.png";
export const DEFAULT_SOCIAL_IMAGE_ALT =
  "Guy Romelle Magayano - product engineering consultant portfolio";
export const DEFAULT_SOCIAL_IMAGE_WIDTH = 1200;
export const DEFAULT_SOCIAL_IMAGE_HEIGHT = 630;
export const DEFAULT_TWITTER_CARD = "summary_large_image";

const SITE_TITLE_SUFFIX_PATTERN = new RegExp(
  `\\s*(?:\\||-|–|—)\\s*${SITE_NAME.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
  "iu"
);

type SocialImageInput = {
  alt?: string;
  height?: number;
  pathOrUrl?: string;
  width?: number;
};

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

/** Builds a default Open Graph image array for page metadata. */
export function buildOpenGraphImages(input: SocialImageInput = {}) {
  const imageUrl = toAbsoluteSiteUrl(
    input.pathOrUrl ?? DEFAULT_SOCIAL_IMAGE_PATH
  );

  if (!imageUrl) {
    return [];
  }

  return [
    {
      alt: input.alt ?? DEFAULT_SOCIAL_IMAGE_ALT,
      height: input.height ?? DEFAULT_SOCIAL_IMAGE_HEIGHT,
      url: imageUrl,
      width: input.width ?? DEFAULT_SOCIAL_IMAGE_WIDTH,
    },
  ];
}

/** Builds a default Twitter/X image array for page metadata. */
export function buildTwitterImages(
  input: Pick<SocialImageInput, "pathOrUrl"> = {}
) {
  const imageUrl = toAbsoluteSiteUrl(
    input.pathOrUrl ?? DEFAULT_SOCIAL_IMAGE_PATH
  );

  return imageUrl ? [imageUrl] : [];
}
