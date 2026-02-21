import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const SlotClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.SlotClient };
});
const MemoizedSlotClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedSlotClient };
});

export type SlotRef = React.ComponentRef<"slot">;

export interface SlotProps
  extends React.ComponentPropsWithoutRef<"slot">, CommonComponentProps {}

/** Render the web component slot server component. */
export const Slot = React.forwardRef<SlotRef, SlotProps>((props, ref) => {
  const {
    as: Component = "slot",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedSlotClient : SlotClient;

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

Slot.displayName = "Slot";
