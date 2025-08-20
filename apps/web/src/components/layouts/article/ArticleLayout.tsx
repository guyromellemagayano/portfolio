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
import { setDisplayName, useComponentId } from "@guyromellemagayano/hooks";

import type { CommonWebAppComponentProps } from "@web/@types/components";
import { AppContext } from "@web/app/context";
import { Container } from "@web/components/container";
import { Icon } from "@web/components/icon";
import { Prose } from "@web/components/prose";
import { type ArticleWithSlug, cn, formatDate } from "@web/lib";

import { ARTICLE_LAYOUT_COMPONENT_LABELS } from "./ArticleLayout.data";
import styles from "./ArticleLayout.module.css";

// ============================================================================
// ARTICLE NAVIGATION BUTTON COMPONENT
// ============================================================================

type ArticleNavButtonRef = React.ComponentRef<typeof Button>;
interface ArticleNavButtonProps
  extends React.ComponentProps<typeof Button>,
    CommonWebAppComponentProps {}

interface InternalArticleNavButtonProps
  extends React.ComponentProps<typeof Button>,
    CommonWebAppComponentProps {
  /** Internal component ID passed from parent */
  componentId?: string;
  /** Internal debug mode passed from parent */
  isDebugMode?: boolean;
}

type InternalArticleNavButtonComponent = React.ForwardRefExoticComponent<
  InternalArticleNavButtonProps & React.RefAttributes<ArticleNavButtonRef>
>;

/** Internal button that navigates to the previous pathname. */
const InternalArticleNavButton = setDisplayName(
  React.forwardRef(function InternalArticleNavButton(props, ref) {
    const { componentId, isDebugMode, ...rest } = props;

    let router = useRouter();
    let { previousPathname } = useContext(AppContext);

    if (!previousPathname) return null;

    const element = (
      <Button
        {...rest}
        ref={ref}
        type="button"
        className={cn(styles.articleNavButton, rest.className)}
        onClick={() => router.back()}
        aria-label={
          rest["aria-label"] || ARTICLE_LAYOUT_COMPONENT_LABELS.goBackToArticles
        }
        data-article-nav-button-id={componentId}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="article-nav-button"
      >
        <Icon.ArrowLeft className={styles.articleNavButtonIcon} />
      </Button>
    );

    return element;
  }),
  "InternalArticleNavButton"
) as InternalArticleNavButtonComponent;

type ArticleNavButtonComponent = React.ForwardRefExoticComponent<
  ArticleNavButtonProps & React.RefAttributes<ArticleNavButtonRef>
>;

/** A button that navigates to the previous pathname. */
export const ArticleNavButton = setDisplayName(
  React.forwardRef(function ArticleNavButton(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;

    // Use shared hook for ID generation and debug logging
    // Component name will be auto-detected from export const declaration
    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <InternalArticleNavButton
        {...rest}
        ref={ref}
        componentId={id}
        isDebugMode={isDebugMode}
      />
    );

    return element;
  }),
  "ArticleNavButton"
) as ArticleNavButtonComponent;

// ============================================================================
// ARTICLE LAYOUT COMPONENT
// ============================================================================

type ArticleLayoutRef = React.ComponentRef<typeof Container>;

interface InternalArticleLayoutProps
  extends React.ComponentProps<typeof Container> {
  /** Internal component ID passed from parent */
  componentId?: string;
  /** Internal debug mode passed from parent */
  isDebugMode?: boolean;
  /** The article to display. */
  article?: ArticleWithSlug;
  /** The content to render inside the layout. */
  children?: React.ReactNode;
}

type InternalArticleLayoutComponent = React.ForwardRefExoticComponent<
  InternalArticleLayoutProps & React.RefAttributes<ArticleLayoutRef>
>;

/** A layout component for an article. */
const InternalArticleLayout = setDisplayName(
  React.forwardRef(function InternalArticleLayout(props, ref) {
    const { children, className, article, componentId, isDebugMode, ...rest } =
      props;

    if (!article && !children) return null;

    const element = (
      <Container
        {...rest}
        ref={ref}
        className={cn(styles.articleLayoutContainer, className)}
        data-article-layout-id={componentId}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="article-layout"
      >
        <Div className={styles.articleWrapper}>
          <Div className={styles.articleContent}>
            <ArticleNavButton />

            {(article || children) && (
              <Article>
                <Header className="flex flex-col">
                  {article?.title && (
                    <Heading as="h1" className={styles.articleTitle}>
                      {article.title}
                    </Heading>
                  )}

                  {article?.date && (
                    <Time
                      dateTime={article.date}
                      className={styles.articleDate}
                    >
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
  }),
  "InternalArticleLayout"
) as InternalArticleLayoutComponent;

interface ArticleLayoutProps extends React.ComponentProps<typeof Container> {
  /** The article to display. */
  article?: ArticleWithSlug;
  /** The content to render inside the layout. */
  children?: React.ReactNode;
}

type ArticleLayoutComponent = React.ForwardRefExoticComponent<
  ArticleLayoutProps & React.RefAttributes<ArticleLayoutRef>
>;

/** A layout component for an article. */
export const ArticleLayout = setDisplayName(
  React.forwardRef(function ArticleLayout(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;

    // Use shared hook for ID generation and debug logging
    // Component name will be auto-detected from export const declaration
    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <InternalArticleLayout
        {...rest}
        ref={ref}
        componentId={id}
        isDebugMode={isDebugMode}
      />
    );

    return element;
  }),
  "ArticleLayout"
) as ArticleLayoutComponent;
