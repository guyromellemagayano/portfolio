import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const ScriptClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.ScriptClient };
});
const MemoizedScriptClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedScriptClient };
});

export type ScriptRef = React.ComponentRef<"script">;

export interface ScriptProps
  extends React.ComponentPropsWithoutRef<"script">, CommonComponentProps {}

/** Render the script server component. */
export const Script = React.forwardRef<ScriptRef, ScriptProps>((props, ref) => {
  const {
    as: Component = "script",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedScriptClient : ScriptClient;

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

Script.displayName = "Script";
