/**
 * @file Container.tsx
 * @author Guy Romelle Magayano
 * @description Container component for the web application.
 */

import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import { createComponentProps } from "@guyromellemagayano/utils";

import { CommonAppComponentProps } from "@web/types/common";
import { cn } from "@web/utils/helpers";

// ============================================================================
// COMMON CONTAINER COMPONENT TYPES
// ============================================================================

type ContainerElementType = "div" | "section" | "main" | "article";

// ============================================================================
// OUTER CONTAINER COMPONENT
// ============================================================================

type ContainerOuterProps<
  T extends ContainerElementType,
  P extends Record<string, unknown> = {},
> = CommonAppComponentProps &
  Omit<React.ComponentPropsWithRef<T>, "as"> &
  P & {
    as?: T;
  };

function ContainerOuter<
  T extends ContainerElementType,
  P extends Record<string, unknown> = {},
>(props: ContainerOuterProps<T, P>) {
  const {
    as: Component = "div",
    children,
    className,
    debugId,
    debugMode,
    ...rest
  } = props;

  // Container outer component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!children) return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
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
}

ContainerOuter.displayName = "ContainerOuter";

// ============================================================================
// INNER CONTAINER COMPONENT
// ============================================================================

type ContainerInnerProps<
  T extends ContainerElementType,
  P extends Record<string, unknown> = {},
> = CommonAppComponentProps &
  Omit<React.ComponentPropsWithRef<T>, "as"> &
  P & {
    as?: T;
  };

function ContainerInner<
  T extends ContainerElementType,
  P extends Record<string, unknown> = {},
>(props: ContainerInnerProps<T, P>) {
  const {
    as: Component = "div",
    children,
    className,
    debugId,
    debugMode,
    ...rest
  } = props;

  // Container inner component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!children) return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
      className={cn("relative px-4 sm:px-8 lg:px-12", className)}
      {...createComponentProps(componentId, "container-inner", isDebugMode)}
    >
      <div
        className="mx-auto max-w-2xl lg:max-w-5xl"
        {...createComponentProps(
          componentId,
          "container-inner-content",
          isDebugMode
        )}
      >
        {children}
      </div>
    </Component>
  );
}

ContainerInner.displayName = "ContainerInner";

// ============================================================================
// MAIN CONTAINER COMPONENT
// ============================================================================

export type ContainerProps<
  T extends ContainerElementType,
  P extends Record<string, unknown> = {},
> = ContainerOuterProps<T, P>;

export function Container<
  T extends ContainerElementType,
  P extends Record<string, unknown> = {},
>(props: ContainerProps<T, P>) {
  const {
    as: Component = "div",
    children,
    debugId,
    debugMode,
    ...rest
  } = props;

  // Container component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!children) return null;

  return (
    <ContainerOuter
      {...(rest as ContainerOuterProps<T, P>)}
      as={Component}
      debugId={componentId}
      debugMode={isDebugMode}
    >
      <ContainerInner debugId={componentId} debugMode={isDebugMode}>
        {children}
      </ContainerInner>
    </ContainerOuter>
  );
}

Container.displayName = "Container";

// ============================================================================
// CONTAINER COMPOUND COMPONENT
// ============================================================================

Container.Inner = ContainerInner;
Container.Outer = ContainerOuter;

// ============================================================================
// MEMOIZED CONTAINER COMPONENT
// ============================================================================

export const MemoizedContainer = React.memo(Container);
