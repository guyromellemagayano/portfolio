/**
 * @file Text.tsx
 * @author Guy Romelle Magayano
 * @description Text components including headings, paragraphs, and spans for the web application.
 */

import { type ComponentPropsWithRef } from "react";

import { cn } from "@web/utils/helpers";

// ============================================================================
// HEADING COMPONENT
// ============================================================================

export type HeadingElementType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type HeadingProps<P extends Record<string, unknown> = {}> = Omit<
  ComponentPropsWithRef<HeadingElementType>,
  "as"
> &
  P & {
    as?: HeadingElementType;
  };

export function Heading<P extends Record<string, unknown> = {}>(
  props: HeadingProps<P>
) {
  const { as: Component = "h1", children, className, ...rest } = props;

  if (!children) return null;

  return (
    <Component
      {...(rest as ComponentPropsWithRef<HeadingElementType>)}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}

Heading.displayName = "Heading";

// ============================================================================
// SUB-HEADING COMPONENT
// ============================================================================

export type SubHeadingElementType = "p";
export type SubHeadingProps<P extends Record<string, unknown> = {}> = Omit<
  ComponentPropsWithRef<SubHeadingElementType>,
  "as"
> &
  P & {
    as?: SubHeadingElementType;
  };

export function SubHeading<P extends Record<string, unknown> = {}>(
  props: SubHeadingProps<P>
) {
  const { as: Component = "p", children, className, ...rest } = props;

  if (!children) return null;

  return (
    <Component
      {...(rest as ComponentPropsWithRef<SubHeadingElementType>)}
      className={cn(
        "font-mono text-xs/5 font-bold tracking-widest text-zinc-500 uppercase dark:text-zinc-400",
        className
      )}
    >
      {children}
    </Component>
  );
}

SubHeading.displayName = "SubHeading";

// ============================================================================
// LEAD COMPONENT
// ============================================================================

export type LeadElementType = SubHeadingElementType;
export type LeadProps<P extends Record<string, unknown> = {}> = Omit<
  ComponentPropsWithRef<LeadElementType>,
  "as"
> &
  P & {
    as?: LeadElementType;
  };

export function Lead<P extends Record<string, unknown> = {}>(
  props: LeadProps<P>
) {
  const { as: Component = "p", children, className, ...rest } = props;

  if (!children) return null;

  return (
    <Component
      {...(rest as ComponentPropsWithRef<LeadElementType>)}
      className={cn(
        "max-w-3xl text-xl font-medium tracking-tight text-pretty text-zinc-500 dark:text-zinc-400",
        className
      )}
    >
      {children}
    </Component>
  );
}

Lead.displayName = "Lead";
