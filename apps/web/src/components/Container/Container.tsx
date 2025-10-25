import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import { setDisplayName } from "@guyromellemagayano/utils";

import { ContainerInner } from "./ContainerInner";
import { ContainerOuter } from "./ContainerOuter";

// ============================================================================
// CONTAINER COMPONENT TYPES & INTERFACES
// ============================================================================

export interface ContainerProps
  extends React.ComponentProps<typeof ContainerOuter>,
    CommonComponentProps {}
export type ContainerComponent = React.FC<ContainerProps>;

// ============================================================================
// BASE CONTAINER COMPONENT
// ============================================================================

const BaseContainer: ContainerComponent = setDisplayName(
  function BaseContainer(props) {
    const {
      as: Component = ContainerOuter,
      children,
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
      <Component {...rest} debugId={componentId} debugMode={isDebugMode}>
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

const MemoizedContainer = React.memo(BaseContainer);

// ============================================================================
// MAIN CONTAINER COMPONENT
// ============================================================================

export const Container: ContainerComponent = setDisplayName(
  function Container(props) {
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedContainer : BaseContainer;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);
