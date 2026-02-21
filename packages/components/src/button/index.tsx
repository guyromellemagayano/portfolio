import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const ButtonClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.ButtonClient };
});
const MemoizedButtonClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedButtonClient };
});

export type ButtonRef = React.ComponentRef<"button">;

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<"button">, CommonComponentProps {}

/** Render the button server component. */
export const Button = React.forwardRef<ButtonRef, ButtonProps>((props, ref) => {
  const {
    as: Component = "button",
    type = "button",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = (
    <Component type={type} disabled={isClient} {...rest}>
      {children}
    </Component>
  );

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedButtonClient : ButtonClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent type={type} {...rest} ref={ref}>
          {children}
        </ClientComponent>
      </Suspense>
    );
  }

  return element;
});

Button.displayName = "Button";
