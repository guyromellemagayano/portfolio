import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const SelectClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.SelectClient };
});
const MemoizedSelectClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedSelectClient };
});

export type SelectRef = React.ComponentRef<"select">;

export interface SelectProps
  extends React.ComponentPropsWithoutRef<"select">, CommonComponentProps {}

/** Render the HTML select server component. */
export const Select = React.forwardRef<SelectRef, SelectProps>((props, ref) => {
  const {
    as: Component = "select",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedSelectClient : SelectClient;

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

Select.displayName = "Select";
