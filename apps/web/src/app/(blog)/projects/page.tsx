/* eslint-disable react-refresh/only-export-components */
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { SimpleLayout } from "@web/components/layout";
import { CommonLayoutComponentData } from "@web/data/page";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I’ve made trying to put my dent in the universe.",
};

export default async function ProjectsPage() {
  // Internationalization
  const projectsPageI18n = (await getTranslations("page.projects.labels").then(
    (data) => ({
      subheading: data?.("subheading"),
      title: data?.("title"),
      intro: data?.("description"),
    })
  )) as CommonLayoutComponentData;

  return <SimpleLayout {...projectsPageI18n} className="mt-16 sm:mt-32" />;
}
