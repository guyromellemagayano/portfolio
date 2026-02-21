import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const LabelClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.LabelClient };
});
const MemoizedLabelClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedLabelClient };
});

export type LabelRef = React.ComponentRef<"label">;

export interface LabelProps
  extends React.ComponentPropsWithoutRef<"label">, CommonComponentProps {}

/** Render the label server component. */
export const Label = React.forwardRef<LabelRef, LabelProps>((props, ref) => {
  const {
    as: Component = "label",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedLabelClient : LabelClient;

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

Label.displayName = "Label";
