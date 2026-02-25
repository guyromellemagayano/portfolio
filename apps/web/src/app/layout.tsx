/**
 * @file apps/web/src/app/layout.tsx
 * @author Guy Romelle Magayano
 * @description Root layout wiring global providers, styles, and the route shell for the web app.
 */

import React from "react";

import { NextIntlClientProvider } from "next-intl";

import { Providers } from "@web/app/providers";
import { RouteShell } from "@web/components/route-shell";

import "@web/styles/tailwind.css";

export type RootLayoutProps = {
  children: React.ReactNode;
};

/**
 * Renders the root HTML layout and global providers for the web app.
 *
 * @param props Layout props containing routed children.
 * @returns Root document layout for the application.
 */
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
