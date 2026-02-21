import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const DetailsClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.DetailsClient };
});
const MemoizedDetailsClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedDetailsClient };
});

export type DetailsRef = React.ComponentRef<"details">;

export interface DetailsProps
  extends React.ComponentPropsWithoutRef<"details">, CommonComponentProps {}

/** Render the details disclosure server component. */
export const Details = React.forwardRef<DetailsRef, DetailsProps>(
  (props, ref) => {
    const {
      as: Component = "details",
      isClient = false,
      isMemoized = false,
      children,
      ...rest
    } = props;

    const element = <Component {...rest}>{children}</Component>;

    if (isClient) {
      const ClientComponent = isMemoized
        ? MemoizedDetailsClient
        : DetailsClient;

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

Details.displayName = "Details";
