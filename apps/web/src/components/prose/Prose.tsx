/**
 * @file Prose.tsx
 * @author Guy Romelle Magayano
 * @description Prose component for the web application.
 */

import {
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
} from "react";

import { cn } from "@web/utils/helpers";

// ============================================================================
// PROSE COMPONENT
// ============================================================================

type ProseElementType = "div";

export type ProseProps<P extends Record<string, unknown> = {}> = Omit<
  ComponentPropsWithRef<ProseElementType>,
  "as"
> &
  P & {
    as?: ProseElementType;
  };

export function Prose<P extends Record<string, unknown> = {}>(
  props: ProseProps<P>
) {
  const { as: Component = "div", className, ...rest } = props;

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<ProseElementType>)}
      className={cn("prose dark:prose-invert", className)}
    />
  );
}

Prose.displayName = "Prose";
