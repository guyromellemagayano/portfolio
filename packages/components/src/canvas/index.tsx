import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const CanvasClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.CanvasClient };
});
const MemoizedCanvasClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedCanvasClient };
});

export type CanvasRef = React.ComponentRef<"canvas">;

export interface CanvasProps
  extends React.ComponentPropsWithoutRef<"canvas">, CommonComponentProps {}

/** Render the canvas server component. */
export const Canvas = React.forwardRef<CanvasRef, CanvasProps>((props, ref) => {
  const {
    as: Component = "canvas",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedCanvasClient : CanvasClient;

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

Canvas.displayName = "Canvas";
