import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const FieldsetClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.FieldsetClient };
});
const MemoizedFieldsetClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedFieldsetClient };
});

export type FieldsetRef = React.ComponentRef<"fieldset">;

export interface FieldsetProps
  extends React.ComponentPropsWithoutRef<"fieldset">, CommonComponentProps {}

/** Render the field set server component. */
export const Fieldset = React.forwardRef<FieldsetRef, FieldsetProps>(
  (props, ref) => {
    const {
      as: Component = "fieldset",
      isClient = false,
      isMemoized = false,
      children,
      ...rest
    } = props;

    const element = <Component {...rest}>{children}</Component>;

    if (isClient) {
      const ClientComponent = isMemoized
        ? MemoizedFieldsetClient
        : FieldsetClient;

      return (
        <Suspense fallback={element}>
          <ClientComponent {...rest} ref={ref}>
            {children}
          </ClientComponent>
        </Suspense>
      );
    }

    return element;
  }
);

Fieldset.displayName = "Fieldset";
