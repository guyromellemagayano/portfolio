/**
 * @file apps/web/src/components/section/Section.tsx
 * @author Guy Romelle Magayano
 * @description Main Section component implementation.
 */

import {
  useId,
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
} from "react";

import { cn } from "@web/utils/helpers";

// ============================================================================
// SECTION TITLE COMPONENT
// ============================================================================

export type SectionTitleElementType = "h2" | "h3";
export type SectionTitleProps<P extends Record<string, unknown> = {}> = Omit<
  ComponentPropsWithRef<SectionTitleElementType>,
  "as"
> &
  P & {
    as?: SectionTitleElementType;
  };

function SectionTitle<P extends Record<string, unknown> = {}>(
  props: SectionTitleProps<P>
) {
  const { as: Component = "h2", className, children, ...rest } = props;

  if (children == null || children === false || children === "") return null;

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<SectionTitleElementType>)}
      className={cn(
        "text-sm font-semibold text-zinc-800 dark:text-zinc-100",
        className
      )}
    >
      {children}
    </Component>
  );
}

SectionTitle.displayName = "SectionTitle";

// ============================================================================
// SECTION CONTENT COMPONENT
// ============================================================================

export type SectionContentElementType = "div" | "section" | "article";
export type SectionContentProps<P extends Record<string, unknown> = {}> = Omit<
  ComponentPropsWithRef<SectionContentElementType>,
  "as"
> &
  P & {
    as?: SectionContentElementType;
  };

function SectionContent<P extends Record<string, unknown> = {}>(
  props: SectionContentProps<P>
) {
  const { as: Component = "div", className, children, ...rest } = props;

  if (children == null || children === false || children === "") return null;

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<SectionContentElementType>)}
      className={cn("md:col-span-3", className)}
    >
      {children}
    </Component>
  );
}

SectionContent.displayName = "SectionContent";

// ============================================================================
// SECTION GRID COMPONENT
// ============================================================================

export type SectionGridElementType = "div" | "section" | "article";
export type SectionGridProps<P extends Record<string, unknown> = {}> = Omit<
  ComponentPropsWithRef<SectionGridElementType>,
  "as"
> &
  P & {
    as?: SectionGridElementType;
  };

function SectionGrid<P extends Record<string, unknown> = {}>(
  props: SectionGridProps<P>
) {
  const { as: Component = "div", className, children, ...rest } = props;

  if (children == null || children === false || children === "") return null;

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<SectionGridElementType>)}
      className={cn(
        "grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4",
        className
      )}
    >
      {children}
    </Component>
  );
}

SectionGrid.displayName = "SectionGrid";

// ============================================================================
// MAIN SECTION COMPONENT
// ============================================================================

export type SectionElementType = "section" | "div" | "article";
export type SectionProps<P extends Record<string, unknown> = {}> = Omit<
  ComponentPropsWithRef<SectionElementType>,
  "as"
> &
  P & {
    as?: SectionElementType;
    title?: string;
  };

export function Section<P extends Record<string, unknown> = {}>(
  props: SectionProps<P>
) {
  const {
    as: Component = "section",
    title,
    className,
    children,
    ...rest
  } = props;

  const titleId = useId();
  const sectionTitleId = `${titleId}-section-title`;

  if (!title?.trim()?.length || !children) {
    return null;
  }

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<SectionElementType>)}
      aria-labelledby={sectionTitleId}
      className={cn(
        "md:border-l md:border-zinc-100 md:dark:border-zinc-700/40",
        className
      )}
    >
      <SectionGrid>
        <SectionTitle id={sectionTitleId}>{title}</SectionTitle>
        <SectionContent>{children}</SectionContent>
      </SectionGrid>
    </Component>
  );
}

Section.displayName = "Section";
