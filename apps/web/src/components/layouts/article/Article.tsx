"use client";

import React, { useContext } from "react";

import { useRouter } from "next/navigation";

import {
  Article,
  Button,
  Div,
  Header,
  Heading,
  Span,
  Time,
} from "@guyromellemagayano/components";

import { AppContext } from "@web/app/context";
import { Container, Prose } from "@web/components";
import { ArrowLeftIcon } from "@web/components/layouts/article/_internal";
import type {
  ArticleLayoutProps,
  ArticleLayoutRef,
} from "@web/components/layouts/article/models";
import { cn, formatDate } from "@web/lib";

/** A layout component for an article. */
export const ArticleLayout = React.forwardRef<
  ArticleLayoutRef,
  ArticleLayoutProps
>(function ArticleLayout(props, ref) {
  const { children, className, article, ...rest } = props;

  let router = useRouter();
  let { previousPathname } = useContext(AppContext);

  const element = (
    <Container ref={ref} className={cn("mt-16 lg:mt-32", className)} {...rest}>
      <Div className="xl:relative">
        <Div className="mx-auto max-w-2xl">
          {previousPathname && (
            <Button
              type="button"
              aria-label="Go back to articles"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
              onClick={() => router.back()}
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
            </Button>
          )}

          {(article || children) && (
            <Article>
              <Header className="flex flex-col">
                {article?.title && (
                  <Heading
                    as={"h1"}
                    className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
                  >
                    {article.title}
                  </Heading>
                )}

                {article?.date && (
                  <Time
                    dateTime={article.date}
                    className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                  >
                    <Span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                    <Span className="ml-3">{formatDate(article.date)}</Span>
                  </Time>
                )}
              </Header>

              {children && (
                <Prose className="mt-8" data-mdx-content>
                  {children}
                </Prose>
              )}
            </Article>
          )}
        </Div>
      </Div>
    </Container>
  );

  return element;
});
