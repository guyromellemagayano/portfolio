import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const SourceClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.SourceClient };
});
const MemoizedSourceClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedSourceClient };
});

export type SourceRef = React.ComponentRef<"source">;

export interface SourceProps
  extends React.ComponentPropsWithoutRef<"source">, CommonComponentProps {}

/** Render the media or image source server component. */
export const Source = React.forwardRef<SourceRef, SourceProps>((props, ref) => {
  const {
    as: Component = "source",
    isClient = false,
    isMemoized = false,
    ...rest
  } = props;

  const element = <Component {...rest} />;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedSourceClient : SourceClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest} ref={ref} />
      </Suspense>
    );
  }

  return element;
});

Source.displayName = "Source";
