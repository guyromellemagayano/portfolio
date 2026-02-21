import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const PreClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.PreClient };
});
const MemoizedPreClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedPreClient };
});

export type PreRef = React.ComponentRef<"pre">;

export interface PreProps
  extends React.ComponentPropsWithoutRef<"pre">, CommonComponentProps {}

/** Render the preformatted text server component. */
export const Pre = React.forwardRef<PreRef, PreProps>((props, ref) => {
  const {
    as: Component = "pre",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedPreClient : PreClient;

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

Pre.displayName = "Pre";
