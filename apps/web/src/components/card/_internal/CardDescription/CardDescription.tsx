import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { type CardDescriptionComponent } from "../../../_shared";
import styles from "./CardDescription.module.css";

// ============================================================================
// BASE CARD DESCRIPTION COMPONENT
// ============================================================================

/** A card description component that can optionally be wrapped in a link for navigation */
const BaseCardDescription: CardDescriptionComponent = setDisplayName(
  function BaseCardDescription(props) {
    const {
      as: Component = "p",
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

    if (!children) return null;

    const element = (
      <Component
        {...rest}
        id={`${componentId}-card-description`}
        className={cn(styles.cardDescription, className)}
        {...createComponentProps(componentId, "card-description", isDebugMode)}
      >
        {children}
      </Component>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED CARD DESCRIPTION COMPONENT
// ============================================================================

/** A memoized card description component. */
const MemoizedCardDescription = React.memo(BaseCardDescription);

// ============================================================================
// MAIN CARD DESCRIPTION COMPONENT
// ============================================================================

/** A card description component that can optionally be wrapped in a link for navigation */
const CardDescription: CardDescriptionComponent = setDisplayName(
  function CardDescription(props) {
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized
      ? MemoizedCardDescription
      : BaseCardDescription;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);

export default CardDescription;
