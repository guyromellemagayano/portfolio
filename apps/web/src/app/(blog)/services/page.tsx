/* eslint-disable react-refresh/only-export-components */

/**
 * @file apps/web/src/app/(blog)/services/page.tsx
 * @author Guy Romelle Magayano
 * @description Static services page rendered from the canonical portfolio snapshot API.
 */

import type { Metadata } from "next";

import { SimpleLayout } from "@web/components/layout";
import {
  buildPortfolioPageMetadata,
  getPortfolioBrochurePage,
} from "@web/app/_lib/portfolio-brochure";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getPortfolioBrochurePage("services");

  return buildPortfolioPageMetadata(page);
}

export default async function ServicesPage() {
  const { snapshot, page } = await getPortfolioBrochurePage("services");
  const services = snapshot.serviceOfferings
    .filter((service) => service.status === "published")
    .sort((left, right) => left.order - right.order);
  const capabilityClusters = snapshot.capabilityClusters
    .filter((cluster) => cluster.status === "published")
    .sort((left, right) => left.order - right.order);
  const showcaseApps = snapshot.showcaseApps
    .filter((app) => app.status === "published")
    .sort((left, right) => left.order - right.order);

  return (
    <SimpleLayout
      className="mt-16 sm:mt-32"
      subheading={page.subheading}
      title={page.title}
      intro={page.intro}
    >
      <section
        aria-labelledby="services-offerings-heading"
        className="mt-16"
        role="region"
      >
        <h2
          id="services-offerings-heading"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Ways to work with me
        </h2>
        <div className="mt-10 space-y-8">
          {services.map((service) => (
            <article
              key={service.id}
              id={service.anchor}
              className="rounded-3xl border border-zinc-200/70 p-6 dark:border-zinc-800"
            >
              <h3 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                {service.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {service.summary}
              </p>
              <ul
                className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400"
                role="list"
                aria-label={`${service.name} deliverables`}
              >
                {service.deliverables.map((deliverable) => (
                  <li key={deliverable} className="flex gap-2">
                    <span aria-hidden="true">+</span>
                    <span>{deliverable}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                <span className="font-medium text-zinc-900 dark:text-zinc-50">
                  Best for:
                </span>{" "}
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
      <div className="mt-20 space-y-16">
        <section aria-labelledby="services-capabilities-heading" role="region">
          <h2
            id="services-capabilities-heading"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Capabilities I usually bring in
          </h2>
          <div className="space-y-5">
            {capabilityClusters.map((cluster) => (
              <div
                key={cluster.id}
                className="rounded-2xl border border-zinc-200/70 p-4 dark:border-zinc-800"
              >
                <p className="font-medium text-zinc-900 dark:text-zinc-50">
                  {cluster.name}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {cluster.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section aria-labelledby="services-systems-heading" role="region">
          <h2
            id="services-systems-heading"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Representative systems
          </h2>
          <div className="space-y-5">
            {showcaseApps.map((app) => (
              <div
                key={app.id}
                className="rounded-2xl border border-zinc-200/70 p-4 dark:border-zinc-800"
              >
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {app.path}
                </p>
                <p className="mt-2 font-medium text-zinc-900 dark:text-zinc-50">
                  {app.name}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {app.summary}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section
          aria-labelledby="services-cta-heading"
          className="rounded-3xl border border-zinc-200/70 p-6 dark:border-zinc-800"
        >
          <h2
            id="services-cta-heading"
            className="text-lg font-semibold text-zinc-900 dark:text-zinc-50"
          >
            Not sure which option fits?
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Send a short note with the current problem, where the product is
            stuck, and whether you need review, guidance, or direct execution.
          </p>
          <a
            className="mt-5 inline-flex text-sm font-medium text-zinc-900 underline underline-offset-4 dark:text-zinc-50"
            href="/book"
          >
            Choose a starting path
          </a>
        </section>
      </div>
    </SimpleLayout>
  );
}
