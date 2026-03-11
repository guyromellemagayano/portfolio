import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const DlClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.DlClient };
});
const MemoizedDlClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedDlClient };
});

export type DlRef = React.ComponentRef<"dl">;

export interface DlProps
  extends React.ComponentPropsWithoutRef<"dl">, CommonComponentProps {}

/** Render the description list server component. */
export const Dl = React.forwardRef<DlRef, DlProps>((props, ref) => {
  const {
    as: Component = "dl",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedDlClient : DlClient;

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

Dl.displayName = "Dl";
