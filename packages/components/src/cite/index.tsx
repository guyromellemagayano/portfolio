import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const CiteClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.CiteClient };
});
const MemoizedCiteClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedCiteClient };
});

export type CiteRef = React.ComponentRef<"cite">;

export interface CiteProps
  extends React.ComponentPropsWithoutRef<"cite">, CommonComponentProps {}

/** Render the cite server component. */
export const Cite = React.forwardRef<CiteRef, CiteProps>((props, ref) => {
  const {
    as: Component = "cite",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedCiteClient : CiteClient;

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

Cite.displayName = "Cite";
