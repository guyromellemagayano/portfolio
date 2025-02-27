"use client";

import { forwardRef } from "react";

import type { InputProps, InputRef } from "./Input";

/**
 * Render the HTML input client component.
 * @param {InputProps} props - The HTML input client component properties
 * @param {InputRef} ref - The HTML input client component reference
 * @returns The rendered HTML input client component
 */
export const InputClient = forwardRef<InputRef, InputProps>(
  ({ type = "text", ...rest }, ref) => {
    return <input ref={ref} type={type} {...rest} />;
  }
);

InputClient.displayName = "InputClient";
