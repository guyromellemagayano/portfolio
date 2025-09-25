import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import { setDisplayName } from "@guyromellemagayano/utils";

import { ContainerInner, ContainerOuter } from "@web/components";
import { type ContainerComponent } from "@web/components/_shared";
import { cn } from "@web/utils";

import styles from "./Container.module.css";

// ============================================================================
// BASE CONTAINER COMPONENT
// ============================================================================

/** A flexible layout container component for consistent page structure. */
const BaseContainer: ContainerComponent = setDisplayName(
  function BaseContainer(props) {
    const {
      as: Component = ContainerOuter,
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
        className={cn(styles.container, className)}
        debugId={componentId}
        debugMode={isDebugMode}
      >
        <ContainerInner debugId={componentId} debugMode={isDebugMode}>
          {children}
        </ContainerInner>
      </Component>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED CONTAINER COMPONENT
// ============================================================================

/** A memoized container component. */
const MemoizedContainer = React.memo(BaseContainer);

// ============================================================================
// MAIN CONTAINER COMPONENT
// ============================================================================

/** Top-level layout container that provides consistent outer and inner structure for page content. */
export const Container: ContainerComponent = setDisplayName(
  function Container(props) {
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedContainer : BaseContainer;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);

export default Container;
