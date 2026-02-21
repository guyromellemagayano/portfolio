import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const SupClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.SupClient };
});
const MemoizedSupClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedSupClient };
});

export type SupRef = React.ComponentRef<"sup">;

export interface SupProps
  extends React.ComponentPropsWithoutRef<"sup">, CommonComponentProps {}

/** Render the superscript server component. */
export const Sup = React.forwardRef<SupRef, SupProps>((props, ref) => {
  const {
    as: Component = "sup",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedSupClient : SupClient;

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

Sup.displayName = "Sup";
