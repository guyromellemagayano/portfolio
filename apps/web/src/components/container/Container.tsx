import React from "react";

import {
  Div,
  type DivProps,
  type DivRef,
} from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";

import type { CommonWebAppComponentProps } from "@web/@types/components";
import { cn } from "@web/lib";

import styles from "./Container.module.css";

// ============================================================================
// CONTAINER OUTER COMPONENT
// ============================================================================

type ContainerOuterRef = DivRef;
interface ContainerOuterProps extends DivProps, CommonWebAppComponentProps {}

interface InternalContainerOuterProps extends ContainerOuterProps {
  /** Internal component ID passed from parent */
  componentId?: string;
  /** Internal debug mode passed from parent */
  isDebugMode?: boolean;
}

/** Internal container outer component with all props */
const InternalContainerOuter = React.forwardRef<
  ContainerOuterRef,
  InternalContainerOuterProps
>(function InternalContainerOuter(props, ref) {
  const { children, className, componentId, isDebugMode, ...rest } = props;

  if (!children) return null;

  const element = (
    <Div
      {...rest}
      ref={ref}
      className={cn(styles.containerOuter, className)}
      data-container-outer-id={componentId}
      data-debug-mode={isDebugMode ? "true" : undefined}
      data-testid="container-outer-root"
    >
      <Div className={styles.containerOuterContent}>{children}</Div>
    </Div>
  );

  return element;
});

InternalContainerOuter.displayName = "InternalContainerOuter";

/** Public container outer component with useComponentId integration */
export const ContainerOuter = React.forwardRef<
  ContainerOuterRef,
  ContainerOuterProps
>(function ContainerOuter(props, ref) {
  const { _internalId, _debugMode, ...rest } = props;

  // Use shared hook for ID generation and debug logging
  // Component name will be auto-detected from export const declaration
  const { id, isDebugMode } = useComponentId({
    internalId: _internalId,
    debugMode: _debugMode,
  });

  const element = (
    <InternalContainerOuter
      {...rest}
      ref={ref}
      componentId={id}
      isDebugMode={isDebugMode}
    />
  );

  return element;
});

ContainerOuter.displayName = "ContainerOuter";

// ============================================================================
// CONTAINER INNER COMPONENT
// ============================================================================

type ContainerInnerRef = DivRef;
interface ContainerInnerProps extends DivProps, CommonWebAppComponentProps {}

interface InternalContainerInnerProps extends ContainerInnerProps {
  /** Internal component ID passed from parent */
  componentId?: string;
  /** Internal debug mode passed from parent */
  isDebugMode?: boolean;
}

/** Internal container inner component with all props */
const InternalContainerInner = React.forwardRef<
  ContainerInnerRef,
  InternalContainerInnerProps
>(function InternalContainerInner(props, ref) {
  const { children, className, componentId, isDebugMode, ...rest } = props;

  if (!children) return null;

  const element = (
    <Div
      {...rest}
      ref={ref}
      className={cn(styles.containerInner, className)}
      data-container-inner-id={componentId}
      data-debug-mode={isDebugMode ? "true" : undefined}
      data-testid="container-inner-root"
    >
      <Div className={styles.containerInnerContent}>{children}</Div>
    </Div>
  );

  return element;
});

InternalContainerInner.displayName = "InternalContainerInner";

/** Public container inner component with useComponentId integration */
export const ContainerInner = React.forwardRef<
  ContainerInnerRef,
  ContainerInnerProps
>(function ContainerInner(props, ref) {
  const { _internalId, _debugMode, ...rest } = props;

  // Use shared hook for ID generation and debug logging
  // Component name will be auto-detected from export const declaration
  const { id, isDebugMode } = useComponentId({
    internalId: _internalId,
    debugMode: _debugMode,
  });

  const element = (
    <InternalContainerInner
      {...rest}
      ref={ref}
      componentId={id}
      isDebugMode={isDebugMode}
    />
  );

  return element;
});

ContainerInner.displayName = "ContainerInner";

type ContainerRef = ContainerOuterRef;
interface ContainerProps extends ContainerOuterProps {}

interface InternalContainerProps extends ContainerProps {
  /** Internal component ID passed from parent */
  componentId?: string;
  /** Internal debug mode passed from parent */
  isDebugMode?: boolean;
}

/** Internal container component with all props */
const InternalContainer = React.forwardRef<
  ContainerRef,
  InternalContainerProps
>(function InternalContainer(props, ref) {
  const { children, componentId, isDebugMode, ...rest } = props;

  if (!children) return null;

  const element = (
    <InternalContainerOuter
      {...rest}
      ref={ref}
      componentId={componentId}
      isDebugMode={isDebugMode}
    >
      <InternalContainerInner>{children}</InternalContainerInner>
    </InternalContainerOuter>
  );

  return element;
});

InternalContainer.displayName = "InternalContainer";

/** Top-level layout container that provides consistent outer and inner structure for page content. */
export const Container = React.forwardRef<ContainerRef, ContainerProps>(
  function Container(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;

    // Use shared hook for ID generation and debug logging
    // Component name will be auto-detected from export const declaration
    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <InternalContainer
        {...rest}
        ref={ref}
        componentId={id}
        isDebugMode={isDebugMode}
      />
    );

    return element;
  }
);

Container.displayName = "Container";
