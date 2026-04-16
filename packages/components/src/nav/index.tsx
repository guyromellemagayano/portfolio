import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const NavClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.NavClient };
});
const MemoizedNavClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedNavClient };
});

export type NavRef = React.ComponentRef<"nav">;

export interface NavProps
  extends React.ComponentPropsWithoutRef<"nav">, CommonComponentProps {}

/** Render the navigation section server component. */
export const Nav = React.forwardRef<NavRef, NavProps>((props, ref) => {
  const {
    as: Component = "nav",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedNavClient : NavClient;

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

Nav.displayName = "Nav";
