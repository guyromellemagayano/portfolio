/* eslint-disable react-refresh/only-export-components */

/**
 * @file apps/web/src/app/(blog)/about/page.tsx
 * @author Guy Romelle Magayano
 * @description Implementation for page.
 */
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

import logger from "@portfolio/logger";

import { SimpleLayout } from "@web/components/layout";
import { Section } from "@web/components/section";
import { type CommonLayoutComponentData } from "@web/data/page";
import {
  PORTFOLIO_FOUNDATION_CAPABILITIES,
  PORTFOLIO_OPERATING_PRINCIPLES,
} from "@web/data/portfolio-showcase";
import { getSafeHeroMessages, normalizeError } from "@web/utils/error";

const ABOUT_PAGE_I18N_NAMESPACE = "page.about.labels";
const ABOUT_PAGE_I18N_FALLBACK: CommonLayoutComponentData = {
  subheading: "About",
  title: "I build software like a product engineer, not a page assembler.",
  intro:
    "My work sits at the intersection of frontend architecture, design systems, platform foundations, and pragmatic backend delivery. I care most about software that stays coherent as the product surface grows.",
};

export const metadata: Metadata = {
  title: ABOUT_PAGE_I18N_FALLBACK.subheading,
  description: ABOUT_PAGE_I18N_FALLBACK.intro,
};
export const dynamic = "force-dynamic";

export default async function AboutPage() {
  // Internationalization
  const aboutPageI18n: CommonLayoutComponentData = await getTranslations(
    ABOUT_PAGE_I18N_NAMESPACE
  )
    .then((data) => ({
      subheading: getSafeHeroMessages(
        ABOUT_PAGE_I18N_NAMESPACE,
        data,
        "subheading",
        ABOUT_PAGE_I18N_FALLBACK.subheading
      ),
      title: getSafeHeroMessages(
        ABOUT_PAGE_I18N_NAMESPACE,
        data,
        "title",
        ABOUT_PAGE_I18N_FALLBACK.title
      ),
      intro: getSafeHeroMessages(
        ABOUT_PAGE_I18N_NAMESPACE,
        data,
        "description",
        ABOUT_PAGE_I18N_FALLBACK.intro
      ),
    }))
    .catch((err) => {
      const normalizedErr = normalizeError(err);

      if (normalizedErr.isDynamicServerUsage) {
        return ABOUT_PAGE_I18N_FALLBACK;
      }

      logger.error("About page translations failed to load", normalizedErr, {
        component: "web.app.about.page",
        operation: "getAboutPageI18n",
        metadata: {
          namespace: ABOUT_PAGE_I18N_NAMESPACE,
        },
      });

      return ABOUT_PAGE_I18N_FALLBACK;
    });

  return (
    <SimpleLayout {...aboutPageI18n} className="mt-16 sm:mt-32">
      <div className="mt-16 space-y-16">
        <Section title="How I work">
          <ul
            className="space-y-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400"
            role="list"
          >
            {PORTFOLIO_OPERATING_PRINCIPLES.map((principle) => (
              <li key={principle} className="flex gap-3">
                <span aria-hidden="true" className="text-zinc-400">
                  +
                </span>
                <span>{principle}</span>
              </li>
            ))}
          </ul>
        </Section>
        <Section title="What I like building">
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
      </div>
    </SimpleLayout>
  );
}
