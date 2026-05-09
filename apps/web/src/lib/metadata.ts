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

type MetadataCandidate = string | null | undefined;
type MetadataRobots = NonNullable<WebPageMetadata["robots"]>;
type OpenGraphImages = NonNullable<
  NonNullable<WebPageMetadata["openGraph"]>["images"]
>;
type MetadataBuildInput = {
  canonicalPathOrUrl: string;
  description: string;
  openGraphImages?: OpenGraphImages;
  openGraphPublishedTime?: string;
  openGraphType?: "article" | "website";
  robots?: MetadataRobots;
  structuredData?: WebPageMetadata["structuredData"];
  title: WebPageMetadata["title"];
  twitterCard?: string;
  twitterImages?: string[];
};

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

/** Formats a resolved metadata title into the final plain-text title shown in the document head. */
export function formatResolvedMetadataTitle(
  titleValue?: WebPageMetadata["title"]
): string {
  if (typeof titleValue === "string") {
    return `${titleValue} | ${SITE_NAME}`;
  }

  return titleValue?.absolute || titleValue?.default || SITE_NAME;
}

/** Resolves the first non-empty metadata description candidate. */
export function resolveMetadataDescription(
  ...candidates: MetadataCandidate[]
): string {
  for (const candidate of candidates) {
    const normalizedCandidate = candidate?.trim();

    if (normalizedCandidate) {
      return normalizedCandidate;
    }
  }

  return SITE_NAME;
}

/** Clamps a metadata description to a crawl-friendly length without breaking its suffix. */
export function clampMetadataDescription(
  value: string,
  maxLength = 160
): string {
  const normalizedValue = value.trim();

  if (normalizedValue.length <= maxLength) {
    return normalizedValue;
  }

  return `${normalizedValue.slice(0, maxLength - 1).trimEnd()}…`;
}

/** Builds a route metadata record with consistent canonical, title, and social metadata. */
export function buildPageMetadata(input: MetadataBuildInput): WebPageMetadata {
  const titleText = formatResolvedMetadataTitle(input.title);
  const description = input.description.trim();
  const canonicalUrl = toAbsoluteSiteUrl(input.canonicalPathOrUrl);

  if (!titleText) {
    throw new Error("Expected a non-empty metadata title.");
  }

  if (!description) {
    throw new Error("Expected a non-empty metadata description.");
  }

  if (!canonicalUrl) {
    throw new Error(
      `Expected a valid metadata canonical path or URL, received "${input.canonicalPathOrUrl}".`
    );
  }

  return {
    title: input.title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: input.robots ?? {
      index: true,
      follow: true,
    },
    openGraph: {
      type: input.openGraphType ?? "website",
      title: titleText,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      publishedTime: input.openGraphPublishedTime,
      images: input.openGraphImages,
    },
    twitter: {
      card: input.twitterCard ?? DEFAULT_TWITTER_CARD,
      title: titleText,
      description,
      images: input.twitterImages,
    },
    structuredData: input.structuredData,
  };
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
