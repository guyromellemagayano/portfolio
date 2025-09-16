import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  hasAnyRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { type CommonContainerComponent } from "../_data";
import styles from "./styles/ContainerInner.module.css";

// ============================================================================
// BASE CONTAINER INNER COMPONENT
// ============================================================================

/** Provides the inner structure for the `Container` compound component. */
const BaseContainerInner: CommonContainerComponent = setDisplayName(
  function BaseContainerInner(props) {
    const { children, className, _internalId, _debugMode, ...rest } = props;

    const element = (
      <div
        {...rest}
        className={cn(styles.containerInner, className)}
        {...createComponentProps(_internalId, "container-inner", _debugMode)}
      >
        <div className={styles.containerInnerContent}>{children}</div>
      </div>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED CONTAINER INNER COMPONENT
// ============================================================================

/** A memoized container inner component. */
const MemoizedContainerInner = React.memo(BaseContainerInner);

// ============================================================================
// MAIN CONTAINER INNER COMPONENT
// ============================================================================

/** A container inner component that provides consistent inner structure for page content. */
export const ContainerInner: CommonContainerComponent = setDisplayName(
  function ContainerInner(props) {
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

    const Component = isMemoized ? MemoizedContainerInner : BaseContainerInner;
    const element = <Component {...updatedProps} />;
    return element;
  }
);
