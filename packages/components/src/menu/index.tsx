import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const MenuClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MenuClient };
});
const MemoizedMenuClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedMenuClient };
});

export type MenuRef = React.ComponentRef<"menu">;

export interface MenuProps
  extends React.ComponentPropsWithoutRef<"menu">, CommonComponentProps {}

/** Render the menu server component. */
export const Menu = React.forwardRef<MenuRef, MenuProps>((props, ref) => {
  const {
    as: Component = "menu",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedMenuClient : MenuClient;

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

Menu.displayName = "Menu";
