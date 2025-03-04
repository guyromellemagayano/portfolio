"use client";

import { forwardRef } from "react";

import type { TextareaProps, TextareaRef } from "./Textarea";

/**
 * Render the textarea client component.
 * @param {TextareaProps} props - The textarea client component properties
 * @param {TextareaRef} ref - The textarea client component reference
 * @returns The rendered textarea client component
 */
export const TextareaClient = forwardRef<TextareaRef, TextareaProps>(
  ({ children, ...rest }, ref) => {
    return (
      <textarea ref={ref} {...rest}>
        {children}
      </textarea>
    );
  }
);

TextareaClient.displayName = "TextareaClient";
