import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const MapClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MapClient };
});
const MemoizedMapClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedMapClient };
});

export type MapRef = React.ComponentRef<"map">;

export interface MapProps
  extends React.ComponentPropsWithoutRef<"map">, CommonComponentProps {}

/** Render the image map server component. */
export const Map = React.forwardRef<MapRef, MapProps>((props, ref) => {
  const {
    as: Component = "map",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedMapClient : MapClient;

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

Map.displayName = "Map";
