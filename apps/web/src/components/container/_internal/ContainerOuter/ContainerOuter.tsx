import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import { isRenderableContent, setDisplayName } from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import type { CommonContainerComponent } from "../../_data";
import styles from "./ContainerOuter.module.css";

// ============================================================================
// BASE CONTAINER OUTER COMPONENT
// ============================================================================

/** Provides the outer structure for the `Container` compound component. */
const BaseContainerOuter: CommonContainerComponent = setDisplayName(
  function BaseContainerOuter(props) {
    const { children, className, _internalId, _debugMode, ...rest } = props;

    const element = (
      <div
        {...rest}
        className={cn(styles.containerOuter, className)}
        data-container-outer-id={`${_internalId}-container-outer`}
        data-debug-mode={_debugMode ? "true" : undefined}
        data-testid="container-outer-root"
      >
        <div className={styles.containerOuterContent}>{children}</div>
      </div>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED CONTAINER OUTER COMPONENT
// ============================================================================

const MemoizedContainerOuter = React.memo(BaseContainerOuter);

// ============================================================================
// MAIN CONTAINER OUTER COMPONENT
// ============================================================================

/** A container outer component that provides consistent outer structure for page content. */
const ContainerOuter: CommonContainerComponent = setDisplayName(
  function ContainerOuter(props) {
    const {
      children,
      isMemoized = false,
      _internalId,
      _debugMode,
      ...rest
    } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    if (!isRenderableContent(children)) return null;

    const updatedProps = {
      ...rest,
      _internalId: id,
      _debugMode: isDebugMode,
      children,
    };

    const Component = isMemoized ? MemoizedContainerOuter : BaseContainerOuter;
    const element = <Component {...updatedProps} />;
    return element;
  }
);

export { ContainerOuter };
