import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const UClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.UClient };
});
const MemoizedUClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedUClient };
});

export type URef = React.ComponentRef<"u">;

export interface UProps
  extends React.ComponentPropsWithoutRef<"u">, CommonComponentProps {}

/** Render the unarticulated annotation (underline) server component. */
export const U = React.forwardRef<URef, UProps>((props, ref) => {
  const {
    as: Component = "u",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedUClient : UClient;

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

U.displayName = "U";
