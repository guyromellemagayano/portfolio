import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { type CommonContainerComponent } from "../Container.types";

// ============================================================================
// BASE CONTAINER INNER COMPONENT
// ============================================================================

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
        className={cn("relative px-4 sm:px-8 lg:px-12", className)}
        {...createComponentProps(componentId, "container-inner", isDebugMode)}
      >
        <div
          className="mx-auto max-w-2xl lg:max-w-5xl"
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

const MemoizedContainerInner = React.memo(BaseContainerInner);

// ============================================================================
// MAIN CONTAINER INNER COMPONENT
// ============================================================================

export const ContainerInner: CommonContainerComponent = setDisplayName(
  function ContainerInner(props) {
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedContainerInner : BaseContainerInner;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);
