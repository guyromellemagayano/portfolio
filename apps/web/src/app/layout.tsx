import React from "react";

import { NextIntlClientProvider } from "next-intl";

import { setDisplayName } from "@guyromellemagayano/utils";

import { Providers } from "@web/app/providers";
import { Layout } from "@web/components/layout";

import "@web/styles/tailwind.css";

export type RootLayoutProps = {
  children: React.ReactNode;
};

// ============================================================================
// ROOT LAYOUT COMPONENT
// ============================================================================

const RootLayout = setDisplayName(function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <NextIntlClientProvider>
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
});

export default RootLayout;
