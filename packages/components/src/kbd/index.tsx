import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const KbdClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.KbdClient };
});
const MemoizedKbdClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedKbdClient };
});

export type KbdRef = React.ComponentRef<"kbd">;

export interface KbdProps
  extends React.ComponentPropsWithoutRef<"kbd">, CommonComponentProps {}

/** Render the keyboard input server component. */
export const Kbd = React.forwardRef<KbdRef, KbdProps>((props, ref) => {
  const {
    as: Component = "kbd",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedKbdClient : KbdClient;

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

Kbd.displayName = "Kbd";
