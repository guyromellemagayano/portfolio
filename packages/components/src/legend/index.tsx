import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const LegendClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.LegendClient };
});
const MemoizedLegendClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedLegendClient };
});

export type LegendRef = React.ComponentRef<"legend">;

export interface LegendProps
  extends React.ComponentPropsWithoutRef<"legend">, CommonComponentProps {}

/** Render the field set legend server component. */
export const Legend = React.forwardRef<LegendRef, LegendProps>((props, ref) => {
  const {
    as: Component = "legend",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedLegendClient : LegendClient;

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

Legend.displayName = "Legend";
