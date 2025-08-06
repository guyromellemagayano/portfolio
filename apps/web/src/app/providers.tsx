"use client";

import React, { useEffect, useRef } from "react";

import { usePathname } from "next/navigation";
import { ThemeProvider, useTheme } from "next-themes";

import { AppContext } from "./context";

/**
 * A hook that returns the previous value of a given value.
 */
const usePrevious = function <T>(value: T): T | undefined {
  let ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

/**
 * A component that watches the theme and updates the theme when the system theme changes.
 */
const ThemeWatcher = (): null => {
  let { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
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

/**
 * A context provider for the application.
 */
export const Providers = ({ children }: { children: React.ReactNode }) => {
  let pathname = usePathname();
  let previousPathname = usePrevious(pathname);

  return (
    <AppContext.Provider value={{ previousPathname }}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ThemeWatcher />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
};
