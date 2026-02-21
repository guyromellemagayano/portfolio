import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const FormClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.FormClient };
});
const MemoizedFormClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedFormClient };
});

export type FormRef = React.ComponentRef<"form">;

export interface FormProps
  extends React.ComponentPropsWithoutRef<"form">, CommonComponentProps {}

/** Render the form server component. */
export const Form = React.forwardRef<FormRef, FormProps>((props, ref) => {
  const {
    as: Component = "form",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedFormClient : FormClient;

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

Form.displayName = "Form";
