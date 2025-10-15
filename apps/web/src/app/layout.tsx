import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Providers } from "@web/app/providers";
import { Layout } from "@web/components";

import "@web/styles/tailwind.css";

// ============================================================================
// ROOT LAYOUT TYPES & INTERFACES
// ============================================================================

/** `RootLayoutProps` type. */
export interface RootLayoutProps {
  children: React.ReactNode;
}

/** `RootLayoutComponent` type. */
export type RootLayoutComponent = React.FC<RootLayoutProps>;

// ============================================================================
// ROOT LAYOUT COMPONENT
// ============================================================================

/** Root layout component that wraps the entire application with providers and layout. */
const RootLayout: RootLayoutComponent = setDisplayName(
  function RootLayout(props) {
    const { children } = props;

    const { componentId, isDebugMode } = useComponentId();

    return (
      <html
        lang="en"
        className="h-full antialiased"
        {...createComponentProps(componentId, "html", isDebugMode)}
        suppressHydrationWarning
      >
        <body
          className="flex h-full bg-zinc-50 dark:bg-black"
          {...createComponentProps(componentId, "body", isDebugMode)}
        >
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </body>
      </html>
    );
  }
);

export default RootLayout;
