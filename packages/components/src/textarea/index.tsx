import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const TextareaClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.TextareaClient };
});
const MemoizedTextareaClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedTextareaClient };
});

export type TextareaRef = React.ComponentRef<"textarea">;

export interface TextareaProps
  extends React.ComponentPropsWithoutRef<"textarea">, CommonComponentProps {}

/** Render the textarea server component. */
export const Textarea = React.forwardRef<TextareaRef, TextareaProps>(
  (props, ref) => {
    const {
      as: Component = "textarea",
      isClient = false,
      isMemoized = false,
      children,
      ...rest
    } = props;

    const element = <Component {...rest}>{children}</Component>;

    if (isClient) {
      const ClientComponent = isMemoized
        ? MemoizedTextareaClient
        : TextareaClient;

      return (
        <Suspense fallback={element}>
          <ClientComponent {...rest} ref={ref}>
            {children}
          </ClientComponent>
        </Suspense>
      );
    }

    return element;
  }
);

Textarea.displayName = "Textarea";
