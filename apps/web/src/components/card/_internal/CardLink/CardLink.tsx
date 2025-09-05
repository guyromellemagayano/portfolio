import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  isRenderableContent,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import styles from "./CardLink.module.css";
import { CardLinkCustom } from "./CardLinkCustom";

// ============================================================================
// BASE CARD LINK COMPONENT
// ============================================================================

interface CardLinkProps
  extends React.ComponentPropsWithRef<"div">,
    Omit<
      React.ComponentPropsWithoutRef<typeof CardLinkCustom>,
      keyof React.ComponentPropsWithRef<"div">
    > {}
type CardLinkComponent = React.FC<CardLinkProps>;

/** A background and clickable wrapper for card links. */
const BaseCardLink: CardLinkComponent = setDisplayName(
  function BaseCardLink(props) {
    const {
      children,
      className,
      href,
      target,
      title,
      _internalId,
      _debugMode,
      ...rest
    } = props;

    const element = (
      <>
        <div
          {...rest}
          className={cn(styles.cardLinkBackground, className)}
          data-card-link-id={`${_internalId}-card-link`}
          data-debug-mode={_debugMode ? "true" : undefined}
          data-testid="card-link-root"
        />
        {isValidLink(href) ? (
          <CardLinkCustom
            href={href}
            target={target}
            title={title}
            _internalId={_internalId}
            _debugMode={_debugMode}
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
  const {
    children,
    href,
    isMemoized = false,
    _internalId,
    _debugMode,
    ...rest
  } = props;

  const { id, isDebugMode } = useComponentId({
    internalId: _internalId,
    debugMode: _debugMode,
  });

  if (!isRenderableContent(children)) return null;

  const updatedProps = {
    ...rest,
    href,
    _internalId: id,
    _debugMode: isDebugMode,
  };

  const Component = isMemoized ? MemoizedCardLink : BaseCardLink;
  const element = <Component {...updatedProps}>{children}</Component>;
  return element;
});

export { CardLink };
