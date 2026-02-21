import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const FooterClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.FooterClient };
});
const MemoizedFooterClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedFooterClient };
});

export type FooterRef = React.ComponentRef<"footer">;

export interface FooterProps
  extends React.ComponentPropsWithoutRef<"footer">, CommonComponentProps {}

/** Render the footer server component. */
export const Footer = React.forwardRef<FooterRef, FooterProps>((props, ref) => {
  const {
    as: Component = "footer",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedFooterClient : FooterClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest} ref={ref}>
          {children}
        </ClientComponent>
      </Suspense>
    );
  }

  return element;
});

Footer.displayName = "Footer";
