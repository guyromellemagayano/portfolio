/* eslint-disable react-refresh/only-export-components */
/* eslint-disable simple-import-sort/imports */

/**
 * @file apps/web/src/app/(blog)/page.tsx
 * @author Guy Romelle Magayano
 * @description Implementation for page.
 */

import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

import logger from "@portfolio/logger";

import { Container } from "@web/components/container";
import { SimpleLayout } from "@web/components/layout";
import { SocialLink } from "@web/components/link";
import {
  ArticleList,
  ArticleListItem,
  SocialList,
  SocialListItem,
} from "@web/components/list";
import { PhotoGallery } from "@web/components/photo-gallery";
import {
  SOCIAL_LIST_COMPONENT_LABELS,
  type CommonLayoutComponentData,
} from "@web/data/page";
import { getAllArticles } from "@web/utils/articles";
import { getSafeHeroMessages, normalizeError } from "@web/utils/error";

const HOME_PAGE_I18N_NAMESPACE = "page.home.labels";
const HOME_PAGE_I18N_FALLBACK: CommonLayoutComponentData = {
  title: "Software designer, founder, and amateur astronaut.",
  intro:
    "I’m Spencer, a software designer and entrepreneur based in New York City. I’m the founder and CEO of Planetaria, where we develop technologies that empower regular people to explore space on their own terms.",
};

const List = {
  Article: ArticleList,
  Social: SocialList,
} as const;

const ListItem = {
  Article: ArticleListItem,
  Social: SocialListItem,
} as const;

export const metadata: Metadata = {
  title: {
    template: "%s - Guy Romelle Magayano",
    default:
      "Guy Romelle Magayano - Software designer, founder, and amateur astronaut",
  },
  description:
    "I’m Guy Romelle Magayano, a software designer and entrepreneur based in New York City. I’m the founder and CEO of Planetaria, where we develop technologies that empower regular people to explore space on their own terms.",
  alternates: {
    types: {
      "application/rss+xml": `${globalThis?.process?.env?.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
};
export const dynamic = "force-dynamic";

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

  return (
    <>
      <SimpleLayout {...pageI18n} className="mt-9">
        {SOCIAL_LIST_COMPONENT_LABELS?.length > 0 ? (
          <List.Social className="mt-6 flex gap-6">
            {SOCIAL_LIST_COMPONENT_LABELS.filter(
              ({ icon }) => icon !== "mail"
            ).map((value, index) => (
              <ListItem.Social
                key={`${value.icon}-${index}`}
                className="group -m-1 p-1"
              >
                <SocialLink {...value} />
              </ListItem.Social>
            ))}
          </List.Social>
        ) : null}
      </SimpleLayout>
      <PhotoGallery />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <ArticleList className="flex flex-col gap-16 border-none!">
            {articles?.map((article, index) => (
              <ArticleListItem
                key={`${article.slug}-${index}`}
                article={article}
              />
            ))}
          </ArticleList>
          <div className="space-y-10 lg:pl-16 xl:pl-24"></div>
        </div>
      </Container>
    </>
  );
}
