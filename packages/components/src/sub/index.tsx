import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const SubClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.SubClient };
});
const MemoizedSubClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedSubClient };
});

export type SubRef = React.ComponentRef<"sub">;

export interface SubProps
  extends React.ComponentPropsWithoutRef<"sub">, CommonComponentProps {}

/** Render the subscript server component. */
export const Sub = React.forwardRef<SubRef, SubProps>((props, ref) => {
  const {
    as: Component = "sub",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedSubClient : SubClient;

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

Sub.displayName = "Sub";
