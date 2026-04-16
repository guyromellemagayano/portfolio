import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const SampClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.SampClient };
});
const MemoizedSampClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedSampClient };
});

export type SampRef = React.ComponentRef<"samp">;

export interface SampProps
  extends React.ComponentPropsWithoutRef<"samp">, CommonComponentProps {}

/** Render the sample output server component. */
export const Samp = React.forwardRef<SampRef, SampProps>((props, ref) => {
  const {
    as: Component = "samp",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedSampClient : SampClient;

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

Samp.displayName = "Samp";
