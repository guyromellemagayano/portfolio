"use client";

import React, { memo } from "react";

import { Textarea, type TextareaProps, type TextareaRef } from ".";

/** Render the textarea client component. */
export const TextareaClient = React.forwardRef<TextareaRef, TextareaProps>(
  (props, ref) => <Textarea ref={ref} {...props} />
);

TextareaClient.displayName = "TextareaClient";

/** Memoized version of `TextareaClient` for performance optimization. */
export const MemoizedTextareaClient = memo(TextareaClient);
