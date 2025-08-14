"use client";

import React from "react";

import {
  Article,
  Div,
  Header,
  Heading,
  Span,
  Time,
} from "@guyromellemagayano/components";

import { Container, Prose } from "@web/components";
import {
  type ArticleLayoutProps,
  type ArticleLayoutRef,
  ArticleNavButton,
} from "@web/components/layouts/article";
import { cn, formatDate } from "@web/lib";

import styles from "./ArticleLayout.module.css";

/** A layout component for an article. */
export const ArticleLayout = React.forwardRef<
  ArticleLayoutRef,
  ArticleLayoutProps
>(function ArticleLayout(props, ref) {
  const { children, className, article, ...rest } = props;

  if (!article && !children) return null;

  const element = (
    <Container
      ref={ref}
      className={cn(styles.articleLayoutContainer, className)}
      {...rest}
    >
      <Div className={styles.articleWrapper}>
        <Div className={styles.articleContent}>
          <ArticleNavButton />

          {(article || children) && (
            <Article>
              <Header className="flex flex-col">
                {article?.title && (
                  <Heading as={"h1"} className={styles.articleTitle}>
                    {article.title}
                  </Heading>
                )}

                {article?.date && (
                  <Time dateTime={article.date} className={styles.articleDate}>
                    <Span className={styles.dateSeparator} />
                    <Span className={styles.dateText}>
                      {formatDate(article.date)}
                    </Span>
                  </Time>
                )}
              </Header>

              {children && (
                <Prose className={styles.articleProse} data-mdx-content>
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

ArticleLayout.displayName = "ArticleLayout";
