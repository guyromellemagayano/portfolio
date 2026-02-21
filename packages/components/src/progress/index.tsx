import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const ProgressClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.ProgressClient };
});
const MemoizedProgressClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedProgressClient };
});

export type ProgressRef = React.ComponentRef<"progress">;

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<"progress">, CommonComponentProps {}

/** Render the progress indicator server component. */
export const Progress = React.forwardRef<ProgressRef, ProgressProps>(
  (props, ref) => {
    const {
      as: Component = "progress",
      isClient = false,
      isMemoized = false,
      children,
      ...rest
    } = props;

    const element = <Component {...rest}>{children}</Component>;

    if (isClient) {
      const ClientComponent = isMemoized
        ? MemoizedProgressClient
        : ProgressClient;

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

Progress.displayName = "Progress";
