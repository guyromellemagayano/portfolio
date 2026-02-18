/* eslint-disable react-refresh/only-export-components */

/**
 * @file (blog)/uses/page.tsx
 * @author Guy Romelle Magayano
 * @description Uses page component.
 */
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { SimpleLayout } from "@web/components/layout";
import { type CommonLayoutComponentData } from "@web/data/page";

export const metadata: Metadata = {
  title: "Uses",
  description: "Software I use, gadgets I love, and other things I recommend.",
};

export default async function UsesPage() {
  // Internationalization
  const usesPageI18n = (await getTranslations("page.uses.labels").then(
    (data) => ({
      subheading: data?.("subheading"),
      title: data?.("title"),
      intro: data?.("description"),
    })
  )) as CommonLayoutComponentData;

  return <SimpleLayout {...usesPageI18n} className="mt-16 sm:mt-32" />;
}
