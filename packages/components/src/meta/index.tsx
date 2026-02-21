import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const MetaClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MetaClient };
});
const MemoizedMetaClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedMetaClient };
});

export type MetaRef = React.ComponentRef<"meta">;

export interface MetaProps
  extends
    Omit<React.ComponentPropsWithoutRef<"meta">, "as">,
    CommonComponentProps {}

/** Render the metadata server component. */
export const Meta = React.forwardRef<MetaRef, MetaProps>((props, ref) => {
  const {
    as: Component = "meta",
    isClient = false,
    isMemoized = false,
    ...rest
  } = props;

  const element = <Component {...rest} />;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedMetaClient : MetaClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest} ref={ref} />
      </Suspense>
    );
  }

  return element;
});

Meta.displayName = "Meta";
