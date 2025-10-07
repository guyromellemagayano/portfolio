import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

// ============================================================================
// PROSE COMPONENT TYPES & INTERFACES
// ============================================================================

/** `ProseProps` component props. */
export interface ProseProps
  extends React.ComponentProps<"div">,
    CommonComponentProps {}

/** `ProseComponent` component type. */
export type ProseComponent = React.FC<ProseProps>;

// ============================================================================
// BASE PROSE COMPONENT
// ============================================================================

/** Renders a styled prose container for rich text content. */
const BaseProse: ProseComponent = setDisplayName(function BaseProse(props) {
  const {
    as: Component = "div",
    className,
    debugId,
    debugMode,
    ...rest
  } = props;

  const { componentId, isDebugMode } = useComponentId({ debugId, debugMode });

  const element = (
    <Component
      {...rest}
      id={`${componentId}-prose-root`}
      className={cn("prose dark:prose-invert", className)}
      {...createComponentProps(componentId, "prose", isDebugMode)}
    />
  );

  return element;
});

// ============================================================================
// MEMOIZED PROSE COMPONENT
// ============================================================================

/** A memoized prose component. */
const MemoizedProse = React.memo(BaseProse);

// ============================================================================
// MAIN PROSE COMPONENT
// ============================================================================

/** Renders the main styled prose container component. */
export const Prose: ProseComponent = setDisplayName(function Prose(props) {
  const { isMemoized = false, ...rest } = props;

  const Component = isMemoized ? MemoizedProse : BaseProse;
  const element = <Component {...rest} />;
  return element;
});
