import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  isRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import styles from "./CardDescription.module.css";

// ============================================================================
// CARD DESCRIPTION COMPONENT TYPES & INTERFACES
// ============================================================================

export interface CardDescriptionProps
  extends React.ComponentPropsWithRef<"p">,
    Omit<CommonComponentProps, "as"> {}
export type CardDescriptionComponent = React.FC<CardDescriptionProps>;

// ============================================================================
// BASE CARD DESCRIPTION COMPONENT
// ============================================================================

/** A card description component that can optionally be wrapped in a link for navigation */
const BaseCardDescription: CardDescriptionComponent = setDisplayName(
  function BaseCardDescription(props) {
    const { children, className, _internalId, _debugMode, ...rest } = props;

    const element = (
      <p
        {...rest}
        className={cn(styles.cardDescription, className)}
        {...createComponentProps(_internalId, "card-description", _debugMode)}
      >
        {children}
      </p>
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
export const CardDescription: CardDescriptionComponent = setDisplayName(
  function CardDescription(props) {
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

    const Component = isMemoized
      ? MemoizedCardDescription
      : BaseCardDescription;
    const element = <Component {...updatedProps}>{children}</Component>;
    return element;
  }
);
