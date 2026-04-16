import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const HgroupClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.HgroupClient };
});
const MemoizedHgroupClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedHgroupClient };
});

export type HgroupRef = React.ComponentRef<"hgroup">;

export interface HgroupProps
  extends React.ComponentPropsWithoutRef<"hgroup">, CommonComponentProps {}

/** Render the heading group server component. */
export const Hgroup = React.forwardRef<HgroupRef, HgroupProps>((props, ref) => {
  const {
    as: Component = "hgroup",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedHgroupClient : HgroupClient;

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

Hgroup.displayName = "Hgroup";
