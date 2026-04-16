import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const CaptionClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.CaptionClient };
});
const MemoizedCaptionClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedCaptionClient };
});

export type CaptionRef = React.ComponentRef<"caption">;

export interface CaptionProps
  extends React.ComponentPropsWithoutRef<"caption">, CommonComponentProps {}

/** Render the caption server component. */
export const Caption = React.forwardRef<CaptionRef, CaptionProps>(
  (props, ref) => {
    const {
      as: Component = "caption",
      isClient = false,
      isMemoized = false,
      children,
      ...rest
    } = props;

    const element = <Component {...rest}>{children}</Component>;

    if (isClient) {
      const ClientComponent = isMemoized
        ? MemoizedCaptionClient
        : CaptionClient;

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

Caption.displayName = "Caption";
