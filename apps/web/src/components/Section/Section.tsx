import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

// ============================================================================
// SECTION TITLE COMPONENT
// ============================================================================

type SectionTitleElementType = "h2" | "h3";
type SectionTitleProps<T extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  "as"
> &
  Omit<CommonComponentProps, "as"> & {
    /** The component to render as - only "h2" or "h3" are allowed */
    as?: T;
  };

const SectionTitle = setDisplayName(function SectionTitle<
  T extends SectionTitleElementType,
>(props: SectionTitleProps<T>) {
  const {
    as: Component = "h2",
    children,
    className,
    debugId,
    debugMode,
    ...rest
  } = props;

  // Section title component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!children) return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
      className={cn(
        "text-sm font-semibold text-zinc-800 dark:text-zinc-100",
        className
      )}
      {...createComponentProps(componentId, "section-title", isDebugMode)}
    >
      {children}
    </Component>
  );
});

// ============================================================================
// SECTION CONTENT COMPONENT
// ============================================================================

type SectionContentElementType = "div";
type SectionContentProps<T extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  "as"
> &
  Omit<CommonComponentProps, "as"> & {
    /** The component to render as - only "div" is allowed */
    as?: T;
  };

const SectionContent = setDisplayName(function SectionContent(
  props: SectionContentProps<SectionContentElementType>
) {
  const {
    as: Component = "div",
    children,
    className,
    debugId,
    debugMode,
    ...rest
  } = props;

  // Section content component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!children) return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
      className={cn("md:col-span-3", className)}
      {...createComponentProps(componentId, "section-content", isDebugMode)}
    >
      {children}
    </Component>
  );
});

// ============================================================================
// SECTION GRID COMPONENT
// ============================================================================

type SectionGridElementType = "div";
type SectionGridProps<T extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  "as"
> &
  Omit<CommonComponentProps, "as"> & {
    /** The component to render as - only "div" is allowed */
    as?: T;
  };

const SectionGrid = setDisplayName(function SectionGrid<
  T extends SectionGridElementType,
>(props: SectionGridProps<T>) {
  const {
    as: Component = "div",
    children,
    className,
    debugId,
    debugMode,
    ...rest
  } = props;

  // Section grid component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!children) return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
      className={cn(
        "grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4",
        className
      )}
      {...createComponentProps(componentId, "section-grid", isDebugMode)}
    >
      {children}
    </Component>
  );
});

// ============================================================================
// SECTION COMPONENT
// ============================================================================

type SectionElementType = "section";

export type SectionProps<T extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  "as"
> &
  Omit<CommonComponentProps, "as"> & {
    /** The component to render as - only "section" is allowed */
    as?: T;
    /** The title of the section */
    title?: string;
  };

export const Section = setDisplayName(function Section<
  T extends SectionElementType,
>(props: SectionProps<T>) {
  const {
    as: Component = "section",
    children,
    className,
    title,
    debugId,
    debugMode,
    ...rest
  } = props;

  // Section component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({ debugId, debugMode });

  if (!title?.trim()?.length || !children) {
    return null;
  }

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
      className={cn(
        "md:border-l md:border-zinc-100 md:dark:border-zinc-700/40",
        className
      )}
      {...createComponentProps(componentId, "section", isDebugMode)}
    >
      <SectionGrid debugId={debugId} debugMode={debugMode}>
        <SectionTitle debugId={debugId} debugMode={debugMode}>
          {title}
        </SectionTitle>
        <SectionContent debugId={debugId} debugMode={debugMode}>
          {children}
        </SectionContent>
      </SectionGrid>
    </Component>
  );
});

// ============================================================================
// MEMOIZED SECTION COMPONENT
// ============================================================================

export const MemoizedSection = React.memo(Section);
