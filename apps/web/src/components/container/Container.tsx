import React from "react";

import { Div } from "@guyromellemagayano/components";
import { setDisplayName, useComponentId } from "@guyromellemagayano/hooks";

import type { CommonWebAppComponentProps } from "@web/@types/components";
import { cn } from "@web/lib";

import styles from "./Container.module.css";

// ============================================================================
// CONTAINER OUTER COMPONENT
// ============================================================================

type ContainerOuterRef = React.ComponentRef<typeof Div>;
interface ContainerOuterProps
  extends React.ComponentPropsWithoutRef<typeof Div>,
    CommonWebAppComponentProps {}

interface InternalContainerOuterProps extends ContainerOuterProps {
  /** Internal component ID passed from parent */
  componentId?: string;
  /** Internal debug mode passed from parent */
  isDebugMode?: boolean;
}

type InternalContainerOuterComponent = React.ForwardRefExoticComponent<
  InternalContainerOuterProps & React.RefAttributes<ContainerOuterRef>
>;

/** Internal container outer component with all props */
const InternalContainerOuter = setDisplayName(
  React.forwardRef(function InternalContainerOuter(props, ref) {
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
  }),
  "InternalContainerOuter"
) as InternalContainerOuterComponent;

type ContainerOuterComponent = React.ForwardRefExoticComponent<
  ContainerOuterProps & React.RefAttributes<ContainerOuterRef>
>;

/** Public container outer component with useComponentId integration */
const ContainerOuter = setDisplayName(
  React.forwardRef(function ContainerOuter(props, ref) {
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
  }),
  "ContainerOuter"
) as ContainerOuterComponent;

// ============================================================================
// CONTAINER INNER COMPONENT
// ============================================================================

type ContainerInnerRef = React.ComponentRef<typeof Div>;
interface ContainerInnerProps
  extends React.ComponentPropsWithoutRef<typeof Div>,
    CommonWebAppComponentProps {}

interface InternalContainerInnerProps extends ContainerInnerProps {
  /** Internal component ID passed from parent */
  componentId?: string;
  /** Internal debug mode passed from parent */
  isDebugMode?: boolean;
}

type InternalContainerInnerComponent = React.ForwardRefExoticComponent<
  InternalContainerInnerProps & React.RefAttributes<ContainerInnerRef>
>;

/** Internal container inner component with all props */
const InternalContainerInner = setDisplayName(
  React.forwardRef(function InternalContainerInner(props, ref) {
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
  }),
  "InternalContainerInner"
) as InternalContainerInnerComponent;

type ContainerInnerComponent = React.ForwardRefExoticComponent<
  ContainerInnerProps & React.RefAttributes<ContainerInnerRef>
>;

/** Public container inner component with useComponentId integration */
const ContainerInner = setDisplayName(
  React.forwardRef(function ContainerInner(props, ref) {
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
  }),
  "ContainerInner"
) as ContainerInnerComponent;

// ============================================================================
// MAIN CONTAINER COMPONENT
// ============================================================================

type ContainerRef = ContainerOuterRef;
interface ContainerProps extends ContainerOuterProps {}

interface InternalContainerProps extends InternalContainerOuterProps {}

type InternalContainerComponent = React.ForwardRefExoticComponent<
  InternalContainerProps & React.RefAttributes<ContainerRef>
>;

/** Internal container component with all props */
const InternalContainer = setDisplayName(
  React.forwardRef(function InternalContainer(props, ref) {
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
  }),
  "InternalContainer"
) as InternalContainerComponent;

type ContainerComponent = React.ForwardRefExoticComponent<
  ContainerProps & React.RefAttributes<ContainerRef>
> & {
  /** A container outer component that provides the outer wrapper structure. */
  Outer: ContainerOuterComponent;
  /** A container inner component that provides the inner wrapper structure. */
  Inner: ContainerInnerComponent;
};

/** Top-level layout container that provides consistent outer and inner structure for page content. */
export const Container = setDisplayName(
  React.forwardRef(function Container(props, ref) {
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
  }),
  "Container"
) as ContainerComponent;

// ============================================================================
// COMPOUND COMPONENT EXPORTS
// ============================================================================

Container.Outer = ContainerOuter;
Container.Inner = ContainerInner;
