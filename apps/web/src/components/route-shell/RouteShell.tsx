/**
 * @file apps/web/src/components/route-shell/RouteShell.tsx
 * @author Guy Romelle Magayano
 * @description Orchestrates route-aware shell composition for web app pages.
 */

"use client";

import React from "react";

import { usePathname } from "next/navigation";

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

  const pathname = usePathname();
  const isStudioRoute =
    pathname === "/studio" || pathname?.startsWith("/studio/");

  if (children == null) return null;

  if (isStudioRoute) {
    return <>{children}</>;
  }

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<RouteShellElementType>)}
    >
      {children}
    </Component>
  );
}

RouteShell.displayName = "RouteShell";
