"use client";

import { type ColgroupHTMLAttributes, forwardRef } from "react";

import type { CommonComponentProps } from "../components";

export type ColgroupRef = HTMLTableColElement;
export type ColgroupProps = ColgroupHTMLAttributes<ColgroupRef> &
  CommonComponentProps;

/**
 * Render the table column group client component.
 * @param {ColgroupProps} props - The table column group client component properties
 * @param {ColgroupRef} ref - The table column group client component reference
 * @returns The rendered table column group client component
 */
export const ColgroupClient = forwardRef<ColgroupRef, ColgroupProps>(
  ({ children, ...rest }, ref) => {
    return (
      <colgroup ref={ref} {...rest}>
        {children}
      </colgroup>
    );
  }
);

ColgroupClient.displayName = "ColgroupClient";
