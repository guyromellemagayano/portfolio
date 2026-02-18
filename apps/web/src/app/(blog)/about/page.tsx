/* eslint-disable react-refresh/only-export-components */

/**
 * @file (blog)/about/page.tsx
 * @author Guy Romelle Magayano
 * @description About page component.
 */
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

import logger from "@portfolio/logger";

import { SimpleLayout } from "@web/components/layout";
import { type CommonLayoutComponentData } from "@web/data/page";
import { getSafeHeroMessages, normalizeError } from "@web/utils/error";

const ABOUT_PAGE_I18N_NAMESPACE = "page.about.labels";
const ABOUT_PAGE_I18N_FALLBACK: CommonLayoutComponentData = {
  subheading: "About",
  title:
    "I’m Spencer Sharp. I live in New York City, where I design the future.",
  intro:
    "Creating technology to empower civilians to explore space on their own terms. From software design to hardware engineering, I'm dedicated to pushing the boundaries of what's possible in the final frontier.",
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

  return <SimpleLayout {...aboutPageI18n} className="mt-16 sm:mt-32" />;
}
