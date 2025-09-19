import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  isRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import styles from "./CardEyebrow.module.css";

// ============================================================================
// CARD EYEBROW COMPONENT TYPES & INTERFACES
// ============================================================================

interface CardEyebrowProps
  extends React.ComponentPropsWithRef<"p">,
    CommonComponentProps {
  /** ISO date string for the eyebrow content */
  dateTime?: string;
  /** Enable decorative styling */
  decorate?: boolean;
}
type CardEyebrowComponent = React.FC<CardEyebrowProps>;

// ============================================================================
// BASE CARD EYEBROW COMPONENT
// ============================================================================

/** A card eyebrow component that can optionally be wrapped in a link for navigation */
const BaseCardEyebrow: CardEyebrowComponent = setDisplayName(
  function BaseCardEyebrow(props) {
    const {
      as: Component = "p",
      children,
      className,
      _internalId,
      _debugMode,
      dateTime,
      decorate,
      ...rest
    } = props;

    const element = (
      <Component
        {...rest}
        className={cn(
          styles.cardEyebrow,
          decorate && styles.cardEyebrowDecorated,
          className
        )}
        {...createComponentProps(_internalId, "card-eyebrow", _debugMode)}
      >
        {dateTime ? <time dateTime={dateTime}>{children}</time> : children}
      </Component>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED CARD EYEBROW COMPONENT
// ============================================================================

/** A memoized card eyebrow component. */
const MemoizedCardEyebrow = React.memo(BaseCardEyebrow);

// ============================================================================
// MAIN CARD EYEBROW COMPONENT
// ============================================================================

/** A card eyebrow component that can optionally be wrapped in a link for navigation */
export const CardEyebrow: CardEyebrowComponent = setDisplayName(
  function CardEyebrow(props) {
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

    const Component = isMemoized ? MemoizedCardEyebrow : BaseCardEyebrow;
    const element = <Component {...updatedProps}>{children}</Component>;
    return element;
  }
);
