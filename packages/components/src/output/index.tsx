import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const OutputClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.OutputClient };
});
const MemoizedOutputClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedOutputClient };
});

export type OutputRef = React.ComponentRef<"output">;

export interface OutputProps
  extends React.ComponentPropsWithoutRef<"output">, CommonComponentProps {}

/** Render the output server component. */
export const Output = React.forwardRef<OutputRef, OutputProps>((props, ref) => {
  const {
    as: Component = "output",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedOutputClient : OutputClient;

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

Output.displayName = "Output";
