import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const FigureClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.FigureClient };
});
const MemoizedFigureClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedFigureClient };
});

export type FigureRef = React.ComponentRef<"figure">;

export interface FigureProps
  extends React.ComponentPropsWithoutRef<"figure">, CommonComponentProps {}

/** Render the figure with optional caption server component. */
export const Figure = React.forwardRef<FigureRef, FigureProps>((props, ref) => {
  const {
    as: Component = "figure",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedFigureClient : FigureClient;

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

Figure.displayName = "Figure";
