"use client";

import { useContext } from "react";

import { useRouter } from "next/navigation";

import {
  Article,
  Button,
  Div,
  Header,
  Heading,
  Span,
  SvgProps,
  Time,
} from "@guyromellemagayano/components";

import { AppContext } from "@web/app/context";
import { Container, type ContainerProps } from "@web/components/container";
import { Prose } from "@web/components/prose";
import { cn, formatDate } from "@web/lib";
import type { ArticleWithSlug } from "@web/lib/articles";

interface ArrowLeftIconProps extends SvgProps {}

const ArrowLeftIcon = (props: ArrowLeftIconProps) => {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export interface ArticleLayoutProps extends ContainerProps {
  /**
   * The article to display.
   */
  article: ArticleWithSlug;
}

/**
 * A layout component for an article.
 */
export const ArticleLayout = (props: ArticleLayoutProps) => {
  const { children, className, article, ...rest } = props;

  let router = useRouter();
  let { previousPathname } = useContext(AppContext);

  return (
    <Container className={cn("mt-16 lg:mt-32", className)} {...rest}>
      <Div className="xl:relative">
        <Div className="mx-auto max-w-2xl">
          {previousPathname && (
            <Button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back to articles"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
            </Button>
          )}

          <Article>
            <Header className="flex flex-col">
              <Heading
                as={"h1"}
                className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
              >
                {article.title}
              </Heading>
              <Time
                dateTime={article.date}
                className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
              >
                <Span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                <Span className="ml-3">{formatDate(article.date)}</Span>
              </Time>
            </Header>
            <Prose className="mt-8" data-mdx-content>
              {children}
            </Prose>
          </Article>
        </Div>
      </Div>
    </Container>
  );
};

ArticleLayout.displayName = "ArticleLayout";
