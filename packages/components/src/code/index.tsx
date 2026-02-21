import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const CodeClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.CodeClient };
});
const MemoizedCodeClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedCodeClient };
});

export type CodeRef = React.ComponentRef<"code">;

export interface CodeProps
  extends React.ComponentPropsWithoutRef<"code">, CommonComponentProps {}

/** Render the code server component. */
export const Code = React.forwardRef<CodeRef, CodeProps>((props, ref) => {
  const {
    as: Component = "code",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedCodeClient : CodeClient;

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

Code.displayName = "Code";
