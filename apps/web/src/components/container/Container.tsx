/**
 * @file Container.tsx
 * @author Guy Romelle Magayano
 * @description Container component for the web application.
 */

import React from "react";

import { cn } from "@web/utils/helpers";

// ============================================================================
// COMMON CONTAINER COMPONENT TYPES
// ============================================================================

type ContainerElementType =
  | "div"
  | "section"
  | "main"
  | "article"
  | "nav"
  | "header"
  | "footer"
  | "aside";

// ============================================================================
// OUTER CONTAINER COMPONENT
// ============================================================================

export type ContainerOuterProps<P extends Record<string, unknown> = {}> = Omit<
  React.ComponentPropsWithRef<ContainerElementType>,
  "as"
> &
  P & {
    as?: ContainerElementType;
  };

function ContainerOuter<P extends Record<string, unknown> = {}>(
  props: ContainerOuterProps<P>
) {
  const { as: Component = "div", children, className, ...rest } = props;

  if (!children) return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<ContainerElementType>)}
      className={cn("sm:px-8", className)}
    >
      <div className="mx-auto w-full max-w-7xl lg:px-8">{children}</div>
    </Component>
  );
}

ContainerOuter.displayName = "ContainerOuter";

// ============================================================================
// INNER CONTAINER COMPONENT
// ============================================================================

type ContainerInnerProps<P extends Record<string, unknown> = {}> = Omit<
  React.ComponentPropsWithRef<ContainerElementType>,
  "as"
> &
  P & {
    as?: ContainerElementType;
  };

function ContainerInner<P extends Record<string, unknown> = {}>(
  props: ContainerInnerProps<P>
) {
  const { as: Component = "div", children, className, ...rest } = props;

  if (!children) return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<ContainerElementType>)}
      className={cn("relative px-4 sm:px-8 lg:px-12", className)}
    >
      <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
    </Component>
  );
}

ContainerInner.displayName = "ContainerInner";

// ============================================================================
// MAIN CONTAINER COMPONENT
// ============================================================================

export type ContainerProps<P extends Record<string, unknown> = {}> =
  ContainerOuterProps<P>;

export function Container<P extends Record<string, unknown> = {}>(
  props: ContainerProps<P>
) {
  const { as: Component = ContainerOuter, children, ...rest } = props;

  if (!children) return null;

  return (
    <Component {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}>
      <ContainerInner>{children}</ContainerInner>
    </Component>
  );
}

Container.displayName = "Container";

// ============================================================================
// CONTAINER COMPOUND COMPONENT
// ============================================================================

Container.Inner = ContainerInner;
Container.Outer = ContainerOuter;
