import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

export const AbbrClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.AbbrClient };
});
export const MemoizedAbbrClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedAbbrClient };
});

export type AbbrRef = React.ComponentRef<"abbr">;

export interface AbbrProps
  extends React.ComponentPropsWithoutRef<"abbr">, CommonComponentProps {}

/** Render the abbreviation server component. */
export const Abbr = React.forwardRef<AbbrRef, AbbrProps>((props, ref) => {
  const {
    as: Component = "abbr",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedAbbrClient : AbbrClient;

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

Abbr.displayName = "Abbr";
