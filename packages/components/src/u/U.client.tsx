"use client";

import { forwardRef } from "react";

import type { UProps, URef } from "./U";

/**
 * Render the unarticulated annotation (underline) client component.
 * @param {UProps} props - The unarticulated annotation (underline) client component properties
 * @param {URef} ref - The unarticulated annotation (underline) client component reference
 * @returns The rendered unarticulated annotation (underline) client component
 */
export const UClient = forwardRef<URef, UProps>(
  ({ children, ...rest }, ref) => {
    return (
      <u ref={ref} {...rest}>
        {children}
      </u>
    );
  }
);

UClient.displayName = "UClient";
