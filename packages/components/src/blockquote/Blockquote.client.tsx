"use client";

import { type BlockquoteHTMLAttributes, forwardRef } from "react";

import type { CommonComponentProps } from "../components";

export type BlockquoteRef = HTMLQuoteElement;
export type BlockquoteProps = BlockquoteHTMLAttributes<BlockquoteRef> &
  CommonComponentProps;

/**
 * Render the blockquote client component.
 * @param {BlockquoteProps} props - The blockquote client component properties
 * @param {BlockquoteRef} ref - The blockquote client component reference
 * @returns The rendered blockquote client component
 */
export const BlockquoteClient = forwardRef<BlockquoteRef, BlockquoteProps>(
  ({ children, ...rest }, ref) => {
    return (
      <blockquote ref={ref} {...rest}>
        {children}
      </blockquote>
    );
  }
);

BlockquoteClient.displayName = "BlockquoteClient";
