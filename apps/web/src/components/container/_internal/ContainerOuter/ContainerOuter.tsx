import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  hasAnyRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

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
        {...createComponentProps(_internalId, "container-outer", _debugMode)}
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

/** A memoized container outer component. */
const MemoizedContainerOuter = React.memo(BaseContainerOuter);

// ============================================================================
// MAIN CONTAINER OUTER COMPONENT
// ============================================================================

/** A container outer component that provides consistent outer structure for page content. */
export const ContainerOuter: CommonContainerComponent = setDisplayName(
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

    if (!hasAnyRenderableContent(children)) return null;

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
