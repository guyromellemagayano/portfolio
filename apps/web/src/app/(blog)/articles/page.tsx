/* eslint-disable react-refresh/only-export-components */

/**
 * @file apps/web/src/app/(blog)/articles/page.tsx
 * @author Guy Romelle Magayano
 * @description Article index page rendered from direct local content.
 */

import type { Metadata } from "next";
import Link from "next/link";

import {
  buildPortfolioPageMetadata,
  getPortfolioBrochurePage,
} from "@web/app/_lib/portfolio-brochure";
import { SimpleLayout } from "@web/components/layout";
import { getAllArticles } from "@web/utils/articles";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getPortfolioBrochurePage("articles");

  return buildPortfolioPageMetadata(page);
}

export default async function ArticlesPage() {
  const [{ page }, articles] = await Promise.all([
    getPortfolioBrochurePage("articles"),
    getAllArticles(),
  ]);

  return (
    <SimpleLayout
      className="pb-16"
      subheading={page.subheading}
      title={page.title}
      intro={page.intro}
    >
      <section
        aria-labelledby="articles-list-heading"
        className="py-12"
        role="region"
      >
        <h2 id="articles-list-heading" className="sr-only">
          Article list
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="rounded-lg border border-zinc-950/10 bg-white p-6"
            >
              <div className="flex flex-wrap items-center gap-2" role="list">
                {(article.tags || []).slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-950/10 px-3 py-2 text-xs text-zinc-600"
                    role="listitem"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mt-4 text-2xl font-medium tracking-tight text-zinc-950">
                <Link href={`/articles/${article.slug}`}>{article.title}</Link>
              </h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                {article.description}
              </p>
              <p className="mt-4 text-sm text-zinc-500">{article.date}</p>
            </article>
          ))}
        </div>
      </section>
    </SimpleLayout>
  );
}
