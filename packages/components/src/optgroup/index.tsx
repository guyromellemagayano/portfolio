import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const OptgroupClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.OptgroupClient };
});
const MemoizedOptgroupClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedOptgroupClient };
});

export type OptgroupRef = React.ComponentRef<"optgroup">;

export interface OptgroupProps
  extends React.ComponentPropsWithoutRef<"optgroup">, CommonComponentProps {}

/** Render the option group server component. */
export const Optgroup = React.forwardRef<OptgroupRef, OptgroupProps>(
  (props, ref) => {
    const {
      as: Component = "optgroup",
      isClient = false,
      isMemoized = false,
      children,
      ...rest
    } = props;

    const element = <Component {...rest}>{children}</Component>;

    if (isClient) {
      const ClientComponent = isMemoized
        ? MemoizedOptgroupClient
        : OptgroupClient;

      return (
        <Suspense fallback={element}>
          <ClientComponent {...rest} ref={ref}>
            {children}
          </ClientComponent>
        </Suspense>
      );
    }

    return element;
  }
);

Optgroup.displayName = "Optgroup";
