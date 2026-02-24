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
import { getArticleBySlug, type ArticleDetail } from "@web/utils/articles";
import { normalizeError } from "@web/utils/error";

type ArticleDetailPageParams = {
  slug: string;
};

type ArticleDetailPageProps = {
  params: Promise<ArticleDetailPageParams>;
};

const getCachedArticleBySlug = cache(async (slug: string) =>
  getArticleBySlug(slug)
);
const DEFAULT_ARTICLE_IMAGE_WIDTH = 1600;
const DEFAULT_ARTICLE_IMAGE_HEIGHT = 900;
const DEFAULT_ARTICLE_IMAGE_SIZES = "(max-width: 1024px) 100vw, 896px";

function getArticleDescription(article: ArticleDetail): string {
  return (
    article.seoDescription?.trim() ||
    article.description?.trim() ||
    article.title
  );
}

function getOptionalPositiveDimension(value: unknown): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return undefined;
  }

  return Math.round(value);
}

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

    const description = getArticleDescription(article);

    return {
      title: `${article.title} - Guy Romelle Magayano`,
      description,
      openGraph: {
        title: article.title,
        description,
        images: article.image
          ? [{ url: article.image, alt: article.imageAlt }]
          : undefined,
      },
      twitter: {
        card: article.image ? "summary_large_image" : "summary",
        title: article.title,
        description,
        images: article.image ? [article.image] : undefined,
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
      title: "Article - Guy Romelle Magayano",
      description: "Article detail page.",
    };
  }
}

export const dynamic = "force-dynamic";

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
