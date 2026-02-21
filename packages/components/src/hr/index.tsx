import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const HrClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.HrClient };
});
const MemoizedHrClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedHrClient };
});

export type HrRef = React.ComponentRef<"hr">;

export interface HrProps
  extends React.ComponentPropsWithoutRef<"hr">, CommonComponentProps {}

/** Render the thematic break (horizontal rule) server component. */
export const Hr = React.forwardRef<HrRef, HrProps>((props, ref) => {
  const {
    as: Component = "hr",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedHrClient : HrClient;

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

Hr.displayName = "Hr";
