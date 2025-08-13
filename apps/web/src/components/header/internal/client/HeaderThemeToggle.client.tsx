"use client";

import React, { useEffect, useState } from "react";

import { useTheme } from "next-themes";

import { Button } from "@guyromellemagayano/components";

import type {
  ThemeToggleProps,
  ThemeToggleRef,
} from "@web/components/header/models";

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

  return (
    <Button
      ref={ref}
      data-testid="mock-button"
      aria-label={mounted ? `Switch to ${otherTheme} theme` : "Toggle theme"}
      className="group rounded-full bg-white/90 px-3 py-2 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
      onClick={() => setTheme(otherTheme)}
      {...rest}
    />
  );
});
