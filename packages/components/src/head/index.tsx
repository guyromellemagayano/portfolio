import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const HeadClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.HeadClient };
});
const MemoizedHeadClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedHeadClient };
});

export type HeadRef = React.ComponentRef<"head">;

export interface HeadProps
  extends React.ComponentPropsWithoutRef<"head">, CommonComponentProps {}

/** Render the document metadata (header) server component. */
export const Head = React.forwardRef<HeadRef, HeadProps>((props, ref) => {
  const {
    as: Component = "head",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedHeadClient : HeadClient;

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

Head.displayName = "Head";
