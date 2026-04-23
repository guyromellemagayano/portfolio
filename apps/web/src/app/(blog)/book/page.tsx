/* eslint-disable react-refresh/only-export-components */

/**
 * @file apps/web/src/app/(blog)/book/page.tsx
 * @author Guy Romelle Magayano
 * @description Booking-intent page rendered from direct local portfolio content.
 */

import type { Metadata } from "next";

import {
  buildPortfolioPageMetadata,
  getPortfolioBrochurePage,
} from "@web/app/_lib/portfolio-brochure";
import { SimpleLayout } from "@web/components/layout";

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
      className="pb-16"
      subheading={page.subheading}
      title={page.title}
      intro={page.intro}
    >
      <section
        aria-labelledby="book-paths-heading"
        className="py-12"
        role="region"
      >
        <h2
          id="book-paths-heading"
          className="text-3xl font-medium tracking-tight text-zinc-950 sm:text-4xl"
        >
          First conversation options
        </h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {bookingPaths.map((path) => (
            <article
              key={path.id}
              className="rounded-lg border border-zinc-950/10 bg-white p-6"
            >
              <h3 className="text-xl font-medium tracking-tight text-zinc-950">
                {path.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                {path.description}
              </p>
              <a
                href={path.href}
                rel={
                  path.target === "_blank" ? "noopener noreferrer" : undefined
                }
                target={path.target}
                className="mt-5 inline-flex text-sm font-medium text-zinc-950 underline decoration-zinc-300 underline-offset-4"
              >
                {path.cta}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="book-services-heading"
        className="border-t border-zinc-950/10 py-16"
        role="region"
      >
        <h2
          id="book-services-heading"
          className="text-3xl font-medium tracking-tight text-zinc-950 sm:text-4xl"
        >
          If you already know the shape of the engagement
        </h2>
        <div className="mt-10 space-y-4">
          {serviceOfferings.map((service) => (
            <article
              key={service.id}
              className="rounded-lg border border-zinc-950/10 bg-white p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-medium tracking-tight text-zinc-950">
                    {service.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">
                    {service.bestFor}
                  </p>
                </div>
                <a
                  href={service.href}
                  className="inline-flex text-sm font-medium text-zinc-950 underline decoration-zinc-300 underline-offset-4"
                >
                  {service.ctaLabel}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SimpleLayout>
  );
}
