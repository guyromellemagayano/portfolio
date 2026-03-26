/* eslint-disable react-refresh/only-export-components */

/**
 * @file apps/web/src/app/(blog)/services/page.tsx
 * @author Guy Romelle Magayano
 * @description Services page for consulting, architecture, and delivery offerings.
 */

import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

import logger from "@portfolio/logger";

import { Card } from "@web/components/card";
import { SimpleLayout } from "@web/components/layout";
import { Section } from "@web/components/section";
import { Heading } from "@web/components/text";
import { type CommonLayoutComponentData } from "@web/data/page";
import {
  PORTFOLIO_CAPABILITY_CLUSTERS,
  PORTFOLIO_SERVICE_OFFERINGS,
  PORTFOLIO_SHOWCASE_APPS,
} from "@web/data/portfolio-showcase";
import { getSafeHeroMessages, normalizeError } from "@web/utils/error";

const SERVICES_PAGE_I18N_NAMESPACE = "page.services.labels";
const SERVICES_PAGE_I18N_FALLBACK: CommonLayoutComponentData = {
  subheading: "Services",
  title: "Architecture, advisory, and delivery for product systems.",
  intro:
    "I help teams make better frontend and platform decisions, then turn those decisions into maintainable implementation work.",
};

export const metadata: Metadata = {
  title: SERVICES_PAGE_I18N_FALLBACK.subheading,
  description: SERVICES_PAGE_I18N_FALLBACK.intro,
};

export default async function ServicesPage() {
  const servicesPageI18n: CommonLayoutComponentData = await getTranslations(
    SERVICES_PAGE_I18N_NAMESPACE
  )
    .then((data) => ({
      subheading: getSafeHeroMessages(
        SERVICES_PAGE_I18N_NAMESPACE,
        data,
        "subheading",
        SERVICES_PAGE_I18N_FALLBACK.subheading
      ),
      title: getSafeHeroMessages(
        SERVICES_PAGE_I18N_NAMESPACE,
        data,
        "title",
        SERVICES_PAGE_I18N_FALLBACK.title
      ),
      intro: getSafeHeroMessages(
        SERVICES_PAGE_I18N_NAMESPACE,
        data,
        "description",
        SERVICES_PAGE_I18N_FALLBACK.intro
      ),
    }))
    .catch((err) => {
      const normalizedErr = normalizeError(err);

      if (normalizedErr.isDynamicServerUsage) {
        return SERVICES_PAGE_I18N_FALLBACK;
      }

      logger.error("Services page translations failed to load", normalizedErr, {
        component: "web.app.services.page",
        operation: "getServicesPageI18n",
        metadata: {
          namespace: SERVICES_PAGE_I18N_NAMESPACE,
        },
      });

      return SERVICES_PAGE_I18N_FALLBACK;
    });

  return (
    <SimpleLayout {...servicesPageI18n} className="mt-16 sm:mt-32">
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
          {PORTFOLIO_SERVICE_OFFERINGS.map((service) => (
            <Card
              key={service.anchor}
              as="article"
              id={service.anchor}
              className="rounded-3xl border border-zinc-200/70 p-6 dark:border-zinc-800"
            >
              <Heading
                as="h3"
                className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100"
              >
                {service.name}
              </Heading>
              <Card.Description>{service.summary}</Card.Description>
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
              <Card.Cta href={service.href} title={service.ctaLabel}>
                {service.ctaLabel}
              </Card.Cta>
            </Card>
          ))}
        </div>
      </section>
      <div className="mt-20 space-y-16">
        <Section title="Capabilities I usually bring in">
          <div className="space-y-5">
            {PORTFOLIO_CAPABILITY_CLUSTERS.map((cluster) => (
              <div
                key={cluster.name}
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
        </Section>
        <Section title="Representative systems">
          <div className="space-y-5">
            {PORTFOLIO_SHOWCASE_APPS.map((app) => (
              <div
                key={app.anchor}
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
        </Section>
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
          <Card.Cta href="/book" title="Choose a starting path">
            Choose a starting path
          </Card.Cta>
        </section>
      </div>
    </SimpleLayout>
  );
}
