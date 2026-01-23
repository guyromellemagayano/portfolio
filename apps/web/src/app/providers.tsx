/**
 * @file providers.tsx
 * @author Guy Romelle Magayano
 * @description Providers component for the web application.
 */

"use client";

// eslint-disable-next-line simple-import-sort/imports
import React, { useEffect, useRef } from "react";

import { ThemeProvider, useTheme } from "next-themes";
import { usePathname } from "next/navigation";

import { setDisplayName } from "@guyromellemagayano/utils";
import { NextIntlClientProvider } from "next-intl";
import { AppContext } from "./context";

/** A hook that returns the previous value of a given value. */
const usePrevious = function <T>(value: T): T | undefined {
  let ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

/** A component that watches the theme and updates the theme when the system theme changes. */
const ThemeWatcher = function ThemeWatcher(): null {
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

// ============================================================================
// PROVIDERS TYPES & INTERFACES
// ============================================================================

/** `ProvidersProps` type. */
export interface ProvidersProps {
  children: React.ReactNode;
}

/** `ProvidersComponent` type. */
export type ProvidersComponent = React.FC<ProvidersProps>;

// ============================================================================
// PROVIDERS COMPONENT
// ============================================================================

/** A context provider for the application. */
export const Providers: ProvidersComponent = setDisplayName(
  function Providers(props) {
    const { children } = props;

    let pathname = usePathname();
    let previousPathname = usePrevious(pathname);

    return (
      <AppContext.Provider value={{ previousPathname }}>
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ThemeWatcher />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </AppContext.Provider>
    );
  }
);
