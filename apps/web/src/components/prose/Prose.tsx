import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import { setDisplayName } from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import styles from "./Prose.module.css";

// ============================================================================
// BASE PROSE COMPONENT
// ============================================================================

interface ProseProps
  extends React.ComponentProps<"div">,
    CommonComponentProps {}
type ProseComponent = React.FC<ProseProps>;

/** Renders a styled prose container for rich text content. */
const BaseProse: ProseComponent = setDisplayName(function BaseProse(props) {
  const { className, _internalId, _debugMode, ...rest } = props;

  const element = (
    <div
      {...rest}
      className={cn(styles.prose, className)}
      data-prose-id={`${_internalId}-prose`}
      data-debug-mode={_debugMode ? "true" : undefined}
      data-testid="prose-root"
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
const Prose: ProseComponent = setDisplayName(function Prose(props) {
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

export { Prose };
