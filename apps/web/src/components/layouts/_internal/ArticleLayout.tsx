import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  hasAnyRenderableContent,
  hasMeaningfulText,
  isRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Container, Prose } from "@web/components";
import { type ArticleWithSlug, cn, formatDate } from "@web/utils";

import { ArticleNavButton } from "./ArticleNavButton";
import styles from "./styles/ArticleLayout.module.css";

// ============================================================================
// ARTICLE LAYOUT COMPONENT TYPES & INTERFACES
// ============================================================================

interface ArticleLayoutProps
  extends React.ComponentProps<typeof Container>,
    Omit<CommonComponentProps, "as"> {
  /** The article to display. */
  article?: ArticleWithSlug;
}
type ArticleLayoutComponent = React.FC<ArticleLayoutProps>;

// ============================================================================
// BASE ARTICLE LAYOUT COMPONENT
// ============================================================================

/** A layout component for an article. */
const BaseArticleLayout: ArticleLayoutComponent = setDisplayName(
  function BaseArticleLayout(props) {
    const { children, className, article, _internalId, _debugMode, ...rest } =
      props;

    const element = (
      <Container
        {...rest}
        className={cn(styles.articleLayoutContainer, className)}
        {...createComponentProps(_internalId, "article-layout", _debugMode)}
      >
        <div className={styles.articleWrapper}>
          <div className={styles.articleContent}>
            <ArticleNavButton
              _debugMode={_debugMode}
              _internalId={_internalId}
            />
            {(isRenderableContent(article) ||
              hasAnyRenderableContent(children)) && (
              <article>
                <header className="flex flex-col">
                  {article?.title && hasMeaningfulText(article?.title) && (
                    <h1 className={styles.articleTitle}>{article?.title}</h1>
                  )}
                  {article?.date && hasMeaningfulText(article?.date) && (
                    <time
                      dateTime={article.date}
                      className={styles.articleDate}
                    >
                      <span className={styles.dateSeparator} />
                      <span className={styles.dateText}>
                        {formatDate(article.date)}
                      </span>
                    </time>
                  )}
                </header>
                {hasAnyRenderableContent(children) && (
                  <Prose
                    className={styles.articleProse}
                    debugMode={_debugMode}
                    internalId={_internalId}
                    data-mdx-content
                  >
                    {children}
                  </Prose>
                )}
              </article>
            )}
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

/** A layout component for an article. */
export const ArticleLayout: ArticleLayoutComponent = setDisplayName(
  function ArticleLayout(props) {
    const {
      children,
      article,
      isMemoized = false,
      _internalId,
      _debugMode,
      ...rest
    } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    // Return null if both children and article are missing
    if (!hasAnyRenderableContent(children) && !isRenderableContent(article))
      return null;

    const updatedProps = {
      ...rest,
      article,
      _internalId: id,
      _debugMode: isDebugMode,
    };

    const Component = isMemoized ? MemoizedArticleLayout : BaseArticleLayout;
    const element = <Component {...updatedProps}>{children}</Component>;
    return element;
  }
);
