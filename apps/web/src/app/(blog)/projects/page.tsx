/* eslint-disable react-refresh/only-export-components */
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

import logger from "@portfolio/logger";

import { Card } from "@web/components/card";
import { SimpleLayout } from "@web/components/layout";
import { Section } from "@web/components/section";
import { type CommonLayoutComponentData } from "@web/data/page";
import {
  PORTFOLIO_BUILD_SEQUENCE,
  PORTFOLIO_FOUNDATION_CAPABILITIES,
  PORTFOLIO_SHOWCASE_APPS,
} from "@web/data/portfolio-showcase";
import { getSafeHeroMessages, normalizeError } from "@web/utils/error";

const PROJECTS_PAGE_I18N_NAMESPACE = "page.projects.labels";
const PROJECTS_PAGE_I18N_FALLBACK: CommonLayoutComponentData = {
  subheading: "Projects",
  title: "A monorepo of products, not a shelf of disconnected demos.",
  intro:
    "Each app proves a different slice of product engineering: public storytelling, CRUD maturity, multi-tenant SaaS design, commerce flows, operational visibility, and structured content workflows.",
};

export const metadata: Metadata = {
  title: PROJECTS_PAGE_I18N_FALLBACK.subheading,
  description: PROJECTS_PAGE_I18N_FALLBACK.intro,
};
export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  // Internationalization
  const projectsPageI18n: CommonLayoutComponentData = await getTranslations(
    PROJECTS_PAGE_I18N_NAMESPACE
  )
    .then((data) => ({
      subheading: getSafeHeroMessages(
        PROJECTS_PAGE_I18N_NAMESPACE,
        data,
        "subheading",
        PROJECTS_PAGE_I18N_FALLBACK.subheading
      ),
      title: getSafeHeroMessages(
        PROJECTS_PAGE_I18N_NAMESPACE,
        data,
        "title",
        PROJECTS_PAGE_I18N_FALLBACK.title
      ),
      intro: getSafeHeroMessages(
        PROJECTS_PAGE_I18N_NAMESPACE,
        data,
        "description",
        PROJECTS_PAGE_I18N_FALLBACK.intro
      ),
    }))
    .catch((err) => {
      const normalizedErr = normalizeError(err);

      if (normalizedErr.isDynamicServerUsage) {
        return PROJECTS_PAGE_I18N_FALLBACK;
      }

      logger.error("Projects page translations failed to load", normalizedErr, {
        component: "web.app.projects.page",
        operation: "getProjectsPageI18n",
        metadata: {
          namespace: PROJECTS_PAGE_I18N_NAMESPACE,
        },
      });

      return PROJECTS_PAGE_I18N_FALLBACK;
    });

  return (
    <SimpleLayout {...projectsPageI18n} className="mt-16 sm:mt-32">
      <section
        aria-labelledby="projects-catalog-heading"
        className="mt-16"
        role="region"
      >
        <h2
          id="projects-catalog-heading"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          The current showcase lineup
        </h2>
        <div
          className="mt-10 grid gap-10 lg:grid-cols-2"
          role="list"
          aria-label="Portfolio app catalog"
        >
          {PORTFOLIO_SHOWCASE_APPS.map((app) => (
            <Card
              key={app.anchor}
              as="article"
              id={app.anchor}
              className="rounded-3xl border border-zinc-200/70 p-6 dark:border-zinc-800"
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
            </Card>
          ))}
        </div>
      </section>
      <div className="mt-20 space-y-16">
        <Section title="Shared platform foundation">
          <ul
            className="space-y-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400"
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
        </Section>
        <Section title="Suggested execution order">
          <ol
            className="space-y-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400"
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
        </Section>
      </div>
    </SimpleLayout>
  );
}
