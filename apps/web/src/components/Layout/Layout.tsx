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
  useContext,
  useId,
  useMemo,
} from "react";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { formatDateSafely } from "@guyromellemagayano/utils";

import { AppContext } from "@web/app/context";
import { Button } from "@web/components/button";
import { Container } from "@web/components/container";
import { Footer } from "@web/components/footer";
import { Header } from "@web/components/header";
import { Icon } from "@web/components/icon";
import { Prose } from "@web/components/prose";
import { type ArticleWithSlug } from "@web/utils/articles";
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

  // Internationalization
  const tAria = useTranslations("layout.ariaLabels");

  // Skip to main content ARIA
  const skipToMainContent = useMemo(() => tAria("skipToMainContent"), [tAria]);

  if (!children) return null;

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<LayoutElementType>)}
      className={cn("flex w-full", className)}
    >
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <Link
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-zinc-900 focus:px-3 focus:py-2 focus:text-white dark:focus:bg-zinc-100 dark:focus:text-zinc-900"
          aria-label={skipToMainContent}
        >
          {skipToMainContent}
        </Link>
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative flex w-full flex-col">
        <Header role="banner" />
        <main id="main" role="main" className="flex-auto">
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
  P & {
    as?: SimpleLayoutElementType;
    title: string;
    intro: string;
  };

export function SimpleLayout<P extends Record<string, unknown> = {}>(
  props: SimpleLayoutProps<P>
) {
  const {
    as: Component = Container,
    title,
    intro,
    children,
    className,
    ...rest
  } = props;

  // Internationalization
  const tAria = useTranslations("layout.ariaLabels");

  // Skip to main content ARIA
  const skipToMainContent = useMemo(() => tAria("skipToMainContent"), [tAria]);

  if (!children) return null;

  const hasTitle = title && title.trim() !== "" && title.length > 0;
  const hasIntro = intro && intro.trim() !== "" && intro.length > 0;

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<SimpleLayoutElementType>)}
      className={cn("mt-16 sm:mt-32", className)}
    >
      <Link
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-zinc-900 focus:px-3 focus:py-2 focus:text-white dark:focus:bg-zinc-100 dark:focus:text-zinc-900"
        aria-label={skipToMainContent}
      >
        {skipToMainContent}
      </Link>

      <header className="max-w-2xl">
        {hasTitle ? (
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            {title}
          </h1>
        ) : null}

        {hasIntro ? (
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {intro}
          </p>
        ) : null}
      </header>

      {children ? (
        <main role="main" className="mt-16 sm:mt-20">
          {children}
        </main>
      ) : null}
    </Component>
  );
}

// ============================================================================
// ARTICLE LAYOUT COMPONENT
// ============================================================================

export type ArticleLayoutElementType = typeof Container;
export type ArticleLayoutProps<P extends Record<string, unknown> = {}> = Omit<
  SimpleLayoutProps<P>,
  "as" | "title" | "intro"
> &
  P & {
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
    ...rest
  } = props;

  let router = useRouter();
  let { previousPathname } = useContext(AppContext);

  // Internationalization
  const tAria = useTranslations("layout.ariaLabels");

  // Article layout ARIA and labels
  const ARTICLE_LAYOUT_I18N = useMemo(
    () => ({
      goBackToArticles: tAria("goBackToArticles"),
      articleDate: tAria("articleDate"),
    }),
    [tAria]
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

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<ArticleLayoutElementType>)}
      role="main"
      className={cn("mt-16 lg:mt-32", className)}
    >
      <div role="region" className="xl:relative">
        <div role="region" className="mx-auto max-w-2xl">
          {previousPathname && (
            <Button
              type="button"
              onClick={() => router.back()}
              aria-label={ARTICLE_LAYOUT_I18N.goBackToArticles}
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
            >
              <Icon
                name="arrow-left"
                className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400"
                aria-hidden
              />
            </Button>
          )}

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
                  aria-label={`${ARTICLE_LAYOUT_I18N.articleDate} ${formatDateSafely(articleData.date)}`}
                >
                  <span
                    className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                    aria-hidden="true"
                  />
                  <span className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500">
                    {formatDateSafely(articleData.date)}
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
      </div>
    </Component>
  );
}

ArticleLayout.displayName = "ArticleLayout";
