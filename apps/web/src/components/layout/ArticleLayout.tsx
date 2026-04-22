/**
 * @file apps/web/src/components/layout/ArticleLayout.tsx
 * @author Guy Romelle Magayano
 * @description Client-only article layout component with back navigation.
 */

"use client";

import { type ComponentPropsWithoutRef, useId } from "react";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { Button } from "@web/components/button";
import { Container } from "@web/components/container";
import { Icon } from "@web/components/icon";
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

  const router = useRouter();
  const articleLayoutI18n = useTranslations("components.layout");
  const articleLayoutI18N = {
    goBackToArticles: articleLayoutI18n("labels.goBackToArticles"),
    articleDate: articleLayoutI18n("labels.articleDate"),
  };
  const baseId = useId().replace(/:/g, "");
  const articleTitleId = `${baseId}-article-title`;
  const articleDateId = `${baseId}-article-date`;

  if (!article || !children) return null;

  const articleData = {
    title: article.title.trim(),
    date: article.date.trim(),
  };

  if (articleData.title.length === 0 && articleData.date.length === 0) {
    return null;
  }

  const formattedDate = setCustomDateFormat(articleData.date);

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<ArticleLayoutElementType>)}
      role="main"
      className={cn("mt-16 lg:mt-32", className)}
    >
      <div role="region" className="xl:relative">
        <div
          role="region"
          className="relative isolate mx-auto grid max-w-xl grid-cols-1 gap-y-10 lg:max-w-none lg:grid-cols-2"
        >
          <div className="flex flex-col gap-4">
            <span className="my-6">
              <Button
                type="button"
                onClick={() => router.back()}
                aria-label={articleLayoutI18N.goBackToArticles}
                className="group my-3"
              >
                <Icon
                  name="arrow-left"
                  className="h-4 w-4 stroke-zinc-50 dark:stroke-zinc-900"
                  aria-hidden
                />
                <span className="text-sm">
                  {articleLayoutI18N.goBackToArticles}
                </span>
              </Button>
            </span>

            {article ? (
              <article
                role="article"
                aria-labelledby={articleTitleId}
                aria-describedby={articleDateId}
              >
                <header className="flex flex-col">
                  <h1
                    id={articleTitleId}
                    className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
                  >
                    {articleData.title}
                  </h1>

                  <time
                    id={articleDateId}
                    className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                    dateTime={articleData.date}
                    aria-label={`${articleLayoutI18N.articleDate} ${formattedDate}`}
                  >
                    <span
                      className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                      aria-hidden="true"
                    />
                    <span className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500">
                      {formattedDate}
                    </span>
                  </time>
                </header>

                <Prose role="region" className="mx-auto max-w-2xl">
                  {children}
                </Prose>
              </article>
            ) : children ? (
              <Prose role="region" className="mx-auto max-w-2xl">
                {children}
              </Prose>
            ) : null}
          </div>
          <div className="space-y-10 lg:sticky lg:top-12 lg:pl-16 xl:pl-24"></div>
        </div>
      </div>
    </Component>
  );
}

ArticleLayout.displayName = "ArticleLayout";
