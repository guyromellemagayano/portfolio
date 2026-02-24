/**
 * @file apps/web/src/app/layout.tsx
 * @author Guy Romelle Magayano
 * @description Implementation for layout.
 */

import React from "react";

import { NextIntlClientProvider } from "next-intl";

import { Providers } from "@web/app/providers";
import { RouteShell } from "@web/components/route-shell";

import "@web/styles/tailwind.css";

export type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <NextIntlClientProvider>
          <Providers>
            <RouteShell>{children}</RouteShell>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
