/**
 * @file Prose.tsx
 * @author Guy Romelle Magayano
 * @description Prose component for the web application.
 */

import React from "react";

import { cn } from "@web/utils/helpers";

// ============================================================================
// PROSE COMPONENT
// ============================================================================

type ProseElementType = "div";

export type ProseProps<
  T extends ProseElementType,
  P extends Record<string, unknown> = {},
> = Omit<React.ComponentPropsWithRef<T>, "as"> &
  P & {
    as?: T;
  };

export function Prose<
  T extends ProseElementType,
  P extends Record<string, unknown> = {},
>(props: ProseProps<T, P>) {
  const { as: Component = "div", className, ...rest } = props;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<T>)}
      className={cn("prose dark:prose-invert", className)}
    />
  );
}

Prose.displayName = "Prose";
