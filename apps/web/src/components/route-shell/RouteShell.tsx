/**
 * @file apps/web/src/components/route-shell/RouteShell.tsx
 * @author Guy Romelle Magayano
 * @description Orchestrates route-aware shell composition for web app pages.
 */

"use client";

import React from "react";

import { usePathname } from "next/navigation";

import { Layout } from "@web/components/layout";

export type RouteShellProps = {
  children: React.ReactNode;
};

export function RouteShell(props: RouteShellProps) {
  const { children } = props;
  const pathname = usePathname();
  const isStudioRoute =
    pathname === "/studio" || pathname?.startsWith("/studio/");

  if (isStudioRoute) {
    return <>{children}</>;
  }

  return <Layout>{children}</Layout>;
}

RouteShell.displayName = "RouteShell";
