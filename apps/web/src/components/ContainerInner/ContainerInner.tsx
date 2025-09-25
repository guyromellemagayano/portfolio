import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { type CommonContainerComponent } from "@web/components/_shared";
import { cn } from "@web/utils";

import styles from "./ContainerInner.module.css";

// ============================================================================
// BASE CONTAINER INNER COMPONENT
// ============================================================================

/** Provides the inner structure for the `Container` compound component. */
const BaseContainerInner: CommonContainerComponent = setDisplayName(
  function BaseContainerInner(props) {
    const {
      as: Component = "div",
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
        id={`${componentId}-container-inner`}
        className={cn(styles.containerInner, className)}
        {...createComponentProps(componentId, "container-inner", isDebugMode)}
      >
        <div
          id={`${componentId}-container-inner-content`}
          className={styles.containerInnerContent}
          {...createComponentProps(
            componentId,
            "container-inner-content",
            isDebugMode
          )}
        >
          {children}
        </div>
      </Component>
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
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedContainerInner : BaseContainerInner;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);
