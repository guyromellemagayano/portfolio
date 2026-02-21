import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const RubyClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.RubyClient };
});
const MemoizedRubyClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedRubyClient };
});

export type RubyRef = React.ComponentRef<"ruby">;

export interface RubyProps
  extends React.ComponentPropsWithoutRef<"ruby">, CommonComponentProps {}

/** Render the ruby annotation server component. */
export const Ruby = React.forwardRef<RubyRef, RubyProps>((props, ref) => {
  const {
    as: Component = "ruby",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedRubyClient : RubyClient;

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

Ruby.displayName = "Ruby";
