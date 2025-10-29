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

export type CardDescriptionProps<T extends React.ComponentPropsWithRef<"p">> =
  Omit<T, "as"> & CommonComponentProps;

// ============================================================================
// MAIN CARD DESCRIPTION COMPONENT
// ============================================================================

export const CardDescription = setDisplayName(function CardDescription<
  T extends React.ComponentPropsWithRef<"p">,
>(props: CardDescriptionProps<T>) {
  const {
    as: Component = "p" as unknown as React.ElementType,
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
});

// ============================================================================
// MEMOIZED CARD DESCRIPTION COMPONENT
// ============================================================================

export const MemoizedCardDescription = React.memo(CardDescription);
