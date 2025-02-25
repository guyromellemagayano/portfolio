"use client";

import { type DialogHTMLAttributes, forwardRef } from "react";

import type { CommonComponentProps } from "../components";

export type DialogRef = HTMLDialogElement;
export type DialogProps = DialogHTMLAttributes<DialogRef> &
  CommonComponentProps;

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
