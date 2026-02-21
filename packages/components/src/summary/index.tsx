import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const SummaryClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.SummaryClient };
});
const MemoizedSummaryClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedSummaryClient };
});

export type SummaryRef = React.ComponentRef<"summary">;

export interface SummaryProps
  extends React.ComponentPropsWithoutRef<"summary">, CommonComponentProps {}

/** Render the disclosure summary server component. */
export const Summary = React.forwardRef<SummaryRef, SummaryProps>(
  (props, ref) => {
    const {
      as: Component = "summary",
      isClient = false,
      isMemoized = false,
      children,
      ...rest
    } = props;

    const element = <Component {...rest}>{children}</Component>;

    if (isClient) {
      const ClientComponent = isMemoized
        ? MemoizedSummaryClient
        : SummaryClient;

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

Summary.displayName = "Summary";
