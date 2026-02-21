import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const SmallClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.SmallClient };
});
const MemoizedSmallClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedSmallClient };
});

export type SmallRef = React.ComponentRef<"small">;

export interface SmallProps
  extends React.ComponentPropsWithoutRef<"small">, CommonComponentProps {}

/** Render the side comment server component. */
export const Small = React.forwardRef<SmallRef, SmallProps>((props, ref) => {
  const {
    as: Component = "small",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedSmallClient : SmallClient;

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

Small.displayName = "Small";
