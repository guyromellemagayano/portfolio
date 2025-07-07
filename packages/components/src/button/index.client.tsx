"use client";

import { forwardRef, memo } from "react";

import type { ButtonProps } from "./index";

/**
 * Client-side Button component with memoization for performance optimization.
 * This component is used when isClient=true is passed to the server component.
 */
const ButtonClientComponent = forwardRef<
  React.ElementRef<"button">,
  ButtonProps
>((props, ref) => {
  // Import the server component dynamically to avoid SSR issues
  const { Button } = require("./index");
  return <Button {...props} ref={ref} />;
});

ButtonClientComponent.displayName = "ButtonClient";

/**
 * Memoized version of the Button client component for performance optimization.
 * This component is used when isMemoized=true is passed to the server component.
 */
export const ButtonClient = memo(ButtonClientComponent);
export const MemoizedButtonClient = ButtonClient;

export default ButtonClient;
