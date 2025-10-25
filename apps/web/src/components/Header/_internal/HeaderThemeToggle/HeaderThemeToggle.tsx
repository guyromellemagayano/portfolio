"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useTheme } from "next-themes";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Icon } from "@web/components/Icon";
import { cn } from "@web/utils";

import { THEME_TOGGLE_LABELS } from "../../Header.data";

// ============================================================================
// HEADER THEME TOGGLE COMPONENT TYPES & INTERFACES
// ============================================================================

export interface ThemeToggleProps
  extends React.ComponentPropsWithRef<"button">,
    CommonComponentProps {}
export type HeaderThemeToggleComponent = React.FC<ThemeToggleProps>;

// ============================================================================
// BASE HEADER THEME TOGGLE COMPONENT
// ============================================================================

const BaseHeaderThemeToggle: HeaderThemeToggleComponent = setDisplayName(
  function BaseHeaderThemeToggle(props) {
    const {
      as: Component = "button",
      className,
      debugId,
      debugMode,
      ...rest
    } = props;

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    const { resolvedTheme, setTheme } = useTheme();
    const otherTheme = resolvedTheme === "dark" ? "light" : "dark";

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    const handleClick = useCallback(() => {
      setTheme(otherTheme);
    }, [otherTheme, setTheme]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<React.ComponentRef<"button">>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      },
      [handleClick]
    );

    const element = useMemo(() => {
      const ariaLabel = mounted
        ? `Switch to ${otherTheme} theme`
        : THEME_TOGGLE_LABELS.toggleTheme;

      const element = (
        <Component
          {...rest}
          id={`${componentId}-header-theme-toggle`}
          className={cn(
            "group rounded-full bg-white/90 px-3 py-2 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20",
            className
          )}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          aria-label={ariaLabel}
          {...createComponentProps(
            componentId,
            "header-theme-toggle",
            isDebugMode
          )}
        >
          <Icon.Sun
            className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600"
            {...createComponentProps(
              componentId,
              "header-theme-toggle-sun-icon",
              isDebugMode
            )}
          />
          <Icon.Moon
            className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition not-[@media_(prefers-color-scheme:dark)]:fill-teal-400/10 not-[@media_(prefers-color-scheme:dark)]:stroke-teal-500 dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400"
            {...createComponentProps(
              componentId,
              "header-theme-toggle-moon-icon",
              isDebugMode
            )}
          />
        </Component>
      );

      return element;
    }, [
      mounted,
      otherTheme,
      handleClick,
      handleKeyDown,
      className,
      rest,
      componentId,
      isDebugMode,
      Component,
    ]);

    return element;
  }
);

// ============================================================================
// MEMOIZED HEADER THEME TOGGLE COMPONENT
// ============================================================================

const MemoizedHeaderThemeToggle = React.memo(BaseHeaderThemeToggle);

// ============================================================================
// MAIN HEADER THEME TOGGLE COMPONENT
// ============================================================================

export const HeaderThemeToggle: HeaderThemeToggleComponent = setDisplayName(
  function HeaderThemeToggle(props) {
    const { isMemoized = false, ...rest } = props;

    const Component = isMemoized
      ? MemoizedHeaderThemeToggle
      : BaseHeaderThemeToggle;
    const element = <Component {...rest} />;
    return element;
  }
);
