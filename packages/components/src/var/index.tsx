import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const VarClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.VarClient };
});
const MemoizedVarClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedVarClient };
});

export type VarRef = React.ComponentRef<"var">;

export interface VarProps
  extends React.ComponentPropsWithoutRef<"var">, CommonComponentProps {}

/** Render the variable server component. */
export const Var = React.forwardRef<VarRef, VarProps>((props, ref) => {
  const {
    as: Component = "var",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedVarClient : VarClient;

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

Var.displayName = "Var";
