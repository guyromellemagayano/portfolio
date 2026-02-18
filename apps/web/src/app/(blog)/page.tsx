/* eslint-disable react-refresh/only-export-components */

/**
 * @file (blog)/page.tsx
 * @author Guy Romelle Magayano
 * @description Home page component.
 */

import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { logError } from "@portfolio/logger";

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
  CommonLayoutComponentData,
  SOCIAL_LIST_COMPONENT_LABELS,
} from "@web/data/page";
import { getAllArticles } from "@web/utils/articles";

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

export default async function HomePage() {
  // Fetch the articles
  let articles = await getAllArticles()
    .then((data) => data?.slice(0, 3) ?? [])
    .catch((error) => {
      logError(error);

      return [];
    });

  // Internationalization
  const pageI18n = (await getTranslations("page.home.labels").then((data) => ({
    title: data?.("title"),
    intro: data?.("description"),
  }))) as CommonLayoutComponentData;

  return (
    <>
      <SimpleLayout {...pageI18n} className="mt-9">
        {SOCIAL_LIST_COMPONENT_LABELS?.length > 0 ? (
          <SocialList className="mt-6 flex gap-6">
            {SOCIAL_LIST_COMPONENT_LABELS.filter(
              ({ icon }) => icon !== "mail"
            ).map((value, index) => (
              <SocialListItem
                key={`${value.icon}-${index}`}
                className="group -m-1 p-1"
              >
                <SocialLink {...value} />
              </SocialListItem>
            ))}
          </SocialList>
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
