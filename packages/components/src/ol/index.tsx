import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const OlClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.OlClient };
});
const MemoizedOlClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedOlClient };
});

export type OlRef = React.ComponentRef<"ol">;

export interface OlProps
  extends React.ComponentPropsWithoutRef<"ol">, CommonComponentProps {}

/** Render the ordered list server component. */
export const Ol = React.forwardRef<OlRef, OlProps>((props, ref) => {
  const {
    as: Component = "ol",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedOlClient : OlClient;

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

Ol.displayName = "Ol";
