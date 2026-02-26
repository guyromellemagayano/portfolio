/* eslint-disable react-refresh/only-export-components */

/**
 * @file apps/web/src/app/(blog)/articles/[slug]/page.tsx
 * @author Guy Romelle Magayano
 * @description Sanity-backed article detail page rendered through the API gateway.
 */

import { cache } from "react";

import { type Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import logger from "@portfolio/logger";

import { ArticleLayout } from "@web/components/layout";
import { PortableTextContent } from "@web/components/portable-text-content";
import { type ArticleDetail, getArticleBySlug } from "@web/utils/articles";
import { normalizeError } from "@web/utils/error";
import { toAbsoluteSiteUrl } from "@web/utils/site-url";

type ArticleDetailPageParams = {
  slug: string;
};

type ArticleDetailPageProps = {
  params: Promise<ArticleDetailPageParams>;
};

const getCachedArticleBySlug = cache(async (slug: string) =>
  getArticleBySlug(slug)
);
const SITE_NAME = "Guy Romelle Magayano";
const MAX_METADATA_DESCRIPTION_LENGTH = 160;
const DEFAULT_ARTICLE_IMAGE_WIDTH = 1600;
const DEFAULT_ARTICLE_IMAGE_HEIGHT = 900;
const DEFAULT_ARTICLE_IMAGE_SIZES = "(max-width: 1024px) 100vw, 896px";

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
function getArticleDescription(article: ArticleDetail): string {
  return clampMetadataDescription(
    article.seoDescription?.trim() ||
      article.description?.trim() ||
      article.title
  );
}

/** Resolves the best social description string for Open Graph and Twitter previews. */
function getArticleSocialDescription(article: ArticleDetail): string {
  return clampMetadataDescription(
    article.seoOgDescription?.trim() ||
      article.seoDescription?.trim() ||
      article.description?.trim() ||
      article.title
  );
}

/** Resolves the best title string for `<title>` metadata. */
function getArticleSeoTitle(article: ArticleDetail): string {
  return article.seoTitle?.trim() || article.title;
}

/** Resolves the best social preview title string. */
function getArticleSocialTitle(article: ArticleDetail): string {
  return (
    article.seoOgTitle?.trim() || article.seoTitle?.trim() || article.title
  );
}

type ArticleSocialImage = {
  alt?: string;
  height?: number;
  url: string;
  width?: number;
};

/** Resolves the best social image (SEO OG image override first, then lead image). */
function getArticleSocialImage(
  article: ArticleDetail
): ArticleSocialImage | null {
  const seoOgImage = getTrimmedNonEmptyString(article.seoOgImage);

  if (seoOgImage) {
    return {
      url: seoOgImage,
      alt: getTrimmedNonEmptyString(article.seoOgImageAlt) ?? article.title,
      width: getOptionalPositiveDimension(article.seoOgImageWidth),
      height: getOptionalPositiveDimension(article.seoOgImageHeight),
    };
  }

  const leadImage = getTrimmedNonEmptyString(article.image);

  if (!leadImage) {
    return null;
  }

  return {
    url: leadImage,
    alt: getTrimmedNonEmptyString(article.imageAlt) ?? article.title,
    width: getOptionalPositiveDimension(article.imageWidth),
    height: getOptionalPositiveDimension(article.imageHeight),
  };
}

/** Resolves the canonical metadata URL for an article, honoring an optional SEO override path. */
function getArticleCanonicalUrl(article: ArticleDetail): string | undefined {
  const fallbackPath = `/articles/${article.slug}`;
  const canonicalPath = getTrimmedNonEmptyString(article.seoCanonicalPath);

  return toAbsoluteSiteUrl(canonicalPath ?? fallbackPath);
}

/** Normalizes optional positive dimensions for safe image rendering. */
function getOptionalPositiveDimension(value: unknown): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return undefined;
  }

  return Math.round(value);
}

/** Resolves lead image dimensions with stable fallbacks to avoid layout shift. */
function getArticleLeadImageDimensions(article: ArticleDetail): {
  width: number;
  height: number;
} {
  const width = getOptionalPositiveDimension(article.imageWidth);
  const height = getOptionalPositiveDimension(article.imageHeight);

  return {
    width: width ?? DEFAULT_ARTICLE_IMAGE_WIDTH,
    height: height ?? DEFAULT_ARTICLE_IMAGE_HEIGHT,
  };
}

/** Renders the optional article lead image. */
function renderArticleLeadImage(article: ArticleDetail) {
  if (!article.image || article.image.trim().length === 0) {
    return null;
  }

  const dimensions = getArticleLeadImageDimensions(article);

  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-zinc-200/60 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
      <Image
        src={article.image}
        alt={article.imageAlt?.trim() || article.title}
        className="h-auto w-full object-cover"
        width={dimensions.width}
        height={dimensions.height}
        sizes={DEFAULT_ARTICLE_IMAGE_SIZES}
        loading="lazy"
      />
    </figure>
  );
}

/** Resolves the route params and returns the normalized article detail payload. */
async function resolveArticleFromParams(
  params: Promise<ArticleDetailPageParams>
): Promise<ArticleDetail | null> {
  const { slug } = await params;
  const normalizedSlug = slug.trim();

  if (!normalizedSlug) {
    return null;
  }

  return getCachedArticleBySlug(normalizedSlug);
}

/** Generates metadata for the article detail page from gateway-backed article content. */
export async function generateMetadata(
  props: ArticleDetailPageProps
): Promise<Metadata> {
  try {
    const article = await resolveArticleFromParams(props.params);

    if (!article) {
      return {
        title: "Article Not Found - Guy Romelle Magayano",
        description: "The requested article could not be found.",
      };
    }

    const pageTitle = getArticleSeoTitle(article);
    const description = getArticleDescription(article);
    const socialTitle = getArticleSocialTitle(article);
    const socialDescription = getArticleSocialDescription(article);
    const socialImage = getArticleSocialImage(article);
    const canonicalUrl = getArticleCanonicalUrl(article);
    const articleUrl =
      canonicalUrl ?? toAbsoluteSiteUrl(`/articles/${article.slug}`);
    const twitterCard =
      article.seoTwitterCard ??
      (socialImage ? "summary_large_image" : "summary");

    return {
      title: `${pageTitle} - ${SITE_NAME}`,
      description,
      alternates: canonicalUrl
        ? {
            canonical: canonicalUrl,
          }
        : undefined,
      robots: {
        index: article.seoNoIndex === true ? false : true,
        follow: article.seoNoFollow === true ? false : true,
      },
      openGraph: {
        type: "article",
        title: socialTitle,
        description: socialDescription,
        url: articleUrl,
        publishedTime: article.date,
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
    logger.error(
      "Article detail metadata generation failed",
      normalizeError(error),
      {
        component: "web.app.article-detail.metadata",
        operation: "generateMetadata",
      }
    );

    return {
      title: `Article - ${SITE_NAME}`,
      description: "Article detail page.",
    };
  }
}

export const dynamic = "force-dynamic";

/** Renders the article detail route using the API gateway article detail endpoint. */
export default async function ArticleDetailPage(props: ArticleDetailPageProps) {
  const article = await resolveArticleFromParams(props.params).catch(
    (error) => {
      logger.error(
        "Article detail page failed to load article",
        normalizeError(error),
        {
          component: "web.app.article-detail.page",
          operation: "getArticleBySlug",
        }
      );

      throw error;
    }
  );

  if (!article) {
    notFound();
  }

  return (
    <ArticleLayout article={article}>
      {renderArticleLeadImage(article)}
      <PortableTextContent
        value={article.body}
        fallbackImageAlt={article.title}
      />
    </ArticleLayout>
  );
}
