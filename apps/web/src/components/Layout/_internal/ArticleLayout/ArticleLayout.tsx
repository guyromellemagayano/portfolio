import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  formatDateSafely,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Button, Container, Prose } from "@web/components";
import { type ArticleWithSlug, cn } from "@web/utils";

import { LAYOUT_I18N } from "../../Layout.i18n";

// ============================================================================
// ARTICLE LAYOUT COMPONENT TYPES & INTERFACES
// ============================================================================

export interface ArticleLayoutProps
  extends React.ComponentPropsWithRef<typeof Container>,
    CommonComponentProps {
  /** The article to display. */
  article?: ArticleWithSlug;
}
export type ArticleLayoutComponent = React.FC<ArticleLayoutProps>;

// ============================================================================
// BASE ARTICLE LAYOUT COMPONENT
// ============================================================================

const BaseArticleLayout: ArticleLayoutComponent = setDisplayName(
  function BaseArticleLayout(props) {
    const {
      as: Component = Container,
      article,
      children,
      className,
      debugId,
      debugMode,
      ...rest
    } = props;

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    if (!article || !children) return null;

    const articleData = {
      title: article.title.trim(),
      date: article.date.trim(),
    };

    const element = (
      <Component
        {...rest}
        role="main"
        className={cn("mt-16 lg:mt-32", className)}
        debugId={debugId}
        debugMode={debugMode}
        aria-label={LAYOUT_I18N.articleLayout}
        aria-labelledby={`${componentId}-article-layout-heading`}
      >
        <div
          role="region"
          className="xl:relative"
          aria-label={LAYOUT_I18N.articleContent}
          {...createComponentProps(componentId, "article-wrapper", isDebugMode)}
        >
          <div
            role="region"
            className="mx-auto max-w-2xl"
            aria-label={LAYOUT_I18N.articleLayout}
            {...createComponentProps(
              componentId,
              "article-content",
              isDebugMode
            )}
          >
            <Button.ArticleNav debugMode={debugMode} debugId={debugId} />

            {article ? (
              <article
                role="article"
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
                  className="flex flex-col"
                  aria-label={LAYOUT_I18N.articleHeader}
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
                      aria-label={`${LAYOUT_I18N.articleDate} ${formatDateSafely(articleData.date)}`}
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
                        aria-label={LAYOUT_I18N.articlePublished}
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
                    className="mx-auto max-w-2xl"
                    aria-label={LAYOUT_I18N.articleContent}
                    aria-labelledby={
                      articleData.title.length > 0
                        ? `${componentId}-article-prose-title`
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
                className="mx-auto max-w-2xl"
                aria-label={LAYOUT_I18N.articleContent}
                debugId={componentId}
                debugMode={debugMode}
              >
                {children}
              </Prose>
            ) : null}
          </div>
        </div>
      </Component>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED ARTICLE LAYOUT COMPONENT
// ============================================================================

const MemoizedArticleLayout = React.memo(BaseArticleLayout);

// ============================================================================
// MAIN ARTICLE LAYOUT COMPONENT
// ============================================================================

export const ArticleLayout: ArticleLayoutComponent = setDisplayName(
  function ArticleLayout(props) {
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedArticleLayout : BaseArticleLayout;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);
