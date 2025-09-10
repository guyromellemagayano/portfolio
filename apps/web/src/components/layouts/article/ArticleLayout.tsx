import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  hasAnyRenderableContent,
  hasMeaningfulText,
  isRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Container, Prose } from "@web/components";
import { type ArticleWithSlug, cn, formatDate } from "@web/utils";

import { ArticleNavButton } from "./_internal";
import styles from "./ArticleLayout.module.css";

// ============================================================================
// BASE ARTICLE LAYOUT COMPONENT
// ============================================================================
interface ArticleLayoutProps
  extends React.ComponentProps<typeof Container>,
    CommonComponentProps {
  /** The article to display. */
  article?: ArticleWithSlug;
}
type ArticleLayoutComponent = React.FC<ArticleLayoutProps>;

/** A layout component for an article. */
const BaseArticleLayout: ArticleLayoutComponent = setDisplayName(
  function BaseArticleLayout(props) {
    const { children, className, article, internalId, debugMode, ...rest } =
      props;

    const element = (
      <Container
        {...rest}
        className={cn(styles.articleLayoutContainer, className)}
        data-article-layout-id={`${internalId}-article-layout`}
        data-debug-mode={debugMode ? "true" : undefined}
        data-testid="article-layout-root"
      >
        <div className={styles.articleWrapper}>
          <div className={styles.articleContent}>
            <ArticleNavButton _debugMode={debugMode} _internalId={internalId} />
            {(article || children) && (
              <article>
                <header className="flex flex-col">
                  {article?.title && hasMeaningfulText(article.title) && (
                    <h1 className={styles.articleTitle}>{article.title}</h1>
                  )}
                  {article?.date && (
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
                {children && isRenderableContent(children) && (
                  <Prose className={styles.articleProse} data-mdx-content>
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
const ArticleLayout: ArticleLayoutComponent = setDisplayName(
  function ArticleLayout(props) {
    const {
      children,
      article,
      isMemoized = false,
      internalId,
      debugMode,
      ...rest
    } = props;

    const { id, isDebugMode } = useComponentId({
      internalId,
      debugMode,
    });

    if (!hasAnyRenderableContent(article?.title, article?.date, children))
      return null;

    const updatedProps = {
      ...rest,
      article,
      internalId: id,
      debugMode: isDebugMode,
    };

    const Component = isMemoized ? MemoizedArticleLayout : BaseArticleLayout;
    const element = <Component {...updatedProps}>{children}</Component>;
    return element;
  }
);

export { ArticleLayout };
