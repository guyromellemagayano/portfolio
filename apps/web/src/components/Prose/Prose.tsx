import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

// ============================================================================
// PROSE COMPONENT
// ============================================================================

type ProseElementType = "div";

export type ProseProps<T extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  "as"
> &
  Omit<CommonComponentProps, "as"> & {
    /** The component to render as - only "div" is allowed */
    as?: T;
  };

export const Prose = setDisplayName(function Prose<T extends ProseElementType>(
  props: ProseProps<T>
) {
  const {
    as: Component = "div",
    className,
    debugId,
    debugMode,
    ...rest
  } = props;

  // Prose component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({ debugId, debugMode });

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
      className={cn("prose dark:prose-invert", className)}
      {...createComponentProps(componentId, "prose", isDebugMode)}
    />
  );
});

// ============================================================================
// MEMOIZED PROSE COMPONENT
// ============================================================================

export const MemoizedProse = React.memo(Prose);
