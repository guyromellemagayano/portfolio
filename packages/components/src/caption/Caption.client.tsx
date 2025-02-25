"use client";

import { type HTMLAttributes, forwardRef } from "react";

import type { CommonComponentProps } from "../components";

export type CaptionRef = HTMLTableCaptionElement;
export type CaptionProps = HTMLAttributes<CaptionRef> & CommonComponentProps;

/**
 * Render the caption client component.
 * @param {CaptionProps} props - The caption client component properties
 * @param {CaptionRef} ref - The caption client component reference
 * @returns The rendered caption client component
 */
export const CaptionClient = forwardRef<CaptionRef, CaptionProps>(
  ({ children, ...rest }, ref) => {
    return (
      <caption ref={ref} {...rest}>
        {children}
      </caption>
    );
  }
);

CaptionClient.displayName = "CaptionClient";
