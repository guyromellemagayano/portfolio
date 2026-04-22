/* eslint-disable react-refresh/only-export-components */

/**
 * @file apps/web/src/app/layout.tsx
 * @author Guy Romelle Magayano
 * @description Root layout wiring global providers, styles, and the route shell for the web app.
 */

import React from "react";

import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";

import { Providers } from "@web/app/providers";
import { RouteShell } from "@web/components/route-shell";
import { resolveSiteUrlBaseOrDefault } from "@web/utils/site-url";

import "@web/styles/tailwind.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    resolveSiteUrlBaseOrDefault(
      globalThis.process.env.NEXT_PUBLIC_SITE_URL ||
        globalThis.process.env.SITEMAP_SITE_URL ||
        "http://localhost:3000"
    )
  ),
  title: {
    default: "Guy Romelle Magayano",
    template: "%s | Guy Romelle Magayano",
  },
  description:
    "Portfolio of Guy Romelle Magayano, focused on product engineering, platform systems, and reusable web architecture.",
};

export type RootLayoutProps = {
  children: React.ReactNode;
};

/** Renders the root HTML layout and global providers for the web app. */
export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full flex-col bg-stone-50 text-zinc-950">
        <NextIntlClientProvider>
          <Providers>
            <RouteShell>{children}</RouteShell>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
