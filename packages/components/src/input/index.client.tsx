"use client";

import React, { memo } from "react";

import { Input, type InputProps, type InputRef } from ".";

/** Render the HTML input client component. */
export const InputClient = React.forwardRef<InputRef, InputProps>(
  (props, ref) => <Input ref={ref} {...props} />
);

InputClient.displayName = "InputClient";

/** Memoized version of `InputClient` for performance optimization. */
export const MemoizedInputClient = memo(InputClient);
