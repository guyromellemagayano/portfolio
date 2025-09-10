import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  hasValidContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import {
  type CommonContainerComponent,
  type CommonContainerProps,
} from "./_data";
import { ContainerInner, ContainerOuter } from "./_internal";
import styles from "./Container.module.css";

// ============================================================================
// BASE CONTAINER COMPONENT
// ============================================================================

/** A flexible layout container component for consistent page structure. */
const BaseContainer: CommonContainerComponent = setDisplayName(
  function BaseContainer(props) {
    const { children, className, internalId, debugMode, ...rest } = props;

    const element = (
      <div
        {...rest}
        className={cn(styles.container, className)}
        {...createComponentProps(internalId, "container", debugMode)}
      >
        <ContainerOuter internalId={internalId} debugMode={debugMode}>
          <ContainerInner>{children}</ContainerInner>
        </ContainerOuter>
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

/** Top-level layout container that provides consistent outer and inner structure for page content. */
export const Container = setDisplayName(function Container(props) {
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

  if (!hasValidContent(children)) return null;

  const updatedProps = {
    ...rest,
    children,
    internalId: id,
    debugMode: isDebugMode,
  };

  const Component = isMemoized ? MemoizedContainer : BaseContainer;
  const element = <Component {...updatedProps} />;
  return element;
} as ContainerCompoundComponent);

// ============================================================================
// CONTAINER COMPOUND COMPONENTS
// ============================================================================

type ContainerCompoundComponent = React.FC<CommonContainerProps> & {
  /** A container inner component that provides consistent inner structure for page content. */
  Inner: typeof ContainerInner;
  /** A container outer component that provides consistent outer structure for page content. */
  Outer: typeof ContainerOuter;
};

Container.Outer = ContainerOuter;
Container.Inner = ContainerInner;
