/* eslint-disable react-refresh/only-export-components */

/**
 * @file apps/web/src/app/(blog)/[slug]/page.tsx
 * @author Guy Romelle Magayano
 * @description Sanity-backed standalone page route rendered through the API gateway.
 */

import { cache } from "react";

import { type Metadata } from "next";
import { notFound } from "next/navigation";

import logger from "@portfolio/logger";

import { SimpleLayout } from "@web/components/layout";
import { PortableTextContent } from "@web/components/portable-text-content";
import { Prose } from "@web/components/prose";
import { normalizeError } from "@web/utils/error";
import { type CmsPageDetail, getPageBySlug } from "@web/utils/pages";
import { toAbsoluteSiteUrl } from "@web/utils/site-url";

type CmsPageRouteParams = {
  slug: string;
};

type CmsPageRouteProps = {
  params: Promise<CmsPageRouteParams>;
};

const getCachedPageBySlug = cache(async (slug: string) => getPageBySlug(slug));

const SITE_NAME = "Guy Romelle Magayano";
const MAX_METADATA_DESCRIPTION_LENGTH = 160;

/** Normalizes optional text values into trimmed non-empty strings. */
function getTrimmedNonEmptyString(
  value: string | undefined
): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.trim();

  return normalized.length > 0 ? normalized : undefined;
}

/** Clamps metadata descriptions to a SERP-friendly maximum length. */
function clampMetadataDescription(value: string): string {
  const normalized = value.trim();

  if (normalized.length <= MAX_METADATA_DESCRIPTION_LENGTH) {
    return normalized;
  }

  return `${normalized.slice(0, MAX_METADATA_DESCRIPTION_LENGTH - 1).trimEnd()}…`;
}

/** Resolves the best description string for metadata and social previews. */
function getPageDescription(page: CmsPageDetail): string {
  return clampMetadataDescription(
    page.seoDescription?.trim() || page.intro?.trim() || page.title
  );
}

/** Resolves the best social description string for Open Graph and Twitter previews. */
function getPageSocialDescription(page: CmsPageDetail): string {
  return clampMetadataDescription(
    page.seoOgDescription?.trim() ||
      page.seoDescription?.trim() ||
      page.intro?.trim() ||
      page.title
  );
}

/** Resolves the best title string for `<title>` metadata. */
function getPageSeoTitle(page: CmsPageDetail): string {
  return page.seoTitle?.trim() || page.title;
}

/** Resolves the best social preview title string. */
function getPageSocialTitle(page: CmsPageDetail): string {
  return page.seoOgTitle?.trim() || page.seoTitle?.trim() || page.title;
}

/** Normalizes optional positive dimensions for safe image metadata rendering. */
function getOptionalPositiveDimension(value: unknown): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return undefined;
  }

  return Math.round(value);
}

type PageSocialImage = {
  alt?: string;
  height?: number;
  url: string;
  width?: number;
};

/** Resolves the best page social image from the optional SEO Open Graph image override. */
function getPageSocialImage(page: CmsPageDetail): PageSocialImage | null {
  const seoOgImage = getTrimmedNonEmptyString(page.seoOgImage);

  if (!seoOgImage) {
    return null;
  }

  return {
    url: seoOgImage,
    alt: getTrimmedNonEmptyString(page.seoOgImageAlt) ?? page.title,
    width: getOptionalPositiveDimension(page.seoOgImageWidth),
    height: getOptionalPositiveDimension(page.seoOgImageHeight),
  };
}

/** Resolves the canonical metadata URL for a page, honoring an optional SEO override path. */
function getPageCanonicalUrl(page: CmsPageDetail): string | undefined {
  const fallbackPath = `/${page.slug}`;
  const canonicalPath = getTrimmedNonEmptyString(page.seoCanonicalPath);

  return toAbsoluteSiteUrl(canonicalPath ?? fallbackPath);
}

/** Resolves the route params and returns the normalized CMS page payload. */
async function resolvePageFromParams(
  params: Promise<CmsPageRouteParams>
): Promise<CmsPageDetail | null> {
  const { slug } = await params;
  const normalizedSlug = slug.trim();

  if (!normalizedSlug) {
    return null;
  }

  return getCachedPageBySlug(normalizedSlug);
}

/** Generates metadata for standalone CMS pages from gateway-backed Sanity content. */
export async function generateMetadata(
  props: CmsPageRouteProps
): Promise<Metadata> {
  try {
    const page = await resolvePageFromParams(props.params);

    if (!page) {
      return {
        title: "Page Not Found - Guy Romelle Magayano",
        description: "The requested page could not be found.",
      };
    }

    const pageTitle = getPageSeoTitle(page);
    const description = getPageDescription(page);
    const socialTitle = getPageSocialTitle(page);
    const socialDescription = getPageSocialDescription(page);
    const socialImage = getPageSocialImage(page);
    const canonicalUrl = getPageCanonicalUrl(page);
    const pageUrl = canonicalUrl ?? toAbsoluteSiteUrl(`/${page.slug}`);
    const twitterCard =
      page.seoTwitterCard ?? (socialImage ? "summary_large_image" : "summary");

    return {
      title: `${pageTitle} - ${SITE_NAME}`,
      description,
      alternates: canonicalUrl
        ? {
            canonical: canonicalUrl,
          }
        : undefined,
      robots: {
        index: page.seoNoIndex === true ? false : true,
        follow: page.seoNoFollow === true ? false : true,
      },
      openGraph: {
        type: "website",
        title: socialTitle,
        description: socialDescription,
        url: pageUrl,
        images: socialImage
          ? [
              {
                url: socialImage.url,
                alt: socialImage.alt,
                width: socialImage.width,
                height: socialImage.height,
              },
            ]
          : undefined,
      },
      twitter: {
        card: twitterCard,
        title: socialTitle,
        description: socialDescription,
        images: socialImage ? [socialImage.url] : undefined,
      },
    };
  } catch (error) {
    logger.error("CMS page metadata generation failed", normalizeError(error), {
      component: "web.app.cms-page.metadata",
      operation: "generateMetadata",
    });

    return {
      title: `Page - ${SITE_NAME}`,
      description: "Standalone page.",
    };
  }
}

export const dynamic = "force-dynamic";

/** Renders a standalone CMS page route using the API gateway page detail endpoint. */
export default async function CmsPageRoute(props: CmsPageRouteProps) {
  const page = await resolvePageFromParams(props.params).catch((error) => {
    logger.error("CMS page route failed to load page", normalizeError(error), {
      component: "web.app.cms-page.page",
      operation: "getPageBySlug",
    });

    throw error;
  });

  if (!page) {
    notFound();
  }

  return (
    <SimpleLayout
      className="mt-16 sm:mt-32"
      subheading={page.subheading}
      title={page.title}
      intro={page.intro}
    >
      {page.body.length > 0 ? (
        <Prose
          role="region"
          aria-label={`${page.title} content`}
          className="mt-8"
        >
          <PortableTextContent
            value={page.body}
            fallbackImageAlt={page.title}
          />
        </Prose>
      ) : null}
    </SimpleLayout>
  );
}
