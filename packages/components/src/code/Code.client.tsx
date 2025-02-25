"use client";

import { type HTMLAttributes, forwardRef } from "react";

import type { CommonComponentProps } from "../components";

export type CodeRef = HTMLElement;
export type CodeProps = HTMLAttributes<CodeRef> & CommonComponentProps;

/**
 * Render the code client component.
 * @param {CodeProps} props - The code client component properties
 * @param {CodeRef} ref - The code client component reference
 * @returns The rendered code client component
 */
export const CodeClient = forwardRef<CodeRef, CodeProps>(
  ({ children, ...rest }, ref) => {
    return (
      <code ref={ref} {...rest}>
        {children}
      </code>
    );
  }
);

CodeClient.displayName = "CodeClient";
