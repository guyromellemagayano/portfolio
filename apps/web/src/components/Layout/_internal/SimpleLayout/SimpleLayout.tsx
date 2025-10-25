import React from "react";

import Link from "next/link";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Container } from "@web/components";
import { cn } from "@web/utils";

import { COMMON_LAYOUT_COMPONENT_LABELS } from "../../Layout.data";

// ============================================================================
// SIMPLE LAYOUT COMPONENT TYPES & INTERFACES
// ============================================================================

export interface SimpleLayoutProps
  extends React.ComponentProps<"div">,
    CommonComponentProps {
  /** Page title */
  title: string;
  /** Page introduction */
  intro: string;
}
export type SimpleLayoutComponent = React.FC<SimpleLayoutProps>;

// ============================================================================
// BASE SIMPLE LAYOUT COMPONENT
// ============================================================================

const BaseSimpleLayout: SimpleLayoutComponent = setDisplayName(
  function BaseSimpleLayout(props) {
    const {
      as: Component = Container,
      children,
      className,
      title,
      intro,
      debugId,
      debugMode,
      ...rest
    } = props;

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    const element = (
      <Component
        {...rest}
        className={cn("mt-16 sm:mt-32", className)}
        {...createComponentProps(componentId, "simple-layout", isDebugMode)}
      >
        <Link
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-zinc-900 focus:px-3 focus:py-2 focus:text-white dark:focus:bg-zinc-100 dark:focus:text-zinc-900"
          aria-label={COMMON_LAYOUT_COMPONENT_LABELS.skipToMainContent}
          {...createComponentProps(
            componentId,
            "simple-layout-link",
            isDebugMode
          )}
        >
          {COMMON_LAYOUT_COMPONENT_LABELS.skipToMainContent}
        </Link>

        <header className="max-w-2xl">
          {title && title.trim() !== "" && title.length > 0 ? (
            <h1
              className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
              {...createComponentProps(
                componentId,
                "simple-layout-title",
                isDebugMode
              )}
            >
              {title}
            </h1>
          ) : null}

          {intro && intro.trim() !== "" && intro.length > 0 ? (
            <p
              className="mt-6 text-base text-zinc-600 dark:text-zinc-400"
              {...createComponentProps(
                componentId,
                "simple-layout-intro",
                isDebugMode
              )}
            >
              {intro}
            </p>
          ) : null}
        </header>

        {children ? (
          <main
            role="main"
            className="mt-16 sm:mt-20"
            {...createComponentProps(
              componentId,
              "simple-layout-content",
              isDebugMode
            )}
          >
            {children}
          </main>
        ) : null}
      </Component>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED BASE SIMPLE LAYOUT COMPONENT
// ============================================================================

const MemoizedSimpleLayout = React.memo(BaseSimpleLayout);

// ============================================================================
// MAIN SIMPLE LAYOUT COMPONENT
// ============================================================================

export const SimpleLayout: SimpleLayoutComponent = setDisplayName(
  function SimpleLayout(props) {
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedSimpleLayout : BaseSimpleLayout;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);
