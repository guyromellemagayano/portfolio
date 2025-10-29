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

export type CardEyebrowProps<T extends React.ComponentPropsWithRef<"p">> = Omit<
  T,
  "as"
> &
  CommonComponentProps & {
    /** ISO date string for the eyebrow content */
    dateTime?: string;
    /** Enable decorative styling */
    decorate?: boolean;
  };

// ============================================================================
// MAIN CARD EYEBROW COMPONENT
// ============================================================================

export const CardEyebrow = setDisplayName(function CardEyebrow<
  T extends React.ComponentPropsWithRef<"p">,
>(props: CardEyebrowProps<T>) {
  const {
    as: Component = "p" as unknown as React.ElementType,
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

  const TimeComponent = function () {
    return dateTime ? (
      <time
        dateTime={dateTime}
        {...createComponentProps(componentId, "card-eyebrow-time", isDebugMode)}
      >
        {children}
      </time>
    ) : (
      children
    );
  };

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
      <TimeComponent />
    </Component>
  );

  return element;
});

// ============================================================================
// MEMOIZED CARD EYEBROW COMPONENT
// ============================================================================

export const MemoizedCardEyebrow = React.memo(CardEyebrow);
