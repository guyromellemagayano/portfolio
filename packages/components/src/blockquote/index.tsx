import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const BlockquoteClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BlockquoteClient };
});
const MemoizedBlockquoteClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedBlockquoteClient };
});

export type BlockquoteRef = React.ComponentRef<"blockquote">;

export interface BlockquoteProps
  extends React.ComponentPropsWithoutRef<"blockquote">, CommonComponentProps {}

/** Render the blockquote server component. */
export const Blockquote = React.forwardRef<BlockquoteRef, BlockquoteProps>(
  (props, ref) => {
    const {
      as: Component = "blockquote",
      isClient = false,
      isMemoized = false,
      children,
      ...rest
    } = props;

    const element = <Component {...rest}>{children}</Component>;

    if (isClient) {
      const ClientComponent = isMemoized
        ? MemoizedBlockquoteClient
        : BlockquoteClient;

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

Blockquote.displayName = "Blockquote";
