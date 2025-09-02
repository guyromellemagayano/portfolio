"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useTheme } from "next-themes";

import { type ComponentProps, setDisplayName } from "@guyromellemagayano/utils";

import { Icon } from "@web/components/icon";
import { cn } from "@web/lib";

import { THEME_TOGGLE_LABELS } from "../../_data";
import styles from "./HeaderThemeToggle.module.css";

interface ThemeToggleProps
  extends React.ComponentProps<"button">,
    ComponentProps {}
type HeaderThemeToggleComponent = React.FC<ThemeToggleProps>;

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
          data-header-theme-toggle-id={`${_internalId}-header-theme-toggle`}
          data-debug-mode={_debugMode ? "true" : undefined}
          data-testid="header-theme-toggle-root"
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

const MemoizedHeaderThemeToggle = React.memo(BaseHeaderThemeToggle);

// ============================================================================
// MAIN HEADER THEME TOGGLE COMPONENT
// ============================================================================

const HeaderThemeToggle: HeaderThemeToggleComponent = setDisplayName(
  function HeaderThemeToggle(props) {
    const { isMemoized = false, _internalId, _debugMode, ...rest } = props;

    const updatedProps = { ...rest, _internalId, _debugMode };

    const Component = isMemoized
      ? MemoizedHeaderThemeToggle
      : BaseHeaderThemeToggle;
    const element = <Component {...updatedProps} />;
    return element;
  }
);

export { HeaderThemeToggle };
