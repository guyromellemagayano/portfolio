import React, { Suspense } from "react";

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

const ContainerClient = React.lazy(async () => {
  const component = await import("./index.client");
  return { default: component.ContainerClient };
});
const MemoizedContainerClient = React.lazy(async () => {
  const component = await import("./index.client");
  return { default: component.MemoizedContainerClient };
});

export type ContainerRef = ContainerOuterRef;
export interface ContainerProps extends ContainerOuterProps {
  children: React.ReactNode;
  isClient?: boolean;
  isMemoized?: boolean;
}

/**
 * A container component that wraps its children in a div with a max-width of 7xl and 2xl.
 */
export const Container = React.forwardRef<ContainerOuterRef, ContainerProps>(
  (props, ref) => {
    const { children, isClient = false, isMemoized = false, ...rest } = props;

    const element = (
      <ContainerOuter {...rest}>
        <ContainerInner>{children}</ContainerInner>
      </ContainerOuter>
    );

    if (isClient) {
      const ClientComponent = isMemoized
        ? MemoizedContainerClient
        : ContainerClient;

      return (
        <Suspense fallback={element}>
          <ClientComponent
            {...rest}
            isClient={isClient}
            isMemoized={isMemoized}
            ref={ref}
          >
            {children}
          </ClientComponent>
        </Suspense>
      );
    }

    return element;
  }
);

Container.displayName = "Container";
