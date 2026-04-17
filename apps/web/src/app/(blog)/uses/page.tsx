/* eslint-disable react-refresh/only-export-components */

/**
 * @file apps/web/src/app/(blog)/uses/page.tsx
 * @author Guy Romelle Magayano
 * @description Static uses page rendered from the canonical portfolio snapshot API.
 */

import type { Metadata } from "next";

import { SimpleLayout } from "@web/components/layout";

import {
  buildPortfolioPageMetadata,
  getPortfolioBrochurePage,
} from "@web/app/_lib/portfolio-brochure";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getPortfolioBrochurePage("uses");

  return buildPortfolioPageMetadata(page);
}

export default async function UsesPage() {
  const { snapshot, page } = await getPortfolioBrochurePage("uses");
  const categories = snapshot.useCategories
    .filter((category) => category.status === "published")
    .sort((left, right) => left.order - right.order);

  return (
    <SimpleLayout
      className="mt-16 sm:mt-32"
      subheading={page.subheading}
      title={page.title}
      intro={page.intro}
    >
      <div className="mt-12 space-y-10">
        {categories.map((category) => (
          <section
            key={category.id}
            aria-labelledby={`uses-category-${category.slug}`}
            className="rounded-3xl border border-zinc-200/70 p-6 dark:border-zinc-800"
            role="region"
          >
            <h2
              id={`uses-category-${category.slug}`}
              className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              {category.title}
            </h2>
            {category.intro ? (
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {category.intro}
              </p>
            ) : null}
            <div className="mt-6 space-y-4">
              {category.items
                .slice()
                .sort((left, right) => left.order - right.order)
                .map((item) => (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-zinc-200/70 p-4 dark:border-zinc-800"
                  >
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                      {item.summary}
                    </p>
                    {item.link ? (
                      <a
                        className="mt-3 inline-flex text-sm font-medium text-zinc-900 underline underline-offset-4 dark:text-zinc-50"
                        href={item.link.href}
                        rel={item.link.rel}
                        target={item.link.target}
                      >
                        {item.link.label}
                      </a>
                    ) : null}
                  </article>
                ))}
            </div>
          </section>
        ))}
      </div>
    </SimpleLayout>
  );
}
