import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import styles from "./Prose.module.css";

// ============================================================================
// PROSE COMPONENT TYPES & INTERFACES
// ============================================================================

interface ProseProps
  extends React.ComponentProps<"div">,
    CommonComponentProps {}
type ProseComponent = React.FC<ProseProps>;

// ============================================================================
// BASE PROSE COMPONENT
// ============================================================================

/** Renders a styled prose container for rich text content. */
const BaseProse: ProseComponent = setDisplayName(function BaseProse(props) {
  const { className, _internalId, _debugMode, ...rest } = props;

  const element = (
    <div
      {...rest}
      className={cn(styles.prose, className)}
      {...createComponentProps(_internalId, "prose", _debugMode)}
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
  const { isMemoized = false, _internalId, _debugMode, ...rest } = props;

  const { id, isDebugMode } = useComponentId({
    internalId: _internalId,
    debugMode: _debugMode,
  });

  const updatedProps = {
    ...rest,
    _internalId: id,
    _debugMode: isDebugMode,
  };

  const Component = isMemoized ? MemoizedProse : BaseProse;
  const element = <Component {...updatedProps} />;
  return element;
});
