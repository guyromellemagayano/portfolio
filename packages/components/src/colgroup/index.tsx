import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const ColgroupClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.ColgroupClient };
});
const MemoizedColgroupClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedColgroupClient };
});

export type ColgroupRef = React.ComponentRef<"colgroup">;

export interface ColgroupProps
  extends React.ComponentPropsWithoutRef<"colgroup">, CommonComponentProps {}

/** Render the table column group server component. */
export const Colgroup = React.forwardRef<ColgroupRef, ColgroupProps>(
  (props, ref) => {
    const {
      as: Component = "colgroup",
      isClient = false,
      isMemoized = false,
      children,
      ...rest
    } = props;

    const element = <Component {...rest}>{children}</Component>;

    if (isClient) {
      const ClientComponent = isMemoized
        ? MemoizedColgroupClient
        : ColgroupClient;

      return (
        <Suspense fallback={element}>
          <ClientComponent {...rest} ref={ref}>
            {children}
          </ClientComponent>
        </Suspense>
      );
    }

    return element;
  }
);

Colgroup.displayName = "Colgroup";
