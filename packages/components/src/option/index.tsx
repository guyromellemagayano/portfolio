import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const OptionClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.OptionClient };
});
const MemoizedOptionClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedOptionClient };
});

export type OptionRef = React.ComponentRef<"option">;

export interface OptionProps
  extends React.ComponentPropsWithoutRef<"option">, CommonComponentProps {}

/** Render the HTML option server component. */
export const Option = React.forwardRef<OptionRef, OptionProps>((props, ref) => {
  const {
    as: Component = "option",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedOptionClient : OptionClient;

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

Option.displayName = "Option";
