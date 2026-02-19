/* eslint-disable react-refresh/only-export-components */

/**
 * @file (blog)/contact/page.tsx
 * @author Guy Romelle Magayano
 * @description Contact page component.
 */
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

import logger from "@portfolio/logger";

import { SimpleLayout } from "@web/components/layout";
import { type CommonLayoutComponentData } from "@web/data/page";
import { getSafeHeroMessages, normalizeError } from "@web/utils/error";

const CONTACT_PAGE_I18N_NAMESPACE = "page.contact.labels";
const CONTACT_PAGE_I18N_FALLBACK: CommonLayoutComponentData = {
  subheading: "Contact",
  title: "Let's connect and make something awesome together.",
  intro:
    "Have a question, job offer, or collaboration idea? Drop me a message and I'll get back to you as soon as possible.",
};

export const metadata: Metadata = {
  title: CONTACT_PAGE_I18N_FALLBACK.subheading,
  description: CONTACT_PAGE_I18N_FALLBACK.intro,
};
export const dynamic = "force-dynamic";
export const dynamic = "force-dynamic";

export default async function ContactPage() {
  // Internationalization
  const contactPageI18n: CommonLayoutComponentData = await getTranslations(
    CONTACT_PAGE_I18N_NAMESPACE
  )
    .then((data) => ({
      subheading: getSafeHeroMessages(
        CONTACT_PAGE_I18N_NAMESPACE,
        data,
        "subheading",
        CONTACT_PAGE_I18N_FALLBACK.subheading
      ),
      title: getSafeHeroMessages(
        CONTACT_PAGE_I18N_NAMESPACE,
        data,
        "title",
        CONTACT_PAGE_I18N_FALLBACK.title
      ),
      intro: getSafeHeroMessages(
        CONTACT_PAGE_I18N_NAMESPACE,
        data,
        "description",
        CONTACT_PAGE_I18N_FALLBACK.intro
      ),
    }))
    .catch((err) => {
      const normalizedErr = normalizeError(err);

      if (normalizedErr.isDynamicServerUsage) {
        return CONTACT_PAGE_I18N_FALLBACK;
      }

      logger.error("Contact page translations failed to load", normalizedErr, {
        component: "web.app.contact.page",
        operation: "getContactPageI18n",
        metadata: {
          namespace: CONTACT_PAGE_I18N_NAMESPACE,
        },
      });

      return CONTACT_PAGE_I18N_FALLBACK;
    });

  return <SimpleLayout {...contactPageI18n} className="mt-16 sm:mt-32" />;
}
