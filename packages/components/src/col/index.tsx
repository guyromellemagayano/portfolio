import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const ColClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.ColClient };
});
const MemoizedColClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedColClient };
});

export type ColRef = React.ComponentRef<"col">;

export interface ColProps
  extends React.ComponentPropsWithoutRef<"col">, CommonComponentProps {}

/** Render the column server component. */
export const Col = React.forwardRef<ColRef, ColProps>((props, ref) => {
  const {
    as: Component = "col",
    isClient = false,
    isMemoized = false,
    ...rest
  } = props;

  const element = <Component {...rest} />;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedColClient : ColClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest} ref={ref} />
      </Suspense>
    );
  }

  return element;
});

Col.displayName = "Col";
