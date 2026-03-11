import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const DelClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.DelClient };
});
const MemoizedDelClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedDelClient };
});

export type DelRef = React.ComponentRef<"del">;

export interface DelProps
  extends React.ComponentPropsWithoutRef<"del">, CommonComponentProps {}

/** Render the deleted text server component. */
export const Del = React.forwardRef<DelRef, DelProps>((props, ref) => {
  const {
    as: Component = "del",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedDelClient : DelClient;

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

Del.displayName = "Del";
