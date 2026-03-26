/* eslint-disable react-refresh/only-export-components */

/**
 * @file apps/web/src/app/(blog)/articles/page.tsx
 * @author Guy Romelle Magayano
 * @description Implementation for page.
 */

import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

import logger from "@portfolio/logger";

import { ArticleSearch } from "@web/components/article";
import { SimpleLayout } from "@web/components/layout";
import { type CommonLayoutComponentData } from "@web/data/page";
import { getAllArticles } from "@web/utils/articles";
import { getSafeHeroMessages, normalizeError } from "@web/utils/error";

const ARTICLES_PAGE_I18N_NAMESPACE = "page.articles.labels";
const ARTICLES_PAGE_I18N_FALLBACK: CommonLayoutComponentData = {
  subheading: "Articles",
  title: "Notes on frontend architecture, product systems, and delivery.",
  intro:
    "Writing on the mechanics behind good product engineering: architecture, delivery systems, reusable UI, content modeling, and the tradeoffs that show up in real teams.",
};

export const metadata: Metadata = {
  title: ARTICLES_PAGE_I18N_FALLBACK.subheading,
  description: ARTICLES_PAGE_I18N_FALLBACK.intro,
  openGraph: {
    title: "Articles - Guy Romelle Magayano",
    description:
      "Long-form thoughts on programming, leadership, product design, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Articles - Guy Romelle Magayano",
    description:
      "Long-form thoughts on programming, leadership, product design, and more.",
  },
};

export default async function ArticlesPage() {
  const articles = await getAllArticles().catch((err) => {
    logger.error(
      "Articles page failed to load article list",
      normalizeError(err),
      {
        component: "web.app.articles.page",
        operation: "getArticles",
      }
    );

    return [];
  });

  // Internationalization
  const articlesPageI18n: CommonLayoutComponentData = await getTranslations(
    ARTICLES_PAGE_I18N_NAMESPACE
  )
    .then((data) => ({
      subheading: getSafeHeroMessages(
        ARTICLES_PAGE_I18N_NAMESPACE,
        data,
        "subheading",
        ARTICLES_PAGE_I18N_FALLBACK.subheading
      ),
      title: getSafeHeroMessages(
        ARTICLES_PAGE_I18N_NAMESPACE,
        data,
        "title",
        ARTICLES_PAGE_I18N_FALLBACK.title
      ),
      intro: getSafeHeroMessages(
        ARTICLES_PAGE_I18N_NAMESPACE,
        data,
        "description",
        ARTICLES_PAGE_I18N_FALLBACK.intro
      ),
    }))
    .catch((err) => {
      const normalizedErr = normalizeError(err);

      if (normalizedErr.isDynamicServerUsage) {
        return ARTICLES_PAGE_I18N_FALLBACK;
      }

      logger.error("Articles page translations failed to load", normalizedErr, {
        component: "web.app.articles.page",
        operation: "getArticlesPageI18n",
        metadata: {
          namespace: ARTICLES_PAGE_I18N_NAMESPACE,
        },
      });

      return ARTICLES_PAGE_I18N_FALLBACK;
    });

  return (
    <SimpleLayout {...articlesPageI18n} className="mt-16 sm:mt-32">
      <section
        aria-labelledby="articles-categories-heading"
        className="mt-16"
        role="region"
      >
        <h2 id="articles-categories-heading" className="sr-only">
          Writing categories
        </h2>
        <div
          className="flex flex-wrap gap-3"
          role="list"
          aria-label="Primary writing categories"
        >
          {Array.from(
            new Set(
              articles.flatMap((article) => article.tags?.slice(0, 2) ?? [])
            )
          )
            .slice(0, 6)
            .map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400"
                role="listitem"
              >
                {tag}
              </span>
            ))}
        </div>
      </section>
      <ArticleSearch articles={articles} />
    </SimpleLayout>
  );
}
