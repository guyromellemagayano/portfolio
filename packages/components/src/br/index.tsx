import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const BrClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BrClient };
});
const MemoizedBrClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedBrClient };
});

export type BrRef = React.ComponentRef<"br">;

export interface BrProps
  extends React.ComponentPropsWithoutRef<"br">, CommonComponentProps {}

/** Render the line break server component. */
export const Br = React.forwardRef<BrRef, BrProps>((props, ref) => {
  const {
    as: Component = "br",
    isClient = false,
    isMemoized = false,
    ...rest
  } = props;

  const element = <Component {...rest} />;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedBrClient : BrClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest} ref={ref} />
      </Suspense>
    );
  }

  return element;
});

Br.displayName = "Br";
