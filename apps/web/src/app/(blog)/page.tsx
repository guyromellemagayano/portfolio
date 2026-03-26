/* eslint-disable react-refresh/only-export-components */

/**
 * @file apps/web/src/app/(blog)/page.tsx
 * @author Guy Romelle Magayano
 * @description Home page route that renders hero content and recent articles from the API gateway.
 */

import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

import logger from "@portfolio/logger";

import { Card } from "@web/components/card";
import { Container } from "@web/components/container";
import { SimpleLayout } from "@web/components/layout";
import { SocialLink } from "@web/components/link";
import {
  ArticleList,
  ArticleListItem,
  SocialList,
  SocialListItem,
} from "@web/components/list";
import {
  type CommonLayoutComponentData,
  SOCIAL_LIST_COMPONENT_LABELS,
} from "@web/data/page";
import {
  PORTFOLIO_BUILD_SEQUENCE,
  PORTFOLIO_CAPABILITY_CLUSTERS,
  PORTFOLIO_FOCUS_AREAS,
  PORTFOLIO_FOUNDATION_CAPABILITIES,
  PORTFOLIO_SERVICE_OFFERINGS,
  PORTFOLIO_SHOWCASE_APPS,
} from "@web/data/portfolio-showcase";
import { getAllArticles } from "@web/utils/articles";
import { getSafeHeroMessages, normalizeError } from "@web/utils/error";
import { toAbsoluteSiteUrl } from "@web/utils/site-url";

const HOME_PAGE_I18N_NAMESPACE = "page.home.labels";
const HOME_PAGE_I18N_FALLBACK: CommonLayoutComponentData = {
  title: "I build reusable product systems for the web.",
  intro:
    "This portfolio is the public shell of a product-focused monorepo: shared platform packages, production-style demos, and case studies across admin, SaaS, commerce, operations, and content workflows.",
};

const List = {
  Article: ArticleList,
  Social: SocialList,
} as const;

const ListItem = {
  Article: ArticleListItem,
  Social: SocialListItem,
} as const;

const homeRssFeedUrl = toAbsoluteSiteUrl("/feed.xml");

export const metadata: Metadata = {
  title: {
    template: "%s - Guy Romelle Magayano",
    default: "Guy Romelle Magayano - Product systems and platform engineering",
  },
  description: HOME_PAGE_I18N_FALLBACK.intro,
  alternates: homeRssFeedUrl
    ? {
        types: {
          "application/rss+xml": homeRssFeedUrl,
        },
      }
    : undefined,
};

export default async function HomePage() {
  // Fetch the articles
  const articles = await getAllArticles()
    .then((data) => data?.slice(0, 3) ?? [])
    .catch((err) => {
      logger.error("Home page failed to load articles", normalizeError(err), {
        component: "web.app.home.page",
        operation: "getHomeArticles",
      });

      return [];
    });

  // Internationalization
  const pageI18n: CommonLayoutComponentData = await getTranslations(
    HOME_PAGE_I18N_NAMESPACE
  )
    .then((data) => ({
      title: getSafeHeroMessages(
        HOME_PAGE_I18N_NAMESPACE,
        data,
        "title",
        HOME_PAGE_I18N_FALLBACK.title
      ),
      intro: getSafeHeroMessages(
        HOME_PAGE_I18N_NAMESPACE,
        data,
        "description",
        HOME_PAGE_I18N_FALLBACK.intro
      ),
    }))
    .catch((err) => {
      const normalizedErr = normalizeError(err);

      if (normalizedErr.isDynamicServerUsage) {
        return HOME_PAGE_I18N_FALLBACK;
      }

      logger.error("Home page translations failed to load", normalizedErr, {
        component: "web.app.home.page",
        operation: "getHomePageI18n",
        metadata: {
          namespace: HOME_PAGE_I18N_NAMESPACE,
        },
      });

      return HOME_PAGE_I18N_FALLBACK;
    });

  const featuredApps = PORTFOLIO_SHOWCASE_APPS.slice(0, 3);
  const featuredServices = PORTFOLIO_SERVICE_OFFERINGS.slice(0, 3);

  return (
    <>
      <SimpleLayout {...pageI18n} className="mt-9">
        {SOCIAL_LIST_COMPONENT_LABELS?.length > 0 ? (
          <List.Social className="mt-6 flex gap-6">
            {SOCIAL_LIST_COMPONENT_LABELS.filter(
              ({ icon }) => icon !== "mail"
            ).map((value) => (
              <ListItem.Social
                key={value.href ?? value.icon}
                className="group -m-1 p-1"
              >
                <SocialLink {...value} />
              </ListItem.Social>
            ))}
          </List.Social>
        ) : null}
        <section
          aria-labelledby="home-focus-areas-heading"
          className="mt-14"
          role="region"
        >
          <h2 id="home-focus-areas-heading" className="sr-only">
            Focus areas
          </h2>
          <div
            className="flex flex-wrap gap-3"
            role="list"
            aria-label="Primary focus areas"
          >
            {PORTFOLIO_FOCUS_AREAS.map((focusArea) => (
              <span
                key={focusArea}
                className="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400"
                role="listitem"
              >
                {focusArea}
              </span>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            I work best where product experience, frontend architecture, and
            platform design all need to move together instead of being solved in
            isolation.
          </p>
        </section>
        <section
          aria-labelledby="home-services-heading"
          className="mt-20"
          role="region"
        >
          <div className="max-w-3xl">
            <h2
              id="home-services-heading"
              className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              What I do
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
              The work usually falls into one of three buckets: helping teams
              understand the system they have, guiding the one they need, or
              shipping the changes directly.
            </p>
          </div>
          <div
            className="mt-10 grid gap-10 lg:grid-cols-3"
            role="list"
            aria-label="Service offerings"
          >
            {featuredServices.map((service) => (
              <Card
                key={service.anchor}
                as="article"
                className="rounded-3xl border border-zinc-200/70 p-6 dark:border-zinc-800"
                role="listitem"
              >
                <Card.Title as="h3" href="/services" title={service.name}>
                  {service.name}
                </Card.Title>
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
        <section
          aria-labelledby="home-showcase-heading"
          className="mt-20"
          role="region"
        >
          <div className="max-w-3xl">
            <h2
              id="home-showcase-heading"
              className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              Selected systems
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
              The portfolio itself is structured like a product ecosystem. These
              are the apps that currently carry the story.
            </p>
          </div>
          <div
            className="mt-10 grid gap-10 sm:grid-cols-2 xl:grid-cols-3"
            role="list"
            aria-label="Featured portfolio apps"
          >
            {featuredApps.map((app) => (
              <Card
                key={app.anchor}
                as="article"
                className="h-full rounded-3xl border border-zinc-200/70 p-6 dark:border-zinc-800"
                role="listitem"
              >
                <Card.Eyebrow as="p">{app.path}</Card.Eyebrow>
                <Card.Title as="h3" href={app.href} title={app.name}>
                  {app.name}
                </Card.Title>
                <Card.Description>{app.summary}</Card.Description>
                <ul
                  className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400"
                  role="list"
                  aria-label={`${app.name} proof points`}
                >
                  {app.proofPoints.map((proofPoint) => (
                    <li key={proofPoint} className="flex gap-2">
                      <span aria-hidden="true">+</span>
                      <span>{proofPoint}</span>
                    </li>
                  ))}
                </ul>
                <Card.Cta href={app.href} title={`${app.name} details`}>
                  View system
                </Card.Cta>
              </Card>
            ))}
          </div>
        </section>
      </SimpleLayout>
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <section aria-labelledby="home-writing-heading">
            <div className="mb-8 max-w-2xl">
              <h2
                id="home-writing-heading"
                className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
              >
                Writing
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                Essays and notes on frontend architecture, platform systems, and
                the practical mechanics behind building products that stay
                maintainable.
              </p>
            </div>
            <ArticleList className="flex flex-col gap-16 border-none!">
              {articles?.map((article) => (
                <ArticleListItem key={article.slug} article={article} />
              ))}
            </ArticleList>
          </section>
          <div className="space-y-12 lg:pl-16 xl:pl-24">
            <section aria-labelledby="home-foundation-heading">
              <h2
                id="home-foundation-heading"
                className="text-sm font-semibold text-zinc-900 dark:text-zinc-50"
              >
                Shared foundation
              </h2>
              <ul
                className="mt-6 space-y-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400"
                role="list"
              >
                {PORTFOLIO_FOUNDATION_CAPABILITIES.map((capability) => (
                  <li key={capability} className="flex gap-3">
                    <span aria-hidden="true" className="text-zinc-400">
                      +
                    </span>
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="home-capabilities-heading">
              <h2
                id="home-capabilities-heading"
                className="text-sm font-semibold text-zinc-900 dark:text-zinc-50"
              >
                Capability clusters
              </h2>
              <div className="mt-6 space-y-5">
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
            </section>
            <section aria-labelledby="home-sequence-heading">
              <h2
                id="home-sequence-heading"
                className="text-sm font-semibold text-zinc-900 dark:text-zinc-50"
              >
                Recommended build order
              </h2>
              <ol
                className="mt-6 space-y-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400"
                role="list"
              >
                {PORTFOLIO_BUILD_SEQUENCE.map((step, index) => (
                  <li
                    key={step.title}
                    className="rounded-2xl border border-zinc-200/70 p-4 dark:border-zinc-800"
                  >
                    <p className="font-medium text-zinc-900 dark:text-zinc-50">
                      {index + 1}. {step.title}
                    </p>
                    <p className="mt-2">{step.detail}</p>
                  </li>
                ))}
              </ol>
            </section>
            <section
              aria-labelledby="home-resume-heading"
              className="rounded-3xl border border-zinc-200/70 p-6 dark:border-zinc-800"
            >
              <h2
                id="home-resume-heading"
                className="text-lg font-semibold text-zinc-900 dark:text-zinc-50"
              >
                Want the full background?
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                The resume covers the broader experience behind the public site:
                product work, platform engineering, architecture direction, and
                the teams that shaped how I build.
              </p>
              <Card.Cta
                href="/resume.pdf"
                title="Download resume"
                target="_blank"
              >
                Download resume
              </Card.Cta>
            </section>
            <section
              aria-labelledby="home-cta-heading"
              className="rounded-3xl border border-zinc-200/70 p-6 dark:border-zinc-800"
            >
              <h2
                id="home-cta-heading"
                className="text-lg font-semibold text-zinc-900 dark:text-zinc-50"
              >
                Need help untangling a product system?
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                If the problem sits somewhere between product UX, frontend
                architecture, and platform structure, that is usually where I am
                most useful.
              </p>
              <Card.Cta href="/contact" title="Start the conversation">
                Start the conversation
              </Card.Cta>
            </section>
          </div>
        </div>
      </Container>
    </>
  );
}
