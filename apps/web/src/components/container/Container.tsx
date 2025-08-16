import React from "react";

import {
  Div,
  type DivProps,
  type DivRef,
} from "@guyromellemagayano/components";

import type { CommonWebAppComponentProps } from "@web/@types/components";
import { useComponentId } from "@web/hooks/useComponentId";
import { cn } from "@web/lib/helpers";

import styles from "./Container.module.css";

type ContainerOuterRef = DivRef;
interface ContainerOuterProps extends DivProps, CommonWebAppComponentProps {}

type ContainerOuterComponent = React.ForwardRefExoticComponent<
  ContainerOuterProps & React.RefAttributes<ContainerOuterRef>
>;

/** Container outer component */
export const ContainerOuter: ContainerOuterComponent = React.forwardRef(
  function ContainerOuter(props, ref) {
    const { children, className, ...rest } = props;

    if (!children) return null;

    const element = (
      <Div {...rest} className={cn(styles.containerOuter, className)} ref={ref}>
        <Div className={styles.containerOuterContent}>{children}</Div>
      </Div>
    );

    return element;
  }
);

ContainerOuter.displayName = "ContainerOuter";

type ContainerInnerRef = DivRef;
interface ContainerInnerProps extends DivProps, CommonWebAppComponentProps {}

type ContainerInnerComponent = React.ForwardRefExoticComponent<
  ContainerInnerProps & React.RefAttributes<ContainerInnerRef>
>;

/** Container inner component */
export const ContainerInner: ContainerInnerComponent = React.forwardRef(
  function ContainerInner(props, ref) {
    const { children, className, ...rest } = props;

    if (!children) return null;

    const element = (
      <Div {...rest} className={cn(styles.containerInner, className)} ref={ref}>
        <Div className={styles.containerInnerContent}>{children}</Div>
      </Div>
    );

    return element;
  }
);

ContainerInner.displayName = "ContainerInner";

type ContainerRef = ContainerOuterRef;
interface ContainerProps extends ContainerOuterProps {}

type ContainerComponent = React.ForwardRefExoticComponent<
  ContainerProps & React.RefAttributes<ContainerRef>
>;

/** Top-level layout container that provides consistent outer and inner structure for page content. */
export const Container: ContainerComponent = React.forwardRef(
  function Container(props, ref) {
    const { children, _internalId, _debugMode, ...rest } = props;

    // Use shared hook for ID generation and debug logging
    // Component name will be auto-detected from export const declaration
    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    if (!children) return null;

    const element = (
      <ContainerOuter
        {...rest}
        ref={ref}
        data-container-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
      >
        <ContainerInner>{children}</ContainerInner>
      </ContainerOuter>
    );

    return element;
  }
);

Container.displayName = "Container";
