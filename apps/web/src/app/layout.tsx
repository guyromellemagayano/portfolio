import React from "react";

import { setDisplayName } from "@guyromellemagayano/utils";

import { Providers } from "@web/app/providers";
import { Layout } from "@web/components";

import "@web/styles/tailwind.css";

// ============================================================================
// ROOT LAYOUT TYPES & INTERFACES
// ============================================================================

export interface RootLayoutProps {
  children: React.ReactNode;
}
export type RootLayoutComponent = React.FC<RootLayoutProps>;

// ============================================================================
// ROOT LAYOUT COMPONENT
// ============================================================================

const RootLayout: RootLayoutComponent = setDisplayName(
  function RootLayout(props) {
    const { children } = props;

    return (
      <html lang="en" className="h-full antialiased" suppressHydrationWarning>
        <body className="flex h-full bg-zinc-50 dark:bg-black">
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </body>
      </html>
    );
  }
);

export default RootLayout;
