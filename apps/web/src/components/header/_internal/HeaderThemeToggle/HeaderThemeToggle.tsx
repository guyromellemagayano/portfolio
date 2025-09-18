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

import { THEME_TOGGLE_LABELS } from "../../_data";
import styles from "./HeaderThemeToggle.module.css";

// ============================================================================
// HEADER THEME TOGGLE COMPONENT TYPES & INTERFACES
// ============================================================================

interface ThemeToggleProps
  extends React.ComponentPropsWithRef<"button">,
    Omit<CommonComponentProps, "as"> {}
type HeaderThemeToggleComponent = React.FC<ThemeToggleProps>;

// ============================================================================
// BASE HEADER THEME TOGGLE COMPONENT
// ============================================================================

/** A theme toggle component that allows users to switch between light and dark themes. */
const BaseHeaderThemeToggle: HeaderThemeToggleComponent = setDisplayName(
  function BaseHeaderThemeToggle(props) {
    const { className, _internalId, _debugMode, ...rest } = props;

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
        <button
          {...rest}
          aria-label={ariaLabel}
          className={cn(styles.headerThemeToggleButton, className)}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          {...createComponentProps(
            _internalId,
            "header-theme-toggle",
            _debugMode
          )}
        >
          <Icon.Sun className={styles.headerThemeToggleSunIcon} />
          <Icon.Moon className={styles.headerThemeToggleMoonIcon} />
        </button>
      );

      return element;
    }, [
      mounted,
      otherTheme,
      handleClick,
      handleKeyDown,
      className,
      rest,
      _internalId,
      _debugMode,
    ]);

    return element;
  }
);

// ============================================================================
// MEMOIZED HEADER THEME TOGGLE COMPONENT
// ============================================================================

/** A memoized header theme toggle component. */
const MemoizedHeaderThemeToggle = React.memo(BaseHeaderThemeToggle);

// ============================================================================
// MAIN HEADER THEME TOGGLE COMPONENT
// ============================================================================

/** A header theme toggle component that supports memoization and internal debug props. */
export const HeaderThemeToggle: HeaderThemeToggleComponent = setDisplayName(
  function HeaderThemeToggle(props) {
    const { isMemoized = false, _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const updatedProps = { ...rest, _internalId: id, _debugMode: isDebugMode };

    const Component = isMemoized
      ? MemoizedHeaderThemeToggle
      : BaseHeaderThemeToggle;
    const element = <Component {...updatedProps} />;
    return element;
  }
);
