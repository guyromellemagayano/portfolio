"use client";

import { type HTMLAttributes, forwardRef } from "react";

import type { CommonComponentProps } from "../components";

export type CenterRef = HTMLElement;
export type CenterProps = HTMLAttributes<CenterRef> & CommonComponentProps;

/**
 * Render the center client component.
 * @param {CenterProps} props - The center client component properties
 * @param {CenterRef} ref - The center client component reference
 * @returns The rendered center client component
 */
export const CenterClient = forwardRef<CenterRef, CenterProps>(
  ({ children, ...rest }, ref) => {
    return (
      <center ref={ref} {...rest}>
        {children}
      </center>
    );
  }
);

CenterClient.displayName = "CenterClient";
