import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const StyleClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.StyleClient };
});
const MemoizedStyleClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedStyleClient };
});

export type StyleRef = React.ComponentRef<"style">;

export interface StyleProps
  extends React.ComponentPropsWithoutRef<"style">, CommonComponentProps {}

/** Render the style information server component. */
export const Style = React.forwardRef<StyleRef, StyleProps>((props, ref) => {
  const {
    as: Component = "style",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedStyleClient : StyleClient;

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

Style.displayName = "Style";
