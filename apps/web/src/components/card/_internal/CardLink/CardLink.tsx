import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { type CardLinkComponent } from "@web/components/_shared";
import { cn } from "@web/utils";

import styles from "./CardLink.module.css";
import CardLinkCustom from "./CardLinkCustom";

// ============================================================================
// BASE CARD LINK COMPONENT
// ============================================================================

/** A background and clickable wrapper for card links. */
const BaseCardLink: CardLinkComponent = setDisplayName(
  function BaseCardLink(props) {
    const {
      children,
      className,
      href,
      target,
      title,
      debugId,
      debugMode,
      ...rest
    } = props;

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    if (!children) return null;

    const element = (
      <>
        <div
          {...rest}
          className={cn(styles.cardLinkBackground, className)}
          {...createComponentProps(componentId, "card-link", isDebugMode)}
        />
        {href && isValidLink(href) ? (
          <CardLinkCustom
            href={href}
            target={target}
            title={title}
            debugId={componentId}
            debugMode={isDebugMode}
          >
            <span className={styles.cardLinkClickableArea} />
            <span className={styles.cardLinkContent}>{children}</span>
          </CardLinkCustom>
        ) : (
          children
        )}
      </>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED CARD LINK COMPONENT
// ============================================================================

/** A memoized card link component. */
const MemoizedCardLink = React.memo(BaseCardLink);

// ============================================================================
// MAIN CARD LINK COMPONENT
// ============================================================================

/** A card link component that can optionally be wrapped in a link for navigation */
const CardLink: CardLinkComponent = setDisplayName(function CardLink(props) {
  const { children, isMemoized = false, ...rest } = props;

  const Component = isMemoized ? MemoizedCardLink : BaseCardLink;
  const element = <Component {...rest}>{children}</Component>;
  return element;
});

export default CardLink;
