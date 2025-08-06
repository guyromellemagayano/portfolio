import React from "react";

import { Body, Div, Html } from "@guyromellemagayano/components";

import { Providers } from "@web/app/providers";

import "@web/app/styles.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <Html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <Body as="body" className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <Div className="flex h-full">{children}</Div>
        </Providers>
      </Body>
    </Html>
  );
};

export default RootLayout;
