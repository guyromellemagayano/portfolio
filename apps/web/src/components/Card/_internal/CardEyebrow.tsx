import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

// ============================================================================
// CARD EYEBROW COMPONENT TYPES & INTERFACES
// ============================================================================

export interface CardEyebrowProps
  extends React.ComponentPropsWithRef<"p">,
    CommonComponentProps {
  /** ISO date string for the eyebrow content */
  dateTime?: string;
  /** Enable decorative styling */
  decorate?: boolean;
}
export type CardEyebrowComponent = React.FC<CardEyebrowProps>;

// ============================================================================
// BASE CARD EYEBROW COMPONENT
// ============================================================================

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
          "relative z-10 order-first mb-3 flex items-center text-sm text-wrap text-zinc-400 dark:text-zinc-500",
          decorate && "pl-3.5",
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

const MemoizedCardEyebrow = React.memo(BaseCardEyebrow);

// ============================================================================
// MAIN CARD EYEBROW COMPONENT
// ============================================================================

export const CardEyebrow: CardEyebrowComponent = setDisplayName(
  function CardEyebrow(props) {
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedCardEyebrow : BaseCardEyebrow;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);
