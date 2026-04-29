import React from "react";

import { type CommonComponentProps } from "../types";

export type BlockquoteRef = React.ComponentRef<"blockquote">;

export interface BlockquoteProps
  extends React.ComponentPropsWithoutRef<"blockquote">, CommonComponentProps {}

/** Render the blockquote component. */
export const Blockquote = React.forwardRef<BlockquoteRef, BlockquoteProps>(
  (props, ref) => {
    const { as: Component = "blockquote", children, ...rest } = props;

    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);

Blockquote.displayName = "Blockquote";
