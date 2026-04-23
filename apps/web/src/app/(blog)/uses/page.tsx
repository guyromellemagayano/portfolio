/* eslint-disable react-refresh/only-export-components */

/**
 * @file apps/web/src/app/(blog)/uses/page.tsx
 * @author Guy Romelle Magayano
 * @description Uses page rendered from direct local portfolio content.
 */

import type { Metadata } from "next";

import {
  buildPortfolioPageMetadata,
  getPortfolioBrochurePage,
} from "@web/app/_lib/portfolio-brochure";
import { SimpleLayout } from "@web/components/layout";

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
      className="pb-16"
      subheading={page.subheading}
      title={page.title}
      intro={page.intro}
    >
      <section
        aria-labelledby="uses-categories-heading"
        className="py-12"
        role="region"
      >
        <h2
          id="uses-categories-heading"
          className="text-3xl font-medium tracking-tight text-zinc-950 sm:text-4xl"
        >
          Hardware, software, and workflow tools.
        </h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {categories.map((category) => (
            <section
              key={category.id}
              aria-labelledby={`uses-category-${category.slug}`}
              className="rounded-lg border border-zinc-950/10 bg-white p-6"
              role="region"
            >
              <h3
                id={`uses-category-${category.slug}`}
                className="text-xl font-medium tracking-tight text-zinc-950"
              >
                {category.title}
              </h3>
              {category.intro ? (
                <p className="mt-3 text-sm leading-7 text-zinc-600">
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
                      className="border-t border-zinc-950/10 pt-4 first:border-t-0 first:pt-0"
                    >
                      <h4 className="text-sm font-semibold text-zinc-950">
                        {item.name}
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-zinc-600">
                        {item.summary}
                      </p>
                      {item.link ? (
                        <a
                          href={item.link.href}
                          rel={item.link.rel}
                          target={item.link.target}
                          className="mt-3 inline-flex text-sm font-medium text-zinc-950 underline decoration-zinc-300 underline-offset-4"
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
      </section>
    </SimpleLayout>
  );
}
