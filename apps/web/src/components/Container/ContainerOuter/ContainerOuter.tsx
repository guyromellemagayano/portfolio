import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { type CommonContainerComponent } from "../Container.types";

// ============================================================================
// BASE CONTAINER OUTER COMPONENT
// ============================================================================

const BaseContainerOuter: CommonContainerComponent = setDisplayName(
  function BaseContainerOuter(props) {
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
        className={cn("sm:px-8", className)}
        {...createComponentProps(componentId, "container-outer", isDebugMode)}
      >
        <div
          className="mx-auto w-full max-w-7xl lg:px-8"
          {...createComponentProps(
            componentId,
            "container-outer-content",
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
// MEMOIZED CONTAINER OUTER COMPONENT
// ============================================================================

const MemoizedContainerOuter = React.memo(BaseContainerOuter);

// ============================================================================
// MAIN CONTAINER OUTER COMPONENT
// ============================================================================

export const ContainerOuter: CommonContainerComponent = setDisplayName(
  function ContainerOuter(props) {
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedContainerOuter : BaseContainerOuter;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);
