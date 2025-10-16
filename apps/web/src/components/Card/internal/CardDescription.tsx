import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

// ============================================================================
// CARD DESCRIPTION COMPONENT TYPES & INTERFACES
// ============================================================================

export interface CardDescriptionProps
  extends React.ComponentPropsWithRef<"p">,
    CommonComponentProps {}
export type CardDescriptionComponent = React.FC<CardDescriptionProps>;

// ============================================================================
// BASE CARD DESCRIPTION COMPONENT
// ============================================================================

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
        className={cn(
          "relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400",
          className
        )}
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

const MemoizedCardDescription = React.memo(BaseCardDescription);

// ============================================================================
// MAIN CARD DESCRIPTION COMPONENT
// ============================================================================

export const CardDescription: CardDescriptionComponent = setDisplayName(
  function CardDescription(props) {
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized
      ? MemoizedCardDescription
      : BaseCardDescription;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);
