import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const MainClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MainClient };
});
const MemoizedMainClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedMainClient };
});

export type MainRef = React.ComponentRef<"main">;

export interface MainProps
  extends React.ComponentPropsWithoutRef<"main">, CommonComponentProps {}

/** Render the main server component. */
export const Main = React.forwardRef<MainRef, MainProps>((props, ref) => {
  const {
    as: Component = "main",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedMainClient : MainClient;

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

Main.displayName = "Main";
