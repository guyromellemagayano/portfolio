import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { type CardEyebrowComponent } from "@web/components/_shared";
import { cn } from "@web/utils";

import styles from "./CardEyebrow.module.css";

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
      debugId,
      debugMode,
      dateTime,
      decorate,
      ...rest
    } = props;

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    if (!children) return null;

    const element = (
      <Component
        {...rest}
        className={cn(
          styles.cardEyebrow,
          decorate && styles.cardEyebrowDecorated,
          className
        )}
        {...createComponentProps(componentId, "card-eyebrow", isDebugMode)}
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
const CardEyebrow: CardEyebrowComponent = setDisplayName(
  function CardEyebrow(props) {
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedCardEyebrow : BaseCardEyebrow;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);

export default CardEyebrow;
