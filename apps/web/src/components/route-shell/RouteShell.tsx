/**
 * @file apps/web/src/components/route-shell/RouteShell.tsx
 * @author Guy Romelle Magayano
 * @description Orchestrates route-aware shell composition for web app pages.
 */

import React from "react";

import { Layout, type LayoutProps } from "@web/components/layout";

export type RouteShellElementType = typeof Layout;
export type RouteShellProps<P extends Record<string, unknown> = {}> = Omit<
  LayoutProps<P>,
  "as"
> &
  P & {
    as?: RouteShellElementType;
  };

export function RouteShell<P extends Record<string, unknown> = {}>(
  props: RouteShellProps<P>
) {
  const { as: Component = Layout, children, ...rest } = props;

  if (children == null) return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<RouteShellElementType>)}
    >
      {children}
    </Component>
  );
}

RouteShell.displayName = "RouteShell";
