/**
 * @file apps/web/src/app/providers.tsx
 * @author Guy Romelle Magayano
 * @description Client provider composition for the web app.
 */

"use client";

import React from "react";

import { ThemeProvider } from "next-themes";

// ============================================================================
// PROVIDERS COMPONENT
// ============================================================================

export type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers(props: ProvidersProps) {
  const { children } = props;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

Providers.displayName = "Providers";
