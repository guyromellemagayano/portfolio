import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const HeaderClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.HeaderClient };
});
const MemoizedHeaderClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedHeaderClient };
});

export type HeaderRef = React.ComponentRef<"header">;

export interface HeaderProps
  extends React.ComponentPropsWithoutRef<"header">, CommonComponentProps {}

/** Render the header server component. */
export const Header = React.forwardRef<HeaderRef, HeaderProps>((props, ref) => {
  const {
    as: Component = "header",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedHeaderClient : HeaderClient;

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

Header.displayName = "Header";
