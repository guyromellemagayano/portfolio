"use client";

import React, { memo } from "react";

import { Button, type ButtonProps, type ButtonRef } from ".";

/** Render the button client component. */
export const ButtonClient = React.forwardRef<ButtonRef, ButtonProps>(
  (props, ref) => <Button ref={ref} {...props} />
);

ButtonClient.displayName = "ButtonClient";

/** Memoized version of `ButtonClient` for performance optimization. */
export const MemoizedButtonClient = memo(ButtonClient);
