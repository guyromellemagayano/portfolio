import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import { setDisplayName } from "@guyromellemagayano/utils";

import { Card } from "@web/components";
import { type ArticleWithSlug, cn, formatDate } from "@web/utils";

import { ARTICLE_COMPONENT_LABELS } from "../_shared";
import styles from "./ArticleBase.module.css";

// ============================================================================
// ARTICLE BASE COMPONENT TYPES & INTERFACES
// ============================================================================

interface ArticleBaseProps
  extends React.ComponentPropsWithRef<typeof Card>,
    CommonComponentProps {
  article: ArticleWithSlug;
}
type ArticleBaseComponent = React.FC<ArticleBaseProps>;

// ============================================================================
// BASE ARTICLE BASE COMPONENT
// ============================================================================

/**
 * A presentational component that displays an article's title, date, description, and a
 * call-to-action inside a `Card` component.
 */
const BaseArticleBase: ArticleBaseComponent = setDisplayName(
  function BaseArticleBase(props) {
    const { article, className, internalId, debugMode, ...rest } = props;

    if (!article || typeof article !== "object") return null;

    let trimmedTitle = article.title?.trim() ?? "";
    let trimmedSlug = article.slug?.trim() ?? "";
    let trimmedDate = article.date?.trim() ?? "";
    let trimmedDescription = article.description?.trim() ?? "";

    const articleSlug = encodeURIComponent(`/articles/${trimmedSlug}`);

    const element = (
      <Card
        {...rest}
        className={cn(styles.articleBaseContainer, className)}
        internalId={internalId}
        debugMode={debugMode}
        role="article"
        aria-labelledby={
          trimmedTitle.length > 0 ? `${internalId}-article-title` : undefined
        }
        aria-describedby={
          trimmedDescription.length > 0
            ? `${internalId}-article-description`
            : undefined
        }
      >
        {trimmedTitle.length > 0 ? (
          <Card.Title
            href={articleSlug}
            internalId={internalId}
            debugMode={debugMode}
            id={`${internalId}-article-title`}
            aria-level={1}
          >
            {trimmedTitle}
          </Card.Title>
        ) : null}

        {trimmedDate.length > 0 && !isNaN(new Date(trimmedDate).getTime()) ? (
          <Card.Eyebrow
            as="time"
            dateTime={trimmedDate}
            internalId={internalId}
            debugMode={debugMode}
            decorate
            aria-label={`${ARTICLE_COMPONENT_LABELS.articleDate} ${formatDate(trimmedDate)}`}
          >
            {formatDate(trimmedDate)}
          </Card.Eyebrow>
        ) : null}

        {trimmedDescription.length > 0 ? (
          <Card.Description
            internalId={internalId}
            debugMode={debugMode}
            id={`${internalId}-article-description`}
          >
            {trimmedDescription}
          </Card.Description>
        ) : null}

        <Card.Cta
          internalId={internalId}
          debugMode={debugMode}
          role="button"
          aria-label={`${ARTICLE_COMPONENT_LABELS.cta}: ${trimmedTitle || "Article"}`}
        >
          {ARTICLE_COMPONENT_LABELS.cta}
        </Card.Cta>
      </Card>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED ARTICLE BASE COMPONENT
// ============================================================================

/** A memoized article component. */
const MemoizedArticleBase = React.memo(BaseArticleBase);

// ============================================================================
// MAIN ARTICLE BASE COMPONENT
// ============================================================================

/** Main article base component that renders an article card component, optionally memoized. */
const ArticleBase: ArticleBaseComponent = setDisplayName(
  function ArticleBase(props) {
    const { isMemoized = false, internalId, debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId,
      debugMode,
    });

    const updatedProps = {
      ...rest,
      internalId: id,
      debugMode: isDebugMode,
    };

    const Component = isMemoized ? MemoizedArticleBase : BaseArticleBase;
    const element = <Component {...updatedProps} />;
    return element;
  }
);

export default ArticleBase;
