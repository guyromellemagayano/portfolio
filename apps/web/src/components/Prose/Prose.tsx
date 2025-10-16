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

export interface ProseProps
  extends React.ComponentProps<"div">,
    CommonComponentProps {}
export type ProseComponent = React.FC<ProseProps>;

// ============================================================================
// BASE PROSE COMPONENT
// ============================================================================

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
      className={cn("prose dark:prose-invert", className)}
      {...createComponentProps(componentId, "prose", isDebugMode)}
    />
  );

  return element;
});

// ============================================================================
// MEMOIZED PROSE COMPONENT
// ============================================================================

const MemoizedProse = React.memo(BaseProse);

// ============================================================================
// MAIN PROSE COMPONENT
// ============================================================================

export const Prose: ProseComponent = setDisplayName(function Prose(props) {
  const { isMemoized = false, ...rest } = props;

  const Component = isMemoized ? MemoizedProse : BaseProse;
  const element = <Component {...rest} />;
  return element;
});
