/* eslint-disable react-refresh/only-export-components */

/**
 * @file apps/web/src/app/(blog)/uses/page.tsx
 * @author Guy Romelle Magayano
 * @description Implementation for page.
 */
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

import logger from "@portfolio/logger";

import { SimpleLayout } from "@web/components/layout";
import { type CommonLayoutComponentData } from "@web/data/page";
import { getSafeHeroMessages, normalizeError } from "@web/utils/error";

const USES_PAGE_I18N_NAMESPACE = "page.uses.labels";
const USES_PAGE_I18N_FALLBACK: CommonLayoutComponentData = {
  subheading: "Uses",
  title: "Software I use, gadgets I love, and other things I recommend.",
  intro:
    "I get asked a lot about the things I use to build software, stay productive, or buy to fool myself into thinking I’m being productive when I’m really just procrastinating. Here’s a big list of all of my favorite stuff.",
};

export const metadata: Metadata = {
  title: USES_PAGE_I18N_FALLBACK.subheading,
  description: USES_PAGE_I18N_FALLBACK.intro,
};
export const dynamic = "force-dynamic";

export default async function UsesPage() {
  // Internationalization
  const usesPageI18n: CommonLayoutComponentData = await getTranslations(
    USES_PAGE_I18N_NAMESPACE
  )
    .then((data) => ({
      subheading: getSafeHeroMessages(
        USES_PAGE_I18N_NAMESPACE,
        data,
        "subheading",
        USES_PAGE_I18N_FALLBACK.subheading
      ),
      title: getSafeHeroMessages(
        USES_PAGE_I18N_NAMESPACE,
        data,
        "title",
        USES_PAGE_I18N_FALLBACK.title
      ),
      intro: getSafeHeroMessages(
        USES_PAGE_I18N_NAMESPACE,
        data,
        "description",
        USES_PAGE_I18N_FALLBACK.intro
      ),
    }))
    .catch((err) => {
      const normalizedErr = normalizeError(err);

      if (normalizedErr.isDynamicServerUsage) {
        return USES_PAGE_I18N_FALLBACK;
      }

      logger.error("Uses page translations failed to load", normalizedErr, {
        component: "web.app.uses.page",
        operation: "getUsesPageI18n",
        metadata: {
          namespace: USES_PAGE_I18N_NAMESPACE,
        },
      });

      return USES_PAGE_I18N_FALLBACK;
    });

  return <SimpleLayout {...usesPageI18n} className="mt-16 sm:mt-32" />;
}
