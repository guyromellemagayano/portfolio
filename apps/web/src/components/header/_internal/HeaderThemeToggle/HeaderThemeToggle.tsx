"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useTheme } from "next-themes";

import { setDisplayName } from "@guyromellemagayano/utils";

import { Icon } from "@web/components/icon";
import { cn } from "@web/lib";

import { THEME_TOGGLE_LABELS } from "../../_data";
import styles from "./HeaderThemeToggle.module.css";

interface ThemeToggleProps extends React.ComponentProps<"button"> {
  /** Internal component ID (managed by parent) */
  _internalId?: string;
  /** Internal debug mode (managed by parent) */
  _debugMode?: boolean;
}
type HeaderThemeToggleComponent = React.FC<ThemeToggleProps>;

/** A theme toggle component that allows users to switch between light and dark themes. */
const HeaderThemeToggle: HeaderThemeToggleComponent = setDisplayName(
  function HeaderThemeToggle(props) {
    const { className, _internalId, _debugMode, ...rest } = props;

    const { resolvedTheme, setTheme } = useTheme();
    const otherTheme = resolvedTheme === "dark" ? "light" : "dark";
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    // Use internal props directly - no need for useComponentId in sub-components
    const id = _internalId;
    const isDebugMode = _debugMode;

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
          data-header-theme-toggle-id={id}
          data-debug-mode={isDebugMode ? "true" : undefined}
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
      id,
      isDebugMode,
    ]);

    return element;
  }
);

export { HeaderThemeToggle };
