"use client";

import { Article, Div } from "@guyromellemagayano/components";

import { Card, SimpleLayout } from "@web/components";
import { type ArticleWithSlug, formatDate } from "@web/utils";

const articleStrings = {
  read: "Read article",
};

interface ArticleSingleProps {
  article: ArticleWithSlug;
}

/**
 * A single article component
 */
const ArticleSingle = function (props: ArticleSingleProps) {
  const { article } = props;

  const articleLink = `/articles/${article.slug}`;

  const element = (
    <Article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        {article.title && article.slug ? (
          <Card.Title href={articleLink}>{article.title}</Card.Title>
        ) : null}
        {article.date && (
          <Card.Eyebrow dateTime={article.date} className="md:hidden" decorate>
            {formatDate(article.date)}
          </Card.Eyebrow>
        )}
        {article.description ? (
          <Card.Description>{article.description}</Card.Description>
        ) : null}
        {article.slug ? (
          <Card.Cta href={articleLink}>{articleStrings.read}</Card.Cta>
        ) : null}
      </Card>

      {article.date && (
        <Card.Eyebrow dateTime={article.date} className="mt-1 max-md:hidden">
          {formatDate(article.date)}
        </Card.Eyebrow>
      )}
    </Article>
  );

  return element;
};

Article.displayName = "Article";

interface ArticlesContentProps {
  articles: ArticleWithSlug[];
}

const pageContent = {
  title:
    "Writing on software design, company building, and the aerospace industry.",
  intro:
    "All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.",
};

export const ArticlesContent = function ({ articles }: ArticlesContentProps) {
  return (
    <SimpleLayout title={pageContent.title} intro={pageContent.intro}>
      <Div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <Div className="flex max-w-3xl flex-col space-y-16">
          {articles.map((article) => (
            <ArticleSingle key={article.slug} article={article} />
          ))}
        </Div>
      </Div>
    </SimpleLayout>
  );
};
