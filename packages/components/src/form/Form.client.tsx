"use client";

import { forwardRef } from "react";

import type { FormProps, FormRef } from "./Form";

/**
 * Render the form client component.
 * @param {FormProps} props - The form client component properties
 * @param {FormRef} ref - The form client component reference
 * @returns The rendered form client component
 */
export const FormClient = forwardRef<FormRef, FormProps>(
  ({ children, ...rest }, ref) => {
    return (
      <form ref={ref} {...rest}>
        {children}
      </form>
    );
  }
);

FormClient.displayName = "FormClient";
