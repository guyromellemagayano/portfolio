"use client";

import React from "react";

import {
  Div,
  type DivProps,
  type DivRef,
} from "@guyromellemagayano/components";

import { cn } from "@web/lib/helpers";

export type ContainerOuterRef = DivRef;
export interface ContainerOuterProps extends DivProps {}

/**
 * A container component that wraps its children in a div with a max-width of 7xl.
 */
const ContainerOuter = React.forwardRef<ContainerOuterRef, ContainerOuterProps>(
  (props, ref) => {
    const { children, className, ...rest } = props;

    return (
      <Div ref={ref} className={cn("sm:px-8", className)} {...rest}>
        <Div className="mx-auto w-full max-w-7xl lg:px-8">{children}</Div>
      </Div>
    );
  }
);

ContainerOuter.displayName = "ContainerOuter";

export type ContainerInnerRef = DivRef;
export interface ContainerInnerProps extends DivProps {}

/**
 * A container component that wraps its children in a div with a max-width of 2xl.
 */
const ContainerInner = React.forwardRef<ContainerInnerRef, ContainerInnerProps>(
  (props, ref) => {
    const { children, className, ...rest } = props;

    return (
      <Div
        ref={ref}
        className={cn("relative px-4 sm:px-8 lg:px-12", className)}
        {...rest}
      >
        <Div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</Div>
      </Div>
    );
  }
);

ContainerInner.displayName = "ContainerInner";

export type ContainerClientRef = DivRef;
export interface ContainerClientProps extends DivProps {
  children: React.ReactNode;
  isClient?: boolean;
  isMemoized?: boolean;
}

/**
 * Client component for the container component.
 */
export const ContainerClient = React.forwardRef<
  ContainerClientRef,
  ContainerClientProps
>((props, ref) => {
  const { children, ...rest } = props;

  return (
    <ContainerOuter {...rest} ref={ref}>
      <ContainerInner>{children}</ContainerInner>
    </ContainerOuter>
  );
});

ContainerClient.displayName = "ContainerClient";

/**
 * Memoized version of `ContainerClient` for performance optimization.
 */
export const MemoizedContainerClient = React.memo(ContainerClient);

// Add logging to memoized component
MemoizedContainerClient.displayName = "MemoizedContainerClient";
