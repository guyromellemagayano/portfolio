import React from "react";

import { CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  isRenderableContent,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { CardLinkCustom } from "./CardLinkCustom";
import styles from "./styles/CardLink.module.css";

// ============================================================================
// CARD LINK COMPONENT TYPES & INTERFACES
// ============================================================================

interface CardLinkProps
  extends React.ComponentPropsWithRef<"div">,
    Omit<
      React.ComponentPropsWithoutRef<typeof CardLinkCustom>,
      keyof React.ComponentPropsWithRef<"div">
    >,
    Omit<CommonComponentProps, "as"> {}
type CardLinkComponent = React.FC<CardLinkProps>;

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
      _internalId,
      _debugMode,
      ...rest
    } = props;

    const element = (
      <>
        <div
          {...rest}
          className={cn(styles.cardLinkBackground, className)}
          {...createComponentProps(_internalId, "card-link", _debugMode)}
        />
        {href && isValidLink(href) ? (
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
export const CardLink: CardLinkComponent = setDisplayName(
  function CardLink(props) {
    const {
      children,
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
      _internalId: id,
      _debugMode: isDebugMode,
    };

    const Component = isMemoized ? MemoizedCardLink : BaseCardLink;
    const element = <Component {...updatedProps}>{children}</Component>;
    return element;
  }
);
