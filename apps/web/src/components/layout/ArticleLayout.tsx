/**
 * @file apps/web/src/components/layout/ArticleLayout.tsx
 * @author Guy Romelle Magayano
 * @description Server-safe article layout component for standalone article routes.
 */

import { type ComponentPropsWithoutRef } from "react";

import Link from "next/link";

import { Container } from "@web/components/container";
import { Prose } from "@web/components/prose";
import { type CommonLayoutComponentData } from "@web/data/page";
import { type ArticleWithSlug } from "@web/utils/articles";
import { setCustomDateFormat } from "@web/utils/datetime";
import { cn } from "@web/utils/helpers";

import { type LayoutProps } from "./Layout";

export type ArticleLayoutElementType = typeof Container;
export type ArticleLayoutProps<P extends Record<string, unknown> = {}> = Omit<
  LayoutProps<P>,
  "as"
> &
  P &
  CommonLayoutComponentData & {
    as?: ArticleLayoutElementType;
    article?: ArticleWithSlug;
  };

/** Normalizes a stable DOM id from the article slug. */
function getArticleDomId(slug: string, suffix: string): string {
  const normalizedSlug = slug.trim().replace(/[^a-zA-Z0-9-]+/g, "-");

  return `${normalizedSlug}-${suffix}`;
}

/** Renders the standalone article page frame with static brochure styling. */
export function ArticleLayout<P extends Record<string, unknown> = {}>(
  props: ArticleLayoutProps<P>
) {
  const {
    as: Component = Container,
    article,
    children,
    className,
    // eslint-disable-next-line unused-imports/no-unused-vars
    searchParams,
    ...rest
  } = props;

  if (!article || !children) return null;

  const articleData = {
    title: article.title.trim(),
    date: article.date.trim(),
    slug: article.slug.trim(),
  };

  if (
    articleData.slug.length === 0 ||
    (articleData.title.length === 0 && articleData.date.length === 0)
  ) {
    return null;
  }

  const formattedDate = setCustomDateFormat(articleData.date);
  const articleTitleId = getArticleDomId(articleData.slug, "title");
  const articleDateId = getArticleDomId(articleData.slug, "date");

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<ArticleLayoutElementType>)}
      className={cn("pt-16 sm:pt-24", className)}
    >
      <div className="border-b border-zinc-950/10 pb-10 sm:pb-14">
        <Link
          href="/articles"
          className="inline-flex text-sm font-medium text-zinc-950 underline decoration-zinc-300 underline-offset-4"
        >
          Back to articles
        </Link>

        <article
          role="article"
          aria-labelledby={articleTitleId}
          aria-describedby={articleDateId}
          className="mt-8 max-w-3xl"
        >
          <time
            id={articleDateId}
            className="text-sm text-zinc-500"
            dateTime={articleData.date}
            aria-label={`Published on ${formattedDate}`}
          >
            {formattedDate}
          </time>
          <h1
            id={articleTitleId}
            className="mt-4 text-4xl font-medium tracking-tight text-zinc-950 sm:text-6xl"
          >
            {articleData.title}
          </h1>
        </article>
      </div>

      <Prose role="region" className="mt-10 max-w-3xl">
        {children}
      </Prose>
    </Component>
  );
}

ArticleLayout.displayName = "ArticleLayout";
