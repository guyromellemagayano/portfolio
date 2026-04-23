/* eslint-disable react-refresh/only-export-components */

/**
 * @file apps/web/src/app/(blog)/services/page.tsx
 * @author Guy Romelle Magayano
 * @description Services page rendered from direct local portfolio content.
 */

import type { Metadata } from "next";
import Link from "next/link";

import {
  buildPortfolioPageMetadata,
  getPortfolioBrochurePage,
} from "@web/app/_lib/portfolio-brochure";
import { SimpleLayout } from "@web/components/layout";

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

  return (
    <SimpleLayout
      className="pb-16"
      subheading={page.subheading}
      title={page.title}
      intro={page.intro}
    >
      <section
        aria-labelledby="services-offerings-heading"
        className="py-12"
        role="region"
      >
        <h2
          id="services-offerings-heading"
          className="text-3xl font-medium tracking-tight text-zinc-950 sm:text-4xl"
        >
          Ways to work together
        </h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.id}
              id={service.anchor}
              className="rounded-lg border border-zinc-950/10 bg-white p-6"
            >
              <p className="text-xs font-semibold tracking-[0.24em] text-zinc-500 uppercase">
                {service.ctaLabel}
              </p>
              <h3 className="mt-3 text-xl font-medium tracking-tight text-zinc-950">
                {service.name}
              </h3>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                {service.summary}
              </p>
              <ul
                aria-label={`${service.name} deliverables`}
                className="mt-5 space-y-2 text-sm leading-6 text-zinc-600"
                role="list"
              >
                {service.deliverables.map((deliverable) => (
                  <li key={deliverable}>{deliverable}</li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-6 text-zinc-500">
                <span className="font-medium text-zinc-950">Best for:</span>{" "}
                {service.bestFor}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="services-capabilities-heading"
        className="border-t border-zinc-950/10 py-16"
        role="region"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div>
            <h2
              id="services-capabilities-heading"
              className="text-3xl font-medium tracking-tight text-zinc-950 sm:text-4xl"
            >
              Capability clusters that usually come with the work.
            </h2>
          </div>
          <div className="space-y-4">
            {capabilityClusters.map((cluster) => (
              <article
                key={cluster.id}
                className="rounded-lg border border-zinc-950/10 bg-white p-6"
              >
                <h3 className="text-lg font-medium text-zinc-950">
                  {cluster.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600">
                  {cluster.items.join(" · ")}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="services-cta-heading"
        className="border-t border-zinc-950/10 py-16"
        role="region"
      >
        <div className="rounded-lg border border-zinc-950/10 bg-white p-6 sm:p-8">
          <h2
            id="services-cta-heading"
            className="text-2xl font-medium tracking-tight text-zinc-950"
          >
            Not sure which engagement shape fits yet?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">
            Start with the current bottleneck, the product surface that is
            getting hard to extend, and whether you need review, guidance, or
            hands-on execution.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              Choose a starting path
            </Link>
            <Link
              href="/hire"
              className="inline-flex items-center justify-center rounded-full border border-zinc-950/10 bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:border-zinc-950/30"
            >
              Go straight to the hire page
            </Link>
          </div>
        </div>
      </section>
    </SimpleLayout>
  );
}
