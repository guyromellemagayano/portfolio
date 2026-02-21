import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

export const AreaClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.AreaClient };
});
export const MemoizedAreaClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedAreaClient };
});

export type AreaRef = React.ComponentRef<"area">;

export interface AreaProps
  extends React.ComponentPropsWithoutRef<"area">, CommonComponentProps {}

/** Render the area server component. */
export const Area = React.forwardRef<AreaRef, AreaProps>((props, ref) => {
  const {
    as: Component = "area",
    alt = "",
    isClient = false,
    isMemoized = false,
    ...rest
  } = props;

  const element = <Component alt={alt} {...rest} ref={ref} />;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedAreaClient : AreaClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent alt={alt} {...rest} ref={ref} />
      </Suspense>
    );
  }

  return element;
});

Area.displayName = "Area";
