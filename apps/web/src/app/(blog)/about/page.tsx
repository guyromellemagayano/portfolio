/* eslint-disable react-refresh/only-export-components */

/**
 * @file (blog)/about/page.tsx
 * @author Guy Romelle Magayano
 * @description About page component.
 */
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Container } from "@web/components/container";
import { SimpleLayout } from "@web/components/layout";
import { type CommonLayoutComponentData } from "@web/data/page";

export const metadata: Metadata = {
  title: "About",
  description:
    "I’m Spencer Sharp. I live in New York City, where I design the future.",
};

export default async function AboutPage() {
  // Internationalization
  const aboutPageI18n = (await getTranslations("page.about.labels").then(
    (data) => ({
      subheading: data?.("subheading"),
      title: data?.("title"),
      intro: [data?.("description")].join(""),
    })
  )) as CommonLayoutComponentData;

  return (
    <SimpleLayout {...aboutPageI18n} className="mt-16 sm:mt-32">
      <Container></Container>
    </SimpleLayout>
  );
}
