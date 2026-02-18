/* eslint-disable react-refresh/only-export-components */
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

import logger from "@portfolio/logger";

import { SimpleLayout } from "@web/components/layout";
import { type CommonLayoutComponentData } from "@web/data/page";
import { getSafeHeroMessages, normalizeError } from "@web/utils/error";

const PROJECTS_PAGE_I18N_NAMESPACE = "page.projects.labels";
const PROJECTS_PAGE_I18N_FALLBACK: CommonLayoutComponentData = {
  subheading: "Projects",
  title: "Things I’ve made trying to put my dent in the universe.",
  intro:
    "I’ve worked on tons of little projects over the years but these are the ones that I’m most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved.",
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

  return <SimpleLayout {...projectsPageI18n} className="mt-16 sm:mt-32" />;
}
