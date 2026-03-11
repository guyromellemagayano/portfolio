import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const DialogClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.DialogClient };
});
const MemoizedDialogClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedDialogClient };
});

export type DialogRef = React.ComponentRef<"dialog">;

export interface DialogProps
  extends React.ComponentPropsWithoutRef<"dialog">, CommonComponentProps {}

/** Render the dialog server component. */
export const Dialog = React.forwardRef<DialogRef, DialogProps>((props, ref) => {
  const {
    as: Component = "dialog",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedDialogClient : DialogClient;

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

Dialog.displayName = "Dialog";
