import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const AsideClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.AsideClient };
});
const MemoizedAsideClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedAsideClient };
});

export type AsideRef = React.ComponentRef<"aside">;

export interface AsideProps
  extends React.ComponentPropsWithoutRef<"aside">, CommonComponentProps {}

/** Render the aside server component. */
export const Aside = React.forwardRef<AsideRef, AsideProps>((props, ref) => {
  const {
    as: Component = "aside",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedAsideClient : AsideClient;

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

Aside.displayName = "Aside";
