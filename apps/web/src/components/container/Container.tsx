import React from "react";

import { Div } from "@guyromellemagayano/components";

import type {
  ContainerComponent,
  ContainerInnerComponent,
  ContainerInnerProps,
  ContainerInnerRef,
  ContainerOuterComponent,
  ContainerOuterProps,
  ContainerOuterRef,
  ContainerProps,
  ContainerRef,
} from "@web/components/container";
import { cn } from "@web/lib/helpers";

import styles from "./Container.module.css";

/** Container outer component */
export const ContainerOuter: ContainerOuterComponent = React.forwardRef<
  ContainerOuterRef,
  ContainerOuterProps
>((props, ref) => {
  const { children, className, ...rest } = props;

  const element =
    (children && (
      <Div ref={ref} className={cn(styles.containerOuter, className)} {...rest}>
        <Div className={styles.containerOuterContent}>{children}</Div>
      </Div>
    )) ??
    null;

  return element;
});

ContainerOuter.displayName = "ContainerOuter";

/** Container inner component */
export const ContainerInner: ContainerInnerComponent = React.forwardRef<
  ContainerInnerRef,
  ContainerInnerProps
>((props, ref) => {
  const { children, className, ...rest } = props;

  const element =
    (children && (
      <Div ref={ref} className={cn(styles.containerInner, className)} {...rest}>
        <Div className={styles.containerInnerContent}>{children}</Div>
      </Div>
    )) ??
    null;

  return element;
});

ContainerInner.displayName = "ContainerInner";

/** Container component */
export const Container: ContainerComponent = React.forwardRef<
  ContainerRef,
  ContainerProps
>((props, ref) => {
  const { children, ...rest } = props;

  const element =
    (children && (
      <ContainerOuter {...rest} ref={ref}>
        <ContainerInner>{children}</ContainerInner>
      </ContainerOuter>
    )) ??
    null;

  return element;
});

Container.displayName = "Container";
