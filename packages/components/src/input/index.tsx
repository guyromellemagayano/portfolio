import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const InputClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.InputClient };
});
const MemoizedInputClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedInputClient };
});

export type InputRef = React.ComponentRef<"input">;

export interface InputProps
  extends React.ComponentPropsWithoutRef<"input">, CommonComponentProps {}

/** Render the HTML input server component. */
export const Input = React.forwardRef<InputRef, InputProps>((props, ref) => {
  const {
    as: Component = "input",
    isClient = false,
    isMemoized = false,
    type = "text",
    ...rest
  } = props;

  const element = <Component type={type} {...rest} />;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedInputClient : InputClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent type={type} {...rest} ref={ref} />
      </Suspense>
    );
  }

  return element;
});

Input.displayName = "Input";
