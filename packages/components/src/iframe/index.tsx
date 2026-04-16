import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const IframeClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.IframeClient };
});
const MemoizedIframeClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedIframeClient };
});

export type IframeRef = React.ComponentRef<"iframe">;

export interface IframeProps
  extends React.ComponentPropsWithoutRef<"iframe">, CommonComponentProps {}

/** Render the inline frame server component. */
export const Iframe = React.forwardRef<IframeRef, IframeProps>((props, ref) => {
  const {
    as: Component = "iframe",
    isClient = false,
    isMemoized = false,
    ...rest
  } = props;

  const element = <Component {...rest} />;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedIframeClient : IframeClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest} ref={ref} />
      </Suspense>
    );
  }

  return element;
});

Iframe.displayName = "Iframe";
