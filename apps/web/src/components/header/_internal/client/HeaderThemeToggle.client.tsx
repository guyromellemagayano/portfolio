"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useTheme } from "next-themes";

import { Button, ButtonRef } from "@guyromellemagayano/components";

import {
  MoonIcon,
  SunIcon,
  THEME_TOGGLE_LABELS,
  type ThemeToggleProps,
  type ThemeToggleRef,
} from "@web/components/header";

import styles from "./HeaderThemeToggle.client.module.css";

/** A theme toggle component. */
export const HeaderThemeToggle = React.forwardRef<
  ThemeToggleRef,
  ThemeToggleProps
>(function HeaderThemeToggle(props, ref) {
  const { ...rest } = props;

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
    (event: React.KeyboardEvent<ButtonRef>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  const element = useMemo(() => {
    return (
      <Button
        ref={ref}
        data-testid="mock-button"
        aria-label={
          mounted
            ? `Switch to ${otherTheme} theme`
            : THEME_TOGGLE_LABELS.toggleTheme
        }
        className={styles.headerThemeToggleButton}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <SunIcon className={styles.headerThemeToggleSunIcon} />
        <MoonIcon className={styles.headerThemeToggleMoonIcon} />
      </Button>
    );
  }, [ref, mounted, otherTheme, handleClick, handleKeyDown, rest]);

  return element;
});

HeaderThemeToggle.displayName = "HeaderThemeToggle";
