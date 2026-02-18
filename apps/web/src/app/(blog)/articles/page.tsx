/* eslint-disable react-refresh/only-export-components */

/**
 * @file articles/page.tsx
 * @author Guy Romelle Magayano
 * @description Articles page component.
 */

import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ArticleSearch } from "@web/components/article";
import { SimpleLayout } from "@web/components/layout";
import { type CommonLayoutComponentData } from "@web/data/page";
import { getAllArticles } from "@web/utils/articles";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.",
  openGraph: {
    title: "Articles - Guy Romelle Magayano",
    description:
      "Long-form thoughts on programming, leadership, product design, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Articles - Guy Romelle Magayano",
    description:
      "Long-form thoughts on programming, leadership, product design, and more.",
  },
};

export default async function ArticlesPage() {
  let articles = await getAllArticles();

  // Internationalization
  const articlesPageI18n = (await getTranslations("page.articles.labels").then(
    (data) => ({
      subheading: data?.("subheading"),
      title: data?.("title"),
      intro: data?.("description"),
    })
  )) as CommonLayoutComponentData;

  console.log(articles);

  return (
    <SimpleLayout {...articlesPageI18n} className="mt-16 sm:mt-32">
      <ArticleSearch articles={articles} />
    </SimpleLayout>
  );
}
