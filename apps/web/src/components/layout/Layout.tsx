/* eslint-disable simple-import-sort/imports */

/**
 * @file Layout.tsx
 * @author Guy Romelle Magayano
 * @description Layout component for the web application.
 */

"use client";

import {
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
  useId,
  useMemo,
} from "react";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { SVGBg } from "@web/components/bg";
import { Button, SkipToMainContentButton } from "@web/components/button";
import { Container } from "@web/components/container";
import { Footer } from "@web/components/footer";
import { NewsletterForm } from "@web/components/form";
import { Header } from "@web/components/header";
import { Icon } from "@web/components/icon";
import { type CommonLayoutComponentData } from "@web/data/page";

import { Prose } from "@web/components/prose";
import { Heading, Lead, SubHeading } from "@web/components/text";
import { type ArticleWithSlug } from "@web/utils/articles";
import { setCustomDateFormat } from "@web/utils/datetime";
import { cn } from "@web/utils/helpers";

// ============================================================================
// LAYOUT COMPONENT
// ============================================================================

export type LayoutElementType = "div" | "section";
export type LayoutProps<P extends Record<string, unknown> = {}> = Omit<
  ComponentPropsWithRef<LayoutElementType>,
  "as"
> &
  P & {
    as?: LayoutElementType;
  };

export function Layout<P extends Record<string, unknown> = {}>(
  props: LayoutProps<P>
) {
  const { as: Component = "div", children, className, ...rest } = props;

  if (!children) return null;

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<LayoutElementType>)}
      className={cn("flex w-full", className)}
    >
      <SkipToMainContentButton href="#main" />
      <SVGBg />
      <div className="relative flex w-full flex-col">
        <Header role="banner" />
        <main id="main" role="main" tabIndex={-1}>
          {children}
        </main>
        <Footer role="contentinfo" />
      </div>
    </Component>
  );
}

Layout.displayName = "Layout";

// ============================================================================
// SIMPLE LAYOUT COMPONENT
// ============================================================================

export type SimpleLayoutElementType = typeof Container;
export type SimpleLayoutProps<P extends Record<string, unknown> = {}> = Omit<
  LayoutProps<P>,
  "as"
> &
  P &
  CommonLayoutComponentData & {
    as?: SimpleLayoutElementType;
  };

export function SimpleLayout<P extends Record<string, unknown> = {}>(
  props: SimpleLayoutProps<P>
) {
  const {
    as: Component = Container,
    subheading,
    title,
    intro,
    children,
    className,
    ...rest
  } = props;

  if (!children) return null;

  const hasSubheading =
    subheading && subheading.trim() !== "" && subheading.length > 0;
  const hasTitle = title && title.trim() !== "" && title.length > 0;
  const hasIntro = intro && intro.trim() !== "" && intro.length > 0;

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<SimpleLayoutElementType>)}
      className={cn("mt-16 sm:mt-32", className)}
    >
      <section className="max-w-3xl">
        {hasSubheading ? <SubHeading>{subheading}</SubHeading> : null}
        {hasTitle ? (
          <Heading className="mt-2 text-4xl font-bold tracking-tight text-pretty text-zinc-950 sm:text-5xl dark:text-white">
            {title}
          </Heading>
        ) : null}
        {hasIntro ? <Lead className="mt-6">{intro}</Lead> : null}
      </section>

      {children ? (
        <section className="mt-16 sm:mt-20">{children}</section>
      ) : null}
    </Component>
  );
}

SimpleLayout.displayName = "SimpleLayout";

// ============================================================================
// ARTICLE LAYOUT COMPONENT
// ============================================================================

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

  let router = useRouter();

  // Internationalization
  const articleLayoutI18n = useTranslations("components.layout");

  // Article layout ARIA and labels
  const ARTICLE_LAYOUT_I18N = useMemo(
    () => ({
      goBackToArticles: articleLayoutI18n("labels.goBackToArticles"),
      articleDate: articleLayoutI18n("labels.articleDate"),
    }),
    [articleLayoutI18n]
  );

  // Generate unique IDs for ARIA relationships
  const baseId = useId().replace(/:/g, "");
  const articleTitleId = `${baseId}-article-title`;
  const articleDateId = `${baseId}-article-date`;

  if (!article || !children) return null;

  const articleData = {
    title: article.title.trim(),
    date: article.date.trim(),
  };

  if (articleData.title.length === 0 && articleData.date.length === 0)
    return null;

  // Format the date custom format
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
                aria-label={ARTICLE_LAYOUT_I18N.goBackToArticles}
                className="group my-3"
              >
                <Icon
                  name="arrow-left"
                  className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400"
                  aria-hidden
                />
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {ARTICLE_LAYOUT_I18N.goBackToArticles}
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
                    aria-label={`${ARTICLE_LAYOUT_I18N.articleDate} ${formattedDate}`}
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
          <div className="space-y-10 lg:sticky lg:top-12 lg:pl-16 xl:pl-24">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </Component>
  );
}

ArticleLayout.displayName = "ArticleLayout";
