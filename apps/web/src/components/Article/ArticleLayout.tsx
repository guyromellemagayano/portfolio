import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import { logger } from "@guyromellemagayano/logger";
import {
  createComponentProps,
  formatDateSafely,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Container, Prose } from "@web/components";
import { type ArticleWithSlug, cn, validateArticle } from "@web/utils";

import { ArticleNavButton } from "./ArticleNavButton";
import { ARTICLE_COMPONENT_LABELS } from "./i18n/Article.i18n";

// ============================================================================
// ARTICLE LAYOUT COMPONENT TYPES & INTERFACES
// ============================================================================

/** `ArticleLayout` component props. */
export interface ArticleLayoutProps
  extends React.ComponentProps<typeof Container>,
    CommonComponentProps {
  /** The article to display. */
  article?: ArticleWithSlug;
}

/** `ArticleLayout` component type. */
export type ArticleLayoutComponent = React.FC<ArticleLayoutProps>;

// ============================================================================
// BASE ARTICLE LAYOUT COMPONENT
// ============================================================================

/** A component that provides a consistent layout for an article. */
const BaseArticleLayout: ArticleLayoutComponent = setDisplayName(
  function BaseArticleLayout(props) {
    const { article, children, className, debugId, debugMode, ...rest } = props;

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    if (!article || !children) return null;

    const isValidArticleData = validateArticle(article);
    if (!isValidArticleData) {
      logger.warn(
        `${(BaseArticleLayout as unknown as { displayName: string }).displayName}: ${ARTICLE_COMPONENT_LABELS.invalidArticleData}`,
        {
          article,
        }
      );
    }

    const articleData = {
      title: article.title.trim(),
      date: article.date.trim(),
    };

    const element = (
      <Container
        {...rest}
        role="main"
        className={cn("mt-16 lg:mt-32", className)}
        debugId={debugId}
        debugMode={debugMode}
        aria-label={ARTICLE_COMPONENT_LABELS.articleLayout}
        aria-labelledby={`${componentId}-article-layout-heading`}
      >
        <div
          role="region"
          className="xl:relative"
          aria-label={ARTICLE_COMPONENT_LABELS.articleContent}
          {...createComponentProps(componentId, "article-wrapper", isDebugMode)}
        >
          <div
            role="region"
            className="mx-auto max-w-2xl"
            aria-label={ARTICLE_COMPONENT_LABELS.articleLayout}
            {...createComponentProps(
              componentId,
              "article-content",
              isDebugMode
            )}
          >
            <ArticleNavButton debugMode={debugMode} debugId={debugId} />

            {article ? (
              <article
                role="article"
                id={`${componentId}-article`}
                aria-labelledby={
                  articleData.title.length > 0
                    ? `${componentId}-article-title`
                    : undefined
                }
                aria-describedby={
                  articleData.date.length > 0
                    ? `${componentId}-article-date`
                    : undefined
                }
                {...createComponentProps(componentId, "article", isDebugMode)}
              >
                <header
                  role="banner"
                  id={`${componentId}-article-header`}
                  className="flex flex-col"
                  aria-label={ARTICLE_COMPONENT_LABELS.articleHeader}
                  {...createComponentProps(
                    componentId,
                    "article-header",
                    isDebugMode
                  )}
                >
                  {articleData.title.length > 0 ? (
                    <h1
                      id={`${componentId}-article-title`}
                      className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
                      aria-level={1}
                      {...createComponentProps(
                        componentId,
                        "article-title",
                        isDebugMode
                      )}
                    >
                      {articleData.title}
                    </h1>
                  ) : null}

                  {articleData.date.length > 0 ? (
                    <time
                      id={`${componentId}-article-date`}
                      className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                      dateTime={articleData.date}
                      aria-label={`${ARTICLE_COMPONENT_LABELS.articleDate} ${formatDateSafely(articleData.date)}`}
                      {...createComponentProps(
                        componentId,
                        "article-date",
                        isDebugMode
                      )}
                    >
                      <span
                        className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                        aria-hidden="true"
                        {...createComponentProps(
                          componentId,
                          "date-separator",
                          isDebugMode
                        )}
                      />
                      <span
                        className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                        aria-label={ARTICLE_COMPONENT_LABELS.articlePublished}
                        {...createComponentProps(
                          componentId,
                          "date-text",
                          isDebugMode
                        )}
                      >
                        {formatDateSafely(articleData.date)}
                      </span>
                    </time>
                  ) : null}
                </header>

                {children ? (
                  <Prose
                    role="region"
                    id={`${componentId}-article-prose`}
                    className="mx-auto max-w-2xl"
                    aria-label={ARTICLE_COMPONENT_LABELS.articleContent}
                    aria-labelledby={
                      articleData.title.length > 0
                        ? `${componentId}-article-title`
                        : undefined
                    }
                    debugId={componentId}
                    debugMode={debugMode}
                  >
                    {children}
                  </Prose>
                ) : null}
              </article>
            ) : children ? (
              <Prose
                role="region"
                id={`${componentId}-article-prose`}
                className="mx-auto max-w-2xl"
                aria-label={ARTICLE_COMPONENT_LABELS.articleContent}
                debugId={componentId}
                debugMode={debugMode}
              >
                {children}
              </Prose>
            ) : null}
          </div>
        </div>
      </Container>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED ARTICLE LAYOUT COMPONENT
// ============================================================================

/** A memoized article layout component. */
const MemoizedArticleLayout = React.memo(BaseArticleLayout);

// ============================================================================
// MAIN ARTICLE LAYOUT COMPONENT
// ============================================================================

/** A component that provides a consistent layout for an article. */
export const ArticleLayout: ArticleLayoutComponent = setDisplayName(
  function ArticleLayout(props) {
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedArticleLayout : BaseArticleLayout;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);
