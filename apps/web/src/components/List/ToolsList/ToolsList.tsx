import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

// ============================================================================
// TOOLS LIST COMPONENT TYPES & INTERFACES
// ============================================================================

type ToolsListProps<
  T extends React.ElementType =
    | "ul"
    | "ol"
    | "div"
    | "section"
    | "nav"
    | "aside",
> = {
  as?: T;
} & Omit<CommonComponentProps, "as"> &
  React.ComponentPropsWithRef<T>;

// ============================================================================
// MAIN TOOLS LIST COMPONENT
// ============================================================================

export const ToolsList = setDisplayName(function ToolsList<
  T extends React.ElementType =
    | "ul"
    | "ol"
    | "div"
    | "section"
    | "nav"
    | "aside",
>(props: ToolsListProps<T>) {
  const {
    as: Component = "ul" as T,
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
      {...(rest as any)}
      role="list"
      className={cn("space-y-16", className)}
      {...createComponentProps(componentId, "tools-list", isDebugMode)}
    >
      {children}
    </Component>
  );

  return element;
});
