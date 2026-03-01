/**
 * @file apps/web/src/app/providers.tsx
 * @author Guy Romelle Magayano
 * @description Implementation for providers.
 */

"use client";

import React from "react";

import { ThemeProvider, useTheme } from "next-themes";

/** A component that watches the theme and updates the theme when the system theme changes. */
const ThemeWatcher = function ThemeWatcher(): null {
  let { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => {
    let media = window.matchMedia("(prefers-color-scheme: dark)");

    const onMediaChange = (): void => {
      let systemTheme = media.matches ? "dark" : "light";
      if (resolvedTheme === systemTheme) {
        setTheme("system");
      }
    };

    onMediaChange();
    media.addEventListener("change", onMediaChange);

    return () => {
      media.removeEventListener("change", onMediaChange);
    };
  }, [resolvedTheme, setTheme]);

  return null;
};

export type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers(props: ProvidersProps) {
  const { children } = props;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ThemeWatcher />
      {children}
    </ThemeProvider>
  );
}

Providers.displayName = "Providers";
