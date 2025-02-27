"use client";

import { forwardRef } from "react";

import type { IProps, IRef } from "./I";

/**
 * Render the idiomatic text client component.
 * @param {IProps} props - The idiomatic text client component properties
 * @param {IRef} ref - The idiomatic text client component reference
 * @returns The rendered idiomatic text client component
 */
export const IClient = forwardRef<IRef, IProps>(
  ({ children, ...rest }, ref) => {
    return (
      <i ref={ref} {...rest}>
        {children}
      </i>
    );
  }
);

IClient.displayName = "IClient";
