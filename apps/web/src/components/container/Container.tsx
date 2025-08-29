import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  type ComponentProps,
  isRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { ContainerInner, ContainerOuter } from "./_internal";

// ============================================================================
// BASE CONTAINER COMPONENT
// ============================================================================

interface ContainerProps extends React.ComponentProps<"div">, ComponentProps {}
type ContainerComponent = React.FC<ContainerProps>;

/** A flexible layout container component for consistent page structure. */
const BaseContainer: ContainerComponent = setDisplayName(
  function BaseContainer(props) {
    const { children, internalId, debugMode, ...rest } = props;

    const element = (
      <div
        {...rest}
        data-container-id={internalId}
        data-debug-mode={debugMode ? "true" : undefined}
        data-testid="container-root"
      >
        {children}
      </div>
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

type ContainerCompoundComponent = React.FC<ContainerProps> & {
  /** A container inner component that provides consistent inner structure for page content. */
  Inner: typeof ContainerInner;
  /** A container outer component that provides consistent outer structure for page content. */
  Outer: typeof ContainerOuter;
};

/** Top-level layout container that provides consistent outer and inner structure for page content. */
const Container = setDisplayName(function Container(props) {
  const {
    children,
    isMemoized = false,
    internalId,
    debugMode,
    ...rest
  } = props;

  const { id, isDebugMode } = useComponentId({
    internalId,
    debugMode,
  });

  if (!isRenderableContent(children)) return null;

  const updatedProps = {
    ...rest,
    internalId: id,
    debugMode: isDebugMode,
    children,
  };

  const Component = isMemoized ? MemoizedContainer : BaseContainer;
  const element = <Component {...updatedProps} />;
  return element;
} as ContainerCompoundComponent);

// ============================================================================
// CONTAINER COMPOUND COMPONENTS
// ============================================================================

Container.Outer = ContainerOuter;
Container.Inner = ContainerInner;

export { Container };
