import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const AClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.AClient };
});
const MemoizedAClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedAClient };
});

export type ARef = React.ComponentRef<"a">;

export interface AProps
  extends React.ComponentPropsWithoutRef<"a">, CommonComponentProps {}

/** Render the default anchor server component. */
export const A = React.forwardRef<ARef, AProps>((props, ref) => {
  const {
    as: Component = "a",
    href = "#",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = (
    <Component href={href} {...rest}>
      {children}
    </Component>
  );

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedAClient : AClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent href={href} {...rest} ref={ref}>
          {children}
        </ClientComponent>
      </Suspense>
    );
  }

  return element;
});

A.displayName = "A";
