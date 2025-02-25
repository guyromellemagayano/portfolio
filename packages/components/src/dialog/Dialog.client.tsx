"use client";

import { forwardRef } from "react";

import type { DialogProps, DialogRef } from "./Dialog";

/**
 * Render the dialog client component.
 * @param {DialogProps} props - The dialog client component properties
 * @param {DialogRef} ref - The dialog client component reference
 * @returns The rendered dialog client component
 */
export const DialogClient = forwardRef<DialogRef, DialogProps>(
  ({ children, ...rest }, ref) => {
    return (
      <dialog ref={ref} {...rest}>
        {children}
      </dialog>
    );
  }
);

DialogClient.displayName = "DialogClient";
