import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const HtmlClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.HtmlClient };
});
const MemoizedHtmlClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedHtmlClient };
});

export type HtmlRef = React.ComponentRef<"html">;

export interface HtmlProps
  extends React.ComponentPropsWithoutRef<"html">, CommonComponentProps {}

/** Render the HTML document/root server component. */
export const Html = React.forwardRef<HtmlRef, HtmlProps>((props, ref) => {
  const {
    as: Component = "html",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedHtmlClient : HtmlClient;

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

Html.displayName = "Html";
