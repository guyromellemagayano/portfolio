import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const NoscriptClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.NoscriptClient };
});
const MemoizedNoscriptClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedNoscriptClient };
});

export type NoscriptRef = React.ComponentRef<"noscript">;

export interface NoscriptProps
  extends React.ComponentPropsWithoutRef<"noscript">, CommonComponentProps {}

/** Render the noscript server component. */
export const Noscript = React.forwardRef<NoscriptRef, NoscriptProps>(
  (props, ref) => {
    const {
      as: Component = "noscript",
      isClient = false,
      isMemoized = false,
      children,
      ...rest
    } = props;

    const element = <Component {...rest}>{children}</Component>;

    if (isClient) {
      const ClientComponent = isMemoized
        ? MemoizedNoscriptClient
        : NoscriptClient;

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

Noscript.displayName = "Noscript";
