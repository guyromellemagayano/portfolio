import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const EmbedClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.EmbedClient };
});
const MemoizedEmbedClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedEmbedClient };
});

export type EmbedRef = React.ComponentRef<"embed">;

export interface EmbedProps
  extends React.ComponentPropsWithoutRef<"embed">, CommonComponentProps {}

/** Render the embed external content server component. */
export const Embed = React.forwardRef<EmbedRef, EmbedProps>((props, ref) => {
  const {
    as: Component = "embed",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const elembedent = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedEmbedClient : EmbedClient;

    return (
      <Suspense fallback={elembedent}>
        <ClientComponent {...rest} ref={ref}>
          {children}
        </ClientComponent>
      </Suspense>
    );
  }

  return elembedent;
});

Embed.displayName = "Embed";
