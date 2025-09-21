import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Container, Prose } from "@web/components";
import { type ArticleWithSlug, cn, formatDate } from "@web/utils";

import { ARTICLE_COMPONENT_LABELS } from "../_shared";
import { ArticleNavButton } from "../ArticleNavButton";
import styles from "./ArticleLayout.module.css";

// ============================================================================
// ARTICLE LAYOUT COMPONENT TYPES & INTERFACES
// ============================================================================

interface ArticleLayoutProps
  extends React.ComponentProps<typeof Container>,
    CommonComponentProps {
  /** The article to display. */
  article?: ArticleWithSlug;
}
type ArticleLayoutComponent = React.FC<ArticleLayoutProps>;

// ============================================================================
// BASE ARTICLE LAYOUT COMPONENT
// ============================================================================

/** A component that provides a consistent layout for an article. */
const BaseArticleLayout: ArticleLayoutComponent = setDisplayName(
  function BaseArticleLayout(props) {
    const { article, children, className, internalId, debugMode, ...rest } =
      props;

    if (!article && !children) return null;

    let trimmedTitle = article?.title?.trim() ?? "";
    let trimmedDate = article?.date?.trim() ?? "";

    const element = (
      <Container
        {...rest}
        className={cn(styles.articleLayoutContainer, className)}
        internalId={internalId}
        debugMode={debugMode}
      >
        <div
          className={styles.articleWrapper}
          role="main"
          aria-label={ARTICLE_COMPONENT_LABELS.articleContent}
          {...createComponentProps(internalId, "article-wrapper", debugMode)}
        >
          <div
            className={styles.articleContent}
            role="region"
            aria-label={ARTICLE_COMPONENT_LABELS.articleLayout}
            {...createComponentProps(internalId, "article-content", debugMode)}
          >
            <ArticleNavButton debugMode={debugMode} internalId={internalId} />

            {article ? (
              <article
                role="article"
                aria-labelledby={
                  trimmedTitle.length > 0
                    ? `${internalId}-article-title`
                    : undefined
                }
                aria-describedby={
                  trimmedDate.length > 0
                    ? `${internalId}-article-date`
                    : undefined
                }
                {...createComponentProps(internalId, "article", debugMode)}
              >
                <header
                  className={cn(styles.articleHeader, "flex flex-col")}
                  role="banner"
                  aria-label={ARTICLE_COMPONENT_LABELS.articleHeader}
                  {...createComponentProps(
                    internalId,
                    "article-header",
                    debugMode
                  )}
                >
                  {trimmedTitle.length > 0 ? (
                    <h1
                      id={`${internalId}-article-title`}
                      className={styles.articleTitle}
                      aria-level={1}
                      {...createComponentProps(
                        internalId,
                        "article-title",
                        debugMode
                      )}
                    >
                      {trimmedTitle}
                    </h1>
                  ) : null}

                  {trimmedDate.length > 0 ? (
                    <time
                      id={`${internalId}-article-date`}
                      dateTime={trimmedDate}
                      className={styles.articleDate}
                      aria-label={`Published on ${formatDate(trimmedDate)}`}
                      {...createComponentProps(
                        internalId,
                        "article-date",
                        debugMode
                      )}
                    >
                      <span
                        className={styles.dateSeparator}
                        aria-hidden="true"
                        {...createComponentProps(
                          internalId,
                          "date-separator",
                          debugMode
                        )}
                      />
                      <span
                        className={styles.dateText}
                        aria-label="Publication date"
                        {...createComponentProps(
                          internalId,
                          "date-text",
                          debugMode
                        )}
                      >
                        {formatDate(trimmedDate)}
                      </span>
                    </time>
                  ) : null}
                </header>

                {children ? (
                  <Prose
                    className={styles.articleProse}
                    role="region"
                    aria-label={ARTICLE_COMPONENT_LABELS.articleContent}
                    aria-labelledby={
                      trimmedTitle.length > 0
                        ? `${internalId}-article-title`
                        : undefined
                    }
                    debugMode={debugMode}
                    internalId={internalId}
                  >
                    {children}
                  </Prose>
                ) : null}
              </article>
            ) : children ? (
              <Prose
                className={styles.articleProse}
                role="region"
                aria-label={ARTICLE_COMPONENT_LABELS.articleContent}
                debugMode={debugMode}
                internalId={internalId}
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
const ArticleLayout: ArticleLayoutComponent = setDisplayName(
  function ArticleLayout(props) {
    const {
      children,
      isMemoized = false,
      internalId,
      debugMode,
      ...rest
    } = props;

    const { id, isDebugMode } = useComponentId({
      internalId,
      debugMode,
    });

    const updatedProps = {
      ...rest,
      internalId: id,
      debugMode: isDebugMode,
    };

    const Component = isMemoized ? MemoizedArticleLayout : BaseArticleLayout;
    const element = <Component {...updatedProps}>{children}</Component>;
    return element;
  }
);

export default ArticleLayout;
