/**
 * @file apps/web/src/components/prose/Prose.tsx
 * @author Guy Romelle Magayano
 * @description Main Prose component implementation.
 */

import {
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
} from "react";

import { cn } from "@web/utils/helpers";

// ============================================================================
// PROSE COMPONENT
// ============================================================================

export type ProseElementType = "div";
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
