import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const DivClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.DivClient };
});
const MemoizedDivClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedDivClient };
});

export type DivRef = React.ComponentRef<"div">;

export interface DivProps
  extends React.ComponentPropsWithoutRef<"div">, CommonComponentProps {}

/** Render the content division server component. */
export const Div = React.forwardRef<DivRef, DivProps>((props, ref) => {
  const {
    as: Component = "div",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedDivClient : DivClient;

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

Div.displayName = "Div";
