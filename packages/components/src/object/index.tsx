import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const ObjectClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.ObjectClient };
});
const MemoizedObjectClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedObjectClient };
});

export type ObjectRef = React.ComponentRef<"object">;

export interface ObjectProps
  extends React.ComponentPropsWithoutRef<"object">, CommonComponentProps {}

/** Render the object server component. */
export const Object = React.forwardRef<ObjectRef, ObjectProps>((props, ref) => {
  const {
    as: Component = "object",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedObjectClient : ObjectClient;

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

Object.displayName = "Object";
