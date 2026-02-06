/**
 * @file ArticleSearch.tsx
 * @author Guy Romelle Magayano
 * @description Article search component.
 */

"use client";

import { type ComponentPropsWithRef, useId, useMemo } from "react";

import Fuse from "fuse.js";
import { useTranslations } from "next-intl";

import { Card } from "@web/components/card";
import { Form } from "@web/components/form";
import { Icon } from "@web/components/icon";
import { type ArticleWithSlug } from "@web/utils/articles";
import { setCustomDateFormat } from "@web/utils/datetime";
import { useFuzzySearch } from "@web/utils/search";

export type ArticleSearchElementType = "div";
export type ArticleSearchProps<P extends Record<string, unknown> = {}> = Omit<
  ComponentPropsWithRef<ArticleSearchElementType>,
  "as"
> &
  P & {
    as?: ArticleSearchElementType;
    articles: ArticleWithSlug[];
  };

export function ArticleSearch<P extends Record<string, unknown> = {}>(
  props: ArticleSearchProps<P>
) {
  const { as: Component = "div", articles, ...rest } = props;

  const searchId = useId();
  const searchInputId = `${searchId}-input`;
  const searchStatusId = `${searchId}-status`;
  const searchResultsId = `${searchId}-results`;

  const searchKeys = useMemo(
    () => ["author", "title", "description"] as const,
    []
  );

  const searchOptions = {
    includeScore: true,
    includeMatches: true,
    findAllMatches: true,
    threshold: 0.45,
    ignoreLocation: true,
    useExtendedSearch: true,
  };

  const { searchQuery, setSearchQuery, results } = useFuzzySearch(
    articles,
    searchOptions as Omit<typeof Fuse.config, "keys">,
    searchKeys
  );

  const searchResults = results as ArticleWithSlug[];

  // Internationalization
  const t = useTranslations("article");

  const ARTICLE_SEARCH_I18N = useMemo(
    () => ({
      cta: t("cta"),
      searchArticles: t("search.labels.searchArticles"),
      noArticlesFound: t("search.labels.noArticlesFound"),
      tryDifferentSearchTerm: t("search.labels.tryDifferentSearchTerm"),
      showingAllArticles: t("search.labels.showingAllArticles", {
        count: searchResults.length,
      }),
      foundResults: t("search.labels.foundResults", {
        count: results.length,
        query: searchQuery.trim(),
      }),
      searchLandmark: t("search.labels.searchLandmark"),
      resultsRegion: t("search.labels.resultsRegion"),
    }),
    [t, results.length, searchQuery, searchResults.length]
  );

  return (
    <Component {...(rest as ComponentPropsWithRef<ArticleSearchElementType>)}>
      <div className="flex max-w-3xl flex-col space-y-6">
        <Form
          className="relative"
          role="search"
          aria-label={ARTICLE_SEARCH_I18N.searchLandmark}
        >
          <label htmlFor={searchInputId} className="sr-only">
            {ARTICLE_SEARCH_I18N.searchArticles}
          </label>
          <Icon
            name="search"
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 col-start-1 row-start-1 ml-3 size-5 h-5 w-5 -translate-y-1/2 self-center text-zinc-400 sm:size-4 dark:text-zinc-500"
          />
          <input
            id={searchInputId}
            type="text"
            placeholder={ARTICLE_SEARCH_I18N.searchArticles}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-describedby={searchStatusId}
            aria-controls={searchResultsId}
            className="w-full appearance-none rounded-[calc(var(--radius-md)-1px)] bg-white px-3 py-[calc(--spacing(2)-1px)] pl-10 shadow-lg shadow-zinc-800/5 outline outline-zinc-900/10 placeholder:text-zinc-400 focus:ring-4 focus:ring-teal-500/10 focus:outline-teal-500 sm:text-sm dark:bg-zinc-700/15 dark:text-zinc-200 dark:outline-zinc-700 dark:placeholder:text-zinc-500 dark:focus:ring-teal-400/10 dark:focus:outline-teal-400"
          />
        </Form>

        <p id={searchStatusId} className="sr-only" aria-live="polite">
          {searchQuery.trim().length === 0
            ? ARTICLE_SEARCH_I18N.showingAllArticles
            : ARTICLE_SEARCH_I18N.foundResults}
        </p>

        <div
          id={searchResultsId}
          role="region"
          aria-label={ARTICLE_SEARCH_I18N.resultsRegion}
          className="md:mt-12 md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40"
        >
          <div className="space-y-16">
            {results.length === 0 ? (
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {ARTICLE_SEARCH_I18N.noArticlesFound}{" "}
                {ARTICLE_SEARCH_I18N.tryDifferentSearchTerm}
              </p>
            ) : (
              searchResults.map((article) => {
                // Format the date custom format
                const formattedDate = setCustomDateFormat(article.date);

                return (
                  <article
                    key={article.slug}
                    className="md:grid md:grid-cols-4 md:items-baseline"
                  >
                    <Card className="md:col-span-3">
                      <Card.Title href={`/articles/${article.slug}`}>
                        {article.title}
                      </Card.Title>
                      <Card.Eyebrow
                        as="time"
                        dateTime={article.date}
                        className="md:hidden"
                        decorate
                      >
                        {formattedDate}
                      </Card.Eyebrow>
                      <Card.Description>{article.description}</Card.Description>
                      <Card.Cta>{ARTICLE_SEARCH_I18N.cta}</Card.Cta>
                    </Card>
                    <Card.Eyebrow
                      as="time"
                      dateTime={article.date}
                      className="mt-1 max-md:hidden"
                    >
                      {formattedDate}
                    </Card.Eyebrow>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </div>
    </Component>
  );
}

ArticleSearch.displayName = "ArticleSearch";
