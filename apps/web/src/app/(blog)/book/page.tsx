/* eslint-disable react-refresh/only-export-components */

/**
 * @file apps/web/src/app/(blog)/book/page.tsx
 * @author Guy Romelle Magayano
 * @description Static booking-intent page rendered from the canonical portfolio snapshot API.
 */

import type { Metadata } from "next";

import { SimpleLayout } from "@web/components/layout";
import {
  buildPortfolioPageMetadata,
  getPortfolioBrochurePage,
} from "@web/app/_lib/portfolio-brochure";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getPortfolioBrochurePage("book");

  return buildPortfolioPageMetadata(page);
}

export default async function BookPage() {
  const { snapshot, page } = await getPortfolioBrochurePage("book");
  const bookingPaths = snapshot.bookingPaths
    .filter((path) => path.status === "published")
    .sort((left, right) => left.order - right.order);
  const serviceOfferings = snapshot.serviceOfferings
    .filter((service) => service.status === "published")
    .sort((left, right) => left.order - right.order);

  return (
    <SimpleLayout
      className="mt-16 sm:mt-32"
      subheading={page.subheading}
      title={page.title}
      intro={page.intro}
    >
      <section
        aria-labelledby="book-starting-points-heading"
        className="mt-16"
        role="region"
      >
        <h2
          id="book-starting-points-heading"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Starting points
        </h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {bookingPaths.map((path) => (
            <article
              key={path.id}
              className="rounded-3xl border border-zinc-200/70 p-6 dark:border-zinc-800"
            >
              <h3 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                {path.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {path.description}
              </p>
              <a
                className="mt-5 inline-flex text-sm font-medium text-zinc-900 underline underline-offset-4 dark:text-zinc-50"
                href={path.href}
                rel={
                  path.target === "_blank" ? "noopener noreferrer" : undefined
                }
                target={path.target}
              >
                {path.cta}
              </a>
            </article>
          ))}
        </div>
      </section>
      <section
        aria-labelledby="book-which-service-heading"
        className="mt-20"
        role="region"
      >
        <h2
          id="book-which-service-heading"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          If you already know the shape of the work
        </h2>
        <div className="mt-10 space-y-8">
          {serviceOfferings.map((service) => (
            <article
              key={service.id}
              className="rounded-3xl border border-zinc-200/70 p-6 dark:border-zinc-800"
            >
              <h3 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                {service.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {service.bestFor}
              </p>
              <a
                className="mt-5 inline-flex text-sm font-medium text-zinc-900 underline underline-offset-4 dark:text-zinc-50"
                href={service.href}
              >
                {service.ctaLabel}
              </a>
            </article>
          ))}
        </div>
      </section>
    </SimpleLayout>
  );
}
